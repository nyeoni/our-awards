import { ComponentProps } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import BackIcon from '/public/svgs/back.svg';

export function NavigateButton({
  label,
  className = '',
  ...props
}: { label: string } & ComponentProps<'button'>) {
  const classes = `flex items-center text-sm w-fit py-2 ${className}`;

  return (
    <button className={classes} {...props}>
      <BackIcon style={{ color: 'white' }} />
      <span className="ml-0.5 text-xs font-medium">{label}</span>
    </button>
  );
}
