import { useEffect, useState } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileCode2,
  FileImage,
  FileText,
  HelpCircle,
  ImagePlus,
  Info,
  Menu,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const DESKTOP_MEDIA_QUERY = '(min-width: 1101px)';
const DESKTOP_COLLAPSE_STORAGE_KEY = 'markdown-box.sidebar-collapsed';

type NavIcon = 'html' | 'image' | 'toc' | 'guides' | 'examples' | 'updates' | 'about' | 'roadmap' | 'help';

type NavItem = {
  label: string;
  meta?: string;
  href: string | null;
  icon: NavIcon;
  active?: boolean;
};

type NavSection = {
  label?: string;
  items: NavItem[];
  secondary?: boolean;
};

const navSections: NavSection[] = [
  {
    label: 'Converters',
    items: [
      { label: 'Markdown to HTML', meta: 'Soon', href: null, icon: 'html' },
      { label: 'Markdown to Image', meta: 'Soon', href: null, icon: 'image' },
      { label: 'TOC Generator', meta: 'Soon', href: null, icon: 'toc' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Guides', meta: 'Library', href: null, icon: 'guides' },
      { label: 'Examples', meta: 'Library', href: null, icon: 'examples' },
      { label: "What's New", meta: 'Updates', href: null, icon: 'updates' },
    ],
  },
  {
    secondary: true,
    items: [
      { label: 'About markdown.box', meta: 'About', href: null, icon: 'about' },
      { label: 'Roadmap', meta: 'Plan', href: null, icon: 'roadmap' },
      { label: 'Help & Feedback', meta: 'Support', href: null, icon: 'help' },
    ],
  },
];

function getNavIcon(icon: NavIcon) {
  switch (icon) {
    case 'html':
      return FileCode2;
    case 'image':
      return FileImage;
    case 'toc':
      return FileText;
    case 'guides':
      return BookOpen;
    case 'examples':
      return ImagePlus;
    case 'updates':
      return Sparkles;
    case 'about':
      return Info;
    case 'roadmap':
      return ChevronRight;
    case 'help':
      return HelpCircle;
  }
}

type SidebarContentProps = {
  collapsed: boolean;
  onToggleCollapse?: () => void;
  showCollapseButton?: boolean;
};

function SidebarContent({ collapsed, onToggleCollapse, showCollapseButton = true }: SidebarContentProps) {
  return (
    <>
      <div className="sidebar-scroll-region">
        <div className="sidebar-top">
          <a className={cn('brand', collapsed && 'brand-collapsed')} href="/" aria-label="markdown.box home">
            <span className="brand-mark">M</span>
            {!collapsed ? (
              <span className="brand-copy">
                <strong>markdown.box</strong>
                <small>tools for writers & builders</small>
              </span>
            ) : null}
          </a>

          <SidebarNav collapsed={collapsed} />
        </div>
      </div>

      <div className="sidebar-footer">
        {showCollapseButton ? (
          <Button
            type="button"
            variant="ghost"
            className={cn('sidebar-collapse-button', collapsed && 'sidebar-collapse-button-collapsed')}
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
            {!collapsed ? <span>Collapse</span> : null}
          </Button>
        ) : null}
      </div>
    </>
  );
}

function SidebarNav({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="sidebar-nav">
      {navSections.map((section, sectionIndex) => (
        <div
          key={section.label ?? `section-${sectionIndex}`}
          className={cn('sidebar-group', section.secondary && 'sidebar-group-secondary')}
        >
          {section.label && !collapsed ? <div className="sidebar-label">{section.label}</div> : null}

          <div className="nav-list">
            {section.items.map((item) => {
              const Icon = getNavIcon(item.icon);
              const itemClasses = cn(
                'nav-item',
                item.active && 'is-active',
                !item.href && 'nav-item-placeholder',
                collapsed && 'nav-item-collapsed'
              );

              const content = (
                <>
                  <span className="nav-icon-shell" aria-hidden="true">
                    <Icon className="nav-icon-svg" />
                  </span>
                  {!collapsed ? (
                    <>
                      <span className="nav-copy nav-copy-single">
                        <span>{item.label}</span>
                      </span>
                      {item.meta ? <span className={cn('nav-meta', item.active && 'nav-meta-active')}>{item.meta}</span> : null}
                    </>
                  ) : null}
                </>
              );

              if (item.href) {
                return (
                  <a key={item.label} href={item.href} className={itemClasses} title={collapsed ? item.label : undefined}>
                    {content}
                  </a>
                );
              }

              return (
                <div key={item.label} className={itemClasses} aria-disabled="true" title={collapsed ? item.label : undefined}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function WorkbenchSidebar() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

    const updateDesktopState = (matches: boolean) => {
      setIsDesktop(matches);
      if (matches) {
        const storedValue = window.localStorage.getItem(DESKTOP_COLLAPSE_STORAGE_KEY);
        setIsSidebarCollapsed(storedValue === 'true');
      } else {
        setIsMobileSidebarOpen(false);
      }
    };

    updateDesktopState(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      updateDesktopState(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.body.classList.toggle('mobile-sidebar-open', isMobileSidebarOpen);

    return () => {
      document.body.classList.remove('mobile-sidebar-open');
    };
  }, [isMobileSidebarOpen]);

  function handleToggleCollapse() {
    setIsSidebarCollapsed((previousValue) => {
      const nextValue = !previousValue;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(DESKTOP_COLLAPSE_STORAGE_KEY, String(nextValue));
      }
      return nextValue;
    });
  }

  return (
    <>
      <aside className={cn('sidebar', isSidebarCollapsed && 'is-collapsed')}>
        <SidebarContent collapsed={isSidebarCollapsed} onToggleCollapse={handleToggleCollapse} />
      </aside>

      {!isDesktop ? (
        <div className="mobile-sidebar-trigger-wrap">
          <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mobile-sidebar-trigger"
                aria-label="Open navigation menu"
              >
                <Menu className="size-4" />
                <span>Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="mobile-sidebar-sheet" showCloseButton={true}>
              <SheetHeader className="mobile-sidebar-header">
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription className="mobile-sidebar-description">
                  Open sidebar navigation for markdown.box tools.
                </SheetDescription>
              </SheetHeader>
              <div className="mobile-sidebar-shell">
                <SidebarContent collapsed={false} showCollapseButton={false} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : null}
    </>
  );
}
