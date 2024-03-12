import { InputHTMLAttributes } from "react";
import { FieldRenderProps } from "react-final-form";

type Props = FieldRenderProps<string> &
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
  };

export default function TextInput({
  label,
  input,
  meta: { touched, error },
  ...rest
}: Props) {
  return (
    <>
      <div className=''>
        <label className='text-gray-700 text-sm font-bold mb-2' htmlFor='input'>
          {label}
        </label>
        <input
          id='input'
          data-testid='text-input'
          className='shadow appearance-none border rounded w-full py-2 px-3
           text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          {...input}
          {...rest}
        />
        <div className='text-red-500 text-xs italic'>{touched && error}</div>
      </div>
    </>
  );
}
