import { ComponentProps } from 'react';

import Icon, { IconType } from '../icon/Icon';
import styles from './BaseBtn.module.css';

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
}: BaseBtnProps) {
  const style = {
    backgroundColor: bgColor ?? '#000000',
    color: labelColor ?? '#ffffff',
  };
  const alignClass = styles[`align-${align}`];

  return (
    <button className={`${styles.base} ${alignClass}`} style={style}>
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
