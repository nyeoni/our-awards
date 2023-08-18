import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  duration?: number;
}

function Toast({ message, duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 w-full rounded bg-primary/[0.06] shadow-md flex justify-center">
      {message}
    </div>
  );
}

export default Toast;
