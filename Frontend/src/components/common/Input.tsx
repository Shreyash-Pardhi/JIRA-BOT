import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon, className, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 flex items-center justify-center">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
              w-full px-4 py-3 border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              text-gray-900 placeholder-gray-500
              transition-all duration-200
              ${icon ? 'pl-12' : ''}
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className || ''}
            `}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-2 text-sm font-medium text-red-600">
                        {error}
                    </p>
                )}
            </div>
        );
    },
);

Input.displayName = 'Input';

export default Input;
