import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Portal } from '../portal';
import styles from './Toast.module.css';

interface ToastProps {
  isVisible: boolean;
  message: string;
  duration?: number;
}

function Toast({ isVisible, message, duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, duration);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <Portal>
          <div className={styles.container}>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { ease: 'easeOut', duration: 0.2 } }}
              className={styles.base}
            >
              {message}
            </motion.div>
          </div>
        </Portal>
      )}
    </AnimatePresence>
  );
}

export default Toast;
