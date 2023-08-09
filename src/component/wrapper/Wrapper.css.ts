import { fallbackVar, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const wrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'relative',
  width: '100%',
  height: '100%',
  maxWidth: '720px',
  margin: '0 auto',
  overflow: 'hidden',
  backgroundColor: vars.color.primary,
});
