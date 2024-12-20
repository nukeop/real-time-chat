import clsx from 'clsx';
import { HTMLMotionProps, motion } from 'framer-motion';

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'danger'
    | 'info';
} & HTMLMotionProps<'button'>;

const variantClasses = {
  primary:
    'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg active:from-blue-700 active:to-indigo-800',
  secondary:
    'bg-slate-700 hover:bg-slate-600 text-white shadow-md active:bg-slate-800',
  tertiary:
    'bg-transparent border border-slate-300 text-slate-100 shadow-sm hover:bg-slate-300',
  success:
    'bg-green-600 hover:bg-green-700 text-white shadow-lg active:bg-green-800',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg active:bg-red-800',
  info: 'bg-blue-400 hover:bg-blue-500 text-white shadow-lg active:bg-blue-600',
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick,
  className = '',
  variant = 'primary',
  isLoading,
  ...props
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={clsx(
        'flex flex-row items-center rounded-md px-4 py-2 font-semibold text-white shadow-md transition duration-200 focus:outline-none focus:ring-offset-2 focus:ring-offset-slate-900',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
