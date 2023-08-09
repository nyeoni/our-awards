import { createTheme } from '@vanilla-extract/css';

const color = {
  primary: '#4944FF',
  secondary: '#FFFFFF',
  background: '#F5F5F5',
  text: '#000000',
  textSecondary: '#FFFFFF',
  textDisabled: '#9E9E9E',
};

const spacing = {
  xs: '4rem',
  sm: '8rem',
  md: '16rem',
  lg: '24rem',
};

export const [theme, vars] = createTheme({ color, spacing });
