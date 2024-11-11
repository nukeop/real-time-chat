import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { forwardRef, useEffect, useState } from 'react';

import { ToastState } from '../../_contexts/ToastContext';
import { useToast } from '../../_hooks/useToast';

const Toast = forwardRef<HTMLDivElement, ToastState>(
  ({ id, title, message, type = 'info', duration = 5000 }, ref) => {
    const { removeToast } = useToast();
    const [progress, setProgress] = useState(100);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress <= 0) {
            clearInterval(timer);
            removeToast(id);
            return 0;
          }
          return prevProgress - (100 / duration) * 100;
        });
      }, 100);

      return () => clearInterval(timer);
    }, [duration, id, removeToast]);

    const icons = {
      success: <CheckCircleIcon className="h-6 w-6 text-green-400" />,
      warning: <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />,
      error: <XMarkIcon className="h-6 w-6 text-red-400" />,
      info: <InformationCircleIcon className="h-6 w-6 text-blue-400" />,
    };

    const colors = {
      success: 'from-green-400 to-blue-500',
      warning: 'from-yellow-400 to-orange-500',
      error: 'from-red-400 to-pink-500',
      info: 'from-blue-400 to-indigo-500',
    };

    return (
      <div
        ref={ref}
        className={`bg-gradient-to-r ${colors[type]} w-full overflow-hidden rounded-lg border border-white border-opacity-20 text-white shadow-lg`}
      >
        <div className="bg-black bg-opacity-30 p-4 backdrop-blur-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">{icons[type]}</div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium">{title}</p>
              <p className="mt-1 text-sm opacity-90">{message}</p>
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                className="inline-flex text-white hover:text-gray-200 focus:outline-none"
                onClick={() => removeToast(id)}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="h-1 w-full bg-gray-700">
          <div
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  },
);

export default Toast;
