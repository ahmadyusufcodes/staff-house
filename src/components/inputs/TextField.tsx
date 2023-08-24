import React from 'react';
import clsx from 'clsx';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  rounded?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  description,
  error,
  rounded,
  icon,
  iconPosition = 'left',
  className,
  ...rest
}) => {
  const hasError = !!error;

  const inputClasses = clsx(
    'appearance-none bg-gray-50 border w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline autofill:bg-transparent',
    hasError ? 'border-red-500' : 'border-gray-300',
    rounded ? `rounded-${rounded}` : 'rounded-none',
    iconPosition === 'left' && icon ? 'pl-10' : 'pl-3',
    iconPosition === 'right' && icon ? 'pr-10' : 'pr-3',
    className
  );

  const renderIcon = () => {
    if (!icon) return null;
    return <div className={`absolute top-0 bottom-0 flex items-center pointer-events-none ${
      iconPosition === 'left' ? 'left-0 pl-3' : 'right-0 pr-3'
    }`}>{icon}</div>;
  };

  return (
    <div className="relative mb-4 w-full">
      {
        label && (
          <label className="block text-[#747E88] text-sm font-semibold mb-1" htmlFor={label}>
            {label}
          </label>
        )
      }
      <div className="relative">
        {iconPosition === 'left' && renderIcon()}
        <input className={inputClasses} id={label} {...rest} />
        {iconPosition === 'right' && renderIcon()}
      </div>
      {description && <p className="text-gray-500 text-xs italic">{description}</p>}
      {error && <p className="text-red-500 text-xs italic pt-2">{error}</p>}
    </div>
  );
};

export default TextField;
