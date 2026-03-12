import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    fullWidth?: boolean;
    overrideVariant?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'primary', size = 'md', isLoading = false, fullWidth = false, className, children, disabled, overrideVariant = false, ...props }, ref) => {
        const baseStyles = 'font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

        const variantStyles = {
            primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
            secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
            outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
        };

        const sizeStyles = {
            sm: 'px-4 py-2.5 text-sm',
            md: 'px-5 py-3 text-base',
            lg: 'px-8 py-3.5 text-lg',
        };

        const widthStyle = fullWidth ? 'w-full' : '';

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={
                    `${baseStyles}
                    ${overrideVariant ? "" : variantStyles[variant]}
                    ${className || ''}
                    ${sizeStyles[size]}
                    ${widthStyle}`
                }
                {...props}
            >
                {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                    </span>
                ) : (
                    children
                )}
            </button>
        );
    },
);

Button.displayName = 'Button';

export default Button;
