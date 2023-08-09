import { createTheme } from '@mui/material';

const palette = {
  primary: '#000000',
  secondary: '#FFFFFF',
  background: '#F5F5F5',
  text: '#000000',
  textSecondary: '#FFFFFF',
  textDisabled: '#9E9E9E',
};

const theme = createTheme({
  palette: {
    primary: {
      main: palette.primary,
    },
    secondary: {
      main: palette.secondary,
    },
    background: {
      default: palette.background,
    },
    text: {
      primary: palette.text,
      secondary: palette.textSecondary,
      disabled: palette.textDisabled,
    },
  },
});

export default theme;
