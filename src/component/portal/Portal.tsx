'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  isOverlay?: boolean;
  children: ReactNode;
}

export const Portal = ({ children, isOverlay = false }: PortalProps) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#portal');
    setMounted(true);
  }, []);

  return mounted && ref.current ? createPortal(<>{children}</>, ref.current) : null;
};
