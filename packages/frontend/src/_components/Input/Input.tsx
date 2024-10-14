'use client';

import { Input as HeadlessInput } from '@headlessui/react';
import {
  CheckIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, FC, HTMLInputTypeAttribute, useState } from 'react';

type InputProps = {
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  success?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  success,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={clsx('relative', className)}>
      <label className="mb-1 block text-sm font-medium text-gray-300">
        {label}
      </label>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <HeadlessInput
          type={type === 'password' && showPassword ? 'text' : type}
          className={clsx(
            'w-full max-w-96 border bg-gray-800 px-3 py-2',
            {
              'border-red-500': error,
              'border-green-500': success,
              'border-gray-600': !error && !success,
            },
            'rounded-md text-white placeholder-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500',
          )}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        )}
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-1 flex items-center text-sm text-red-500"
          >
            <ExclamationCircleIcon className="mr-1 h-4 w-4" />
            {error}
          </motion.p>
        )}
        {success && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-1 flex items-center text-sm text-green-500"
          >
            <CheckIcon className="mr-1 h-4 w-4" />
            {success}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;
