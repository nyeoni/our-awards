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
    <html lang="en" className="dark oa-background">
      <body>
        <NextAuthProvider>
          <ProtectedRoute>
            <UIProviders>
              <main
                className={`${uhbeeRegular.variable} ${uhbeeBold.variable} normal p-8 max-w-sm`}
              >
                {children}
              </main>
            </UIProviders>
          </ProtectedRoute>
        </NextAuthProvider>
      </body>
    </html>
  );
}