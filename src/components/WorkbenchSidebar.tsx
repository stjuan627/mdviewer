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
  Moon,
  Sparkles,
  Sun,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { I18nProvider, useI18n } from '@/components/i18n/I18nProvider';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/i18n';
import { swapLocaleInPath } from '@/lib/i18n';

const DESKTOP_MEDIA_QUERY = '(min-width: 1101px)';
const DESKTOP_COLLAPSE_STORAGE_KEY = 'mdviewer.sidebar-collapsed';

type NavIcon = 'html' | 'pdf' | 'image' | 'toc' | 'guides' | 'examples' | 'updates' | 'about' | 'roadmap' | 'help';

type NavItem = {
  labelKey: 'sidebar.markdownToHtml' | 'sidebar.markdownToPdf' | 'sidebar.markdownToImage' | 'sidebar.help';
  meta?: string;
  href: string | null;
  icon: NavIcon;
  active?: boolean;
};

type NavSection = {
  labelKey?: 'sidebar.tools';
  items: NavItem[];
  secondary?: boolean;
};

const navSections: NavSection[] = [
  {
    labelKey: 'sidebar.tools',
    items: [
      { labelKey: 'sidebar.markdownToHtml', href: '/markdown-to-html', icon: 'html' },
      { labelKey: 'sidebar.markdownToPdf', href: '/markdown-to-pdf', icon: 'pdf' },
      { labelKey: 'sidebar.markdownToImage', href: '/markdown-to-image', icon: 'image' },
      // { label: 'TOC Generator', meta: 'Soon', href: null, icon: 'toc' },
    ],
  },
  // {
  //   label: 'Resources',
  //   items: [
  //     { label: 'Guides', meta: 'Library', href: null, icon: 'guides' },
  //     { label: 'Examples', meta: 'Library', href: null, icon: 'examples' },
  //     { label: "What's New", meta: 'Updates', href: null, icon: 'updates' },
  //   ],
  // },
  {
    secondary: true,
    items: [
      // { label: 'About MD Viewer', meta: 'About', href: null, icon: 'about' },
      // { label: 'Roadmap', meta: 'Plan', href: null, icon: 'roadmap' },
      { labelKey: 'sidebar.help', href: 'mailto:support@mdviewer.net', icon: 'help' },
    ],
  },
];

function getNavIcon(icon: NavIcon) {
  switch (icon) {
    case 'html':
      return FileCode2;
    case 'pdf':
      return FileText;
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
  locale: Locale;
  collapsed: boolean;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  onToggleCollapse?: () => void;
  showCollapseButton?: boolean;
};

function SidebarContent({
  locale,
  collapsed,
  isDarkTheme,
  onToggleTheme,
  onToggleCollapse,
  showCollapseButton = true,
}: SidebarContentProps) {
  const { t } = useI18n();
  const [pathname, setPathname] = useState('/');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const sync = () => {
      setPathname(window.location.pathname);
      setSearch(window.location.search);
    };

    sync();
    document.addEventListener('astro:page-load', sync);
    document.addEventListener('astro:after-swap', sync);

    return () => {
      document.removeEventListener('astro:page-load', sync);
      document.removeEventListener('astro:after-swap', sync);
    };
  }, []);

  const alternateLocale = locale === 'en' ? 'zh-cn' : 'en';
  const alternateHref = `${swapLocaleInPath(pathname, alternateLocale)}${search}`;

  return (
    <>
      <div className="sidebar-scroll-region">
        <div className="sidebar-top">
          <a
            className={cn('brand', collapsed && 'brand-collapsed')}
            href={locale === 'en' ? '/' : '/zh-cn/'}
            aria-label={t('sidebar.brandHome')}
          >
            <img src="/logo-square.svg" alt="MD Viewer logo" className="brand-logo" style={{ width: '30px', height: '30px' }} />
            {!collapsed ? (
              <span className="brand-copy">
                <strong>MD Viewer</strong>
              </span>
            ) : null}
          </a>

          <SidebarNav collapsed={collapsed} locale={locale} />
        </div>
      </div>

      <div className="sidebar-footer">
        <Button
          type="button"
          variant="ghost"
          className={cn('sidebar-theme-button', collapsed && 'sidebar-theme-button-collapsed')}
          onClick={onToggleTheme}
          aria-label={isDarkTheme ? t('sidebar.theme.switchToLight') : t('sidebar.theme.switchToDark')}
          title={isDarkTheme ? t('sidebar.theme.switchToLight') : t('sidebar.theme.switchToDark')}
        >
          {isDarkTheme ? <Sun className="size-4" /> : <Moon className="size-4" />}
          {!collapsed ? <span>{isDarkTheme ? t('sidebar.theme.light') : t('sidebar.theme.dark')}</span> : null}
        </Button>

        <Button
          asChild
          type="button"
          variant="ghost"
          className={cn('sidebar-theme-button', collapsed && 'sidebar-theme-button-collapsed')}
        >
          <a
            href={alternateHref}
            data-testid="locale-switcher"
            aria-label={t('locale.label')}
            title={t('locale.label')}
          >
            {!collapsed ? <span>{locale === 'en' ? t('locale.zh-cn') : t('locale.en')}</span> : <span>{locale === 'en' ? '中' : 'EN'}</span>}
          </a>
        </Button>

        {showCollapseButton ? (
          <Button
            type="button"
            variant="ghost"
            className={cn('sidebar-collapse-button', collapsed && 'sidebar-collapse-button-collapsed')}
            onClick={onToggleCollapse}
            aria-label={collapsed ? t('sidebar.collapse.expand') : t('sidebar.collapse.collapse')}
            title={collapsed ? t('sidebar.collapse.expand') : t('sidebar.collapse.collapse')}
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
            {!collapsed ? <span>{t('sidebar.collapse.collapse')}</span> : null}
          </Button>
        ) : null}
      </div>
    </>
  );
}

