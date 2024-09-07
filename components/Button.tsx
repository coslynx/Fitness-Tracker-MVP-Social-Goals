import { useState } from 'react';
import classNames from 'classnames';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick,
  className,
  disabled,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    if (onClick) {
      await onClick(event);
    }
    setIsLoading(false);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={classNames(
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
        className,
        { 'opacity-50 cursor-not-allowed': disabled || isLoading }
      )}
      disabled={disabled || isLoading}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;