import { ComponentProps } from 'react';

import BaseBtn from './base/BaseBtn';

export default function NaverBtn(props: ComponentProps<'button'>) {
  return (
    <BaseBtn icon="naver" bgColor="#03C75A" symbolColor="white" text="네이버 로그인" {...props} />
  );
}