function SidebarNav({ collapsed, locale }: { collapsed: boolean; locale: Locale }) {
  const { t } = useI18n();

  return (
    <div className="sidebar-nav">
      {navSections.map((section, sectionIndex) => (
        <div
          key={section.labelKey ?? `section-${sectionIndex}`}
          className={cn('sidebar-group', section.secondary && 'sidebar-group-secondary')}
        >
          {section.labelKey && !collapsed ? <div className="sidebar-label">{t(section.labelKey)}</div> : null}

          <div className="nav-list">
            {section.items.map((item) => {
              const Icon = getNavIcon(item.icon);
              const label = t(item.labelKey);
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
                        <span>{label}</span>
                      </span>
                      {/* {item.meta ? <span className={cn('nav-meta', item.active && 'nav-meta-active')}>{item.meta}</span> : null} */}
                    </>
                  ) : null}
                </>
              );

              if (item.href) {
                const href = item.href.startsWith('mailto:') ? item.href : `${locale === 'en' ? '' : '/zh-cn'}${item.href}`;
                return (
                  <a key={item.labelKey} href={href} className={itemClasses} title={collapsed ? label : undefined}>
                    {content}
                  </a>
                );
              }

              return (
                <div key={item.labelKey} className={itemClasses} aria-disabled="true" title={collapsed ? label : undefined}>
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

function WorkbenchSidebarInner({ locale }: { locale: Locale }) {
  const { t } = useI18n();
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

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

    setIsDarkTheme(document.documentElement.classList.contains('dark'));
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

  function handleToggleTheme() {
    const nextIsDark = !isDarkTheme;
    setIsDarkTheme(nextIsDark);

    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', nextIsDark);
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('mdviewer.theme', nextIsDark ? 'dark' : 'light');
    }
  }

  return (
    <>
      <aside className={cn('sidebar', isSidebarCollapsed && 'is-collapsed')}>
        <SidebarContent
          locale={locale}
          collapsed={isSidebarCollapsed}
          isDarkTheme={isDarkTheme}
          onToggleTheme={handleToggleTheme}
          onToggleCollapse={handleToggleCollapse}
        />
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
                aria-label={t('sidebar.mobile.open')}
                data-testid="mobile-menu-trigger"
              >
                <Menu className="size-4" />
                <span>{t('sidebar.mobile.menu')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="mobile-sidebar-sheet" showCloseButton={true}>
              <SheetHeader className="mobile-sidebar-header">
                <SheetTitle>{t('sidebar.mobile.title')}</SheetTitle>
                <SheetDescription className="mobile-sidebar-description">
                  {t('sidebar.mobile.description')}
                </SheetDescription>
              </SheetHeader>
              <div className="mobile-sidebar-shell">
                <SidebarContent
                  locale={locale}
                  collapsed={false}
                  isDarkTheme={isDarkTheme}
                  onToggleTheme={handleToggleTheme}
                  showCollapseButton={false}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : null}
    </>
  );
}

export function WorkbenchSidebar({ locale }: { locale: Locale }) {
  return (
    <I18nProvider locale={locale}>
      <WorkbenchSidebarInner locale={locale} />
    </I18nProvider>
  );
}
