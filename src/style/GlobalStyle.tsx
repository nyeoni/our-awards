import { Global, Theme, css } from '@emotion/react';

export default function GlobalStyle() {
  return <Global styles={globalCss} />;
}

const globalCss = (theme: Theme) => css`
  html,
  body {
    width: 100%;
    height: 100%;
  }

  body {
    display: flex;
    flex-direction: column;

    background-image: linear-gradient(to right, #e0c3fc, #8ec5fc);
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue',
      'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  }

  * {
    font-family: inherit;
    word-break: keep-all;
    word-wrap: break-word;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* iOS Button Active */

    -ms-overflow-style: none; /* IE 11 */
    scrollbar-width: none; /* Firefox 64 */
    ::-webkit-scrollbar {
      display: none !important;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;
