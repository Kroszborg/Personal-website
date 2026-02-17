export interface NavItem {
  label: string;
  href: string;
  /** When true, label is invisible until hover (e.g. for secret page) */
  invisible?: boolean;
}

export const navbarConfig = {
  logo: {
    src: '/assets/logo.png',
    alt: 'logo',
    width: 100,
    height: 100,
  },
  navItems: [
    {
      label: 'Work',
      href: '/work-experience',
    },
    // Temporarily hidden - uncomment to re-enable blog
    // {
    //   label: 'Blogs',
    //   href: '/blog',
    // },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Secret',
      href: '/secret',
      invisible: true,
    },
  ] as NavItem[],
};
