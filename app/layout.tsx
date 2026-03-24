import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Ankit Solar Power | Commercial & Residential Solar Solutions',
    template: '%s | Ankit Solar Power',
  },
  description:
    'Ankit Solar Power - India\'s trusted enterprise solar installation company. Commercial solar for hotels, factories, industrial plants. Residential solar & franchise opportunities.',
  keywords: ['solar power', 'commercial solar', 'residential solar', 'solar installation', 'solar franchise', 'Ankit Solar'],
  authors: [{ name: 'Ankit Solar Power' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: 'Ankit Solar Power',
    title: 'Ankit Solar Power | Enterprise Solar Energy Platform',
    description: 'Commercial & Residential Solar Installation | Solar Franchise Opportunities',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/logos/logo.png" />
        <link rel="apple-touch-icon" href="/logos/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
