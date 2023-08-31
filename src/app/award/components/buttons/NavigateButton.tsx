import { ComponentProps } from 'react';

import Link from 'next/link';

import BackIcon from '/public/svgs/back.svg';

interface Props extends ComponentProps<'a'> {
  path: string;
}

export function NavigateButton({ className = '', path }: Props) {
  const classes = `flex items-center text-sm w-fit py-2 ${className}`;

  return (
    <Link className={classes} href={path}>
      <BackIcon style={{ color: 'white' }} />
      <span className="ml-0.5 text-xs font-medium">메인페이지로</span>
    </Link>
  );
}
