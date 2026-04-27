'use client';
import { forwardRef } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
}

const TextField = forwardRef<HTMLInputElement, Props>(function TextField(
  { label, error, id, ...rest },
  ref,
) {
  const inputId = id ?? `tf-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} ref={ref} className="text-input" {...rest} />
      {error && <div className="input-error">{error}</div>}
    </div>
  );
});

export default TextField;
