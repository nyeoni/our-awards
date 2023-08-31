import localFont from 'next/font/local';

import { NextAuthProvider, ProtectedRoute, UIProviders } from '@/context';
import '@/style/global.css';

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
        <NextAuthProvider>
          {/* <ProtectedRoute> */}
          <UIProviders>
            <main className={`root-container ${uhbeeRegular.variable} ${uhbeeBold.variable}`}>
              {children}
            </main>
          </UIProviders>
          {/* </ProtectedRoute> */}
          <div id="portal" className="w-0 h-0" />
        </NextAuthProvider>
      </body>
    </html>
  );
}
