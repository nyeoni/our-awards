import localFont from 'next/font/local';

import GoogleAnalytics from '@/components/GoogleAnalytics';
import { NextAuthProvider, UIProviders } from '@/contexts';
import { SWRConfigProvider } from '@/contexts/SWRConfigProvider';
import '@/styles/global.css';

import { InAppInfoModalMemo } from './InAppInfoModal';

export const metadata = {
  title: '우리들의 시상식',
  description: '상을 주고받아요',
  keywords: '상, 시상식, 상을 주고받아요, 우리들의 시상식',
  httpEquiv: {
    'Content-Security-Policy': "default-src 'self'; connect-src vitals.vercel-insights.com",
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.our-awards.net/',
    site_name: 'Our Awards',
    title: '우리들의 시상식',
    description: '서로 상을 주고 받아보아요!',
    images: ['/assets/preview.png'],
  },
};

const uhbeeRegular = localFont({
  src: [{ path: '../../public/fonts/UhBee Kang-Ja-Regular.ttf' }],
  display: 'swap',
  variable: '--uhbee-regular',
});

const uhbeeBold = localFont({
  src: [{ path: '../../public/fonts/UhBee Kang-Ja-Bold.ttf' }],
  display: 'swap',
  variable: '--uhbee-bold',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="normal oa-background">
      <body>
        <GoogleAnalytics />
        <SWRConfigProvider>
          <NextAuthProvider>
            <UIProviders>
              <main className={`root-container ${uhbeeRegular.variable} ${uhbeeBold.variable}`}>
                {children}
              </main>
            </UIProviders>
            <div id="portal" className="w-0 h-0" />
            <InAppInfoModalMemo />
          </NextAuthProvider>
        </SWRConfigProvider>
      </body>
    </html>
  );
}
