import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import styles from './BaseBtn.module.css';
import Icon from '../icon/Icon';
import type { IconType } from '../icon/Icon';

interface BaseBtnProps extends ComponentProps<'button'> {
  icon: IconType;
  text: string;
  bgColor?: string;
  symbolColor?: string;
  labelColor?: string;
  align?: 'center' | 'between';
}

export default function BaseBtn({
  icon,
  text,
  bgColor,
  symbolColor = '#ffffff',
  labelColor,
  align = 'center',
  className = '',
  style = {},
  ...props
}: BaseBtnProps) {
  const colorStyle = {
    backgroundColor: bgColor ?? '#000000',
    color: labelColor ?? '#ffffff',
    ...style,
  };
  const alignClass = styles[`align-${align}`];
  const classNames = twMerge(styles.base, alignClass, className);

  return (
    <button className={classNames} style={colorStyle} {...props}>
      <Icon
        className={styles.icon}
        type={icon}
        color={symbolColor}
        style={{ color: `${symbolColor}` }}
      />
      <span className={styles.text}>{text}</span>
    </button>
  );
}
