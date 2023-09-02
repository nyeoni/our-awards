import type { ComponentProps } from 'react';

import BaseBtn from './base/BaseBtn';

export default function GoogleBtn(props: ComponentProps<'button'>) {
  return (
    <BaseBtn
      className="font-Robotomedium"
      icon="google"
      bgColor="#ffffff"
      symbolColor="white"
      labelColor="#7E7E7E"
      text="Google 로그인"
      {...props}
    />
  );
}
