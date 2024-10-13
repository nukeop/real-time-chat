import {
  DialogPanel,
  DialogTitle,
  Dialog as HeadlessDialog,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react/jsx-runtime';

type Button = {
  text: string;
  onClick: () => void;
  primary?: boolean;
};

type DialogOptions = {
  title?: string;
  description?: string;
  content?: React.ReactNode;
  buttons?: Button[];
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
};

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  options: DialogOptions;
};

export const Dialog = ({ isOpen, onClose, options }: DialogProps) => {
  const { title, description, content, buttons, size = 'md' } = options;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center"></div>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel
              className={`w-full ${sizeClasses[size]} transform overflow-hidden rounded-2xl bg-gray-800 bg-opacity-80 p-6 text-left align-middle shadow-xl backdrop-blur-lg transition-all`}
            >
              {title && (
                <DialogTitle
                  as="h3"
                  className="mb-4 text-lg font-medium leading-6 text-gray-100"
                >
                  {title}
                </DialogTitle>
              )}
              {description && (
                <div className="mt-2">
                  <p className="text-sm text-gray-300">{description}</p>
                </div>
              )}
              {content && <div className="mt-4">{content}</div>}
              {buttons && buttons.length > 0 && (
                <div className="mt-4 flex justify-end space-x-2">
                  {buttons.map((button, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                        button.primary
                          ? 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:ring-blue-500'
                          : 'bg-gray-600 text-gray-100 hover:bg-gray-500 focus-visible:ring-gray-500'
                      }`}
                      onClick={button.onClick}
                    >
                      {button.text}
                    </button>
                  ))}
                </div>
              )}
            </DialogPanel>
          </TransitionChild>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};
