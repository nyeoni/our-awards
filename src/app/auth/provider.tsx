'use client';

import { ThemeProvider } from '@emotion/react';

import GlobalStyle from '@/style/GlobalStyle';
import theme from '@/style/Theme';

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
