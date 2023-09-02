import type { ComponentProps } from 'react';

import BaseBtn from './base/BaseBtn';

export default function KakaoBtn(props: ComponentProps<'button'>) {
  return (
    <BaseBtn
      icon="kakao"
      bgColor="#FEE500"
      symbolColor="#000000"
      labelColor="rgb(0, 0, 0, 0.85)"
      text="카카오 로그인"
      {...props}
    />
  );
}
