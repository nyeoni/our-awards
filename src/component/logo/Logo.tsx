'use client';

import Image from 'next/image';

import logoImage from '@/public/assets/logo.png';

const Logo = () => {
  return (
    <Image
      src={logoImage}
      alt="logo"
      style={{
        width: '50%',
        height: 'auto',
      }}
      quality={100}
      priority
    />
  );
};

export default Logo;
