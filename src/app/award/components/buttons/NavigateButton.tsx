import type { ComponentProps } from 'react';

import BackIcon from '@/public/svgs/back.svg';

export function NavigateButton({
  label,
  className = '',
  ...props
}: { label: string } & ComponentProps<'button'>) {
  const classes = `flex items-center text-sm w-fit py-2 ${className}`;

  return (
    <button className={classes} {...props}>
      <BackIcon style={{ color: 'white' }} />
      <span className="ml-1.5 text-sm font-medium">{label}</span>
    </button>
  );
}
