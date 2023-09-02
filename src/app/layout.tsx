import localFont from 'next/font/local';

import { NextAuthProvider, UIProviders } from '@/context';
import '@/style/global.css';

import BugReportButton from './BugReportButton';
import GoogleAnalytics from './GoogleAnalytics';

export const metadata = {
  title: 'Our Awards',
  description: '상을 주고받아요',
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
        <NextAuthProvider>
          <UIProviders>
            <main className={`root-container ${uhbeeRegular.variable} ${uhbeeBold.variable}`}>
              {children}
            </main>
            <BugReportButton />
          </UIProviders>
          <div id="portal" className="w-0 h-0" />
        </NextAuthProvider>
      </body>
    </html>
  );
}
