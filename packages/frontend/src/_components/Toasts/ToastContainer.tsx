import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';

import { ToastState } from '../../_contexts/ToastContext';
import Toast from './Toast';

interface ToastContainerProps {
  toasts: ToastState[];
}

const ToastContainer: FC<ToastContainerProps> = ({ toasts }) => {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-full max-w-md -translate-x-1/2 transform px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="mb-4"
          >
            <Toast {...toast} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
