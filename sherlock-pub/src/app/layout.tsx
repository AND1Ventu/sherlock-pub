import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather'
});

export const metadata: Metadata = {
  title: 'Sherlock Holmes Pub | Authentic English Pub in Reggio Emilia',
  description: 'Since 1995, the first authentic English pub in Italy. Located in Reggio Emilia, offering the finest beers, cocktails, and traditional pub fare.',
  keywords: 'pub, english pub, reggio emilia, beer, cocktails, food, sherlock holmes',
  openGraph: {
    title: 'Sherlock Holmes Pub',
    description: 'Authentic English Pub in Reggio Emilia since 1995',
    type: 'website',
    locale: 'it_IT',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${inter.variable} ${merriweather.variable}`}>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
