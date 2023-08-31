import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Portal } from '../portal';
import styles from './Toast.module.css';

interface ToastProps {
  isVisible: boolean;
  message: string;
  onClose?: () => void;
  duration?: number;
}

export const useToast = () => {
  const [isVisible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [duration, setDuration] = useState(3000);

  const open = (message: string, duration?: number) => {
    setVisible(true);
    setMessage(message);
    if (duration) setDuration(duration);
  };

  const close = () => {
    setVisible(false);
    setMessage('');
  };

  return { isVisible, message, duration, open, close };
};

function Toast({ isVisible, message, onClose, duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);

    setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);
  }, [isVisible]);

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
