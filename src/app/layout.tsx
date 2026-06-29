import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SiteChrome } from '@/components/layout/SiteChrome';
import { QueryProvider } from '@/providers/QueryProvider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const anton = localFont({
  src: './fonts/Anton-Regular.ttf',
  variable: '--font-anton',
  weight: '400',
  style: 'normal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Gabax Logistics | Global Logistics & Cargo Solutions',
    template: '%s | Gabax Logistics',
  },
  description:
    'Gabax Logistics provides reliable global logistics and cargo solutions including air freight, sea freight, land transport, and warehousing services.',
  keywords: [
    'logistics',
    'cargo',
    'freight',
    'shipping',
    'air freight',
    'sea freight',
    'land transport',
    'supply chain',
    'warehousing',
  ],
  authors: [{ name: 'Gabax Logistics' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Gabax Logistics',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Lock the page at 1x scale so phones never render zoomed-in and every tap
// registers as a click instead of a zoom gesture.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <SiteChrome navbar={<Navbar />} footer={<Footer />}>
            {children}
          </SiteChrome>
        </QueryProvider>
      </body>
    </html>
  );
}
