import { globalFontFace, globalStyle } from '@vanilla-extract/css';

globalFontFace('kangJa', {
  src: "local('UhBee Kang-Ja-Regular') format('truetype')",
  fontDisplay: 'swap',
});

globalStyle('html, body', {
  width: '100%',
  height: '100%',
  fontSize: '62.5%',
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('body', {
  display: 'flex',
  flexDirection: 'column',
  margin: '0',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
});

globalStyle('h1, h2, h3, h4, p', {
  margin: 0,
});
