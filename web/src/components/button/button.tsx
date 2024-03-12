import { ButtonHTMLAttributes } from "react";

export default function Button({
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<any>) {
  return (
    <>
      <button
        {...rest}
        className={`flex items-center justify-center px-4 h-10 bg-blue-500
         hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  ${className}`}
      >
        {children}
      </button>
    </>
  );
}
