export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Cargo Services', href: '/services/cargo' },
      { label: 'Air Freight', href: '/services/air-freight' },
      { label: 'Sea Freight', href: '/services/sea-freight' },
      { label: 'Land Transport', href: '/services/land-transport' },
    ],
  },
  { label: 'Quote', href: '/quote' },
  { label: 'Contact', href: '/contact' },
];

export const footerNavigation = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact Us', href: '/contact' },
  ],
  services: [
    { label: 'Cargo Services', href: '/services/cargo' },
    { label: 'Air Freight', href: '/services/air-freight' },
    { label: 'Sea Freight', href: '/services/sea-freight' },
    { label: 'Land Transport', href: '/services/land-transport' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Request Quote', href: '/quote' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
};

export const COMPANY_NAME = 'Gabax Logistics';
export const COMPANY_DESCRIPTION =
  'Your trusted partner in global logistics and cargo solutions.';
export const COMPANY_EMAIL = 'info@gabaxlogistics.com';
export const COMPANY_PHONE = '+1 (555) 000-0000';
