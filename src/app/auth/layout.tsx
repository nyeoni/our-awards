import 'normalize.css/normalize.css';

import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

import { getInitColorSchemeScript } from '@mui/material/styles';

import GlobalProvider from './provider';

const inter = Inter({ subsets: ['latin'] });

const myFont = localFont({
  src: [
    { path: '../../../public/fonts/UhBee Kang-Ja-Regular.ttf' },
    { path: '../../../public/fonts/UhBee Kang-Ja-Bold.ttf' },
  ],
  display: 'swap',
  variable: '--main-font',
});

export const metadata = {
  title: 'Our Awards',
  description: '상을 주고받아요',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.className} ${myFont.className}`}>
      <body>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
