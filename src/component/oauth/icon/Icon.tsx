import type { SVGProps } from 'react';

import Kakao from './kakao.svg';
import Naver from './naver.svg';
import { default as Google } from '../icon/google.svg';

export type IconType = 'naver' | 'kakao' | 'google';

interface IconProps extends SVGProps<SVGSVGElement> {
  type: IconType;
}

export default function Icon({ type, ...props }: IconProps) {
  switch (type) {
    case 'naver':
      return <Naver {...props} />;
    case 'kakao':
      return <Kakao {...props} />;
    case 'google':
      return <Google {...props} />;
  }
}
