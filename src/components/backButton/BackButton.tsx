import type { ButtonProps } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import BackIcon from '@/public/svgs/back.svg';
import { twMerge } from 'tailwind-merge';

const BackButton = ({ children, className, ...props }: ButtonProps) => {
  const classNames = twMerge('px-0', className);
  return (
    <Button
      className={classNames}
      variant="light"
      startContent={<BackIcon style={{ color: 'white' }} />}
      {...props}
    >
      {children}
    </Button>
  );
};

export default BackButton;
