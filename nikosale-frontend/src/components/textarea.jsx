import React from 'react';
import { X } from 'lucide-react';

export const Textarea = React.forwardRef(({ className = '', value = '', onChange, ...props }, ref) => {
  const showClearButton = value?.trim().length > 0;

  const handleClear = () => {
    if (onChange) {
      onChange({ target: { value: '' } });
    }
  };

  return (
    <div className="relative w-full">
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-md px-3 py-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none ${className}`}
        {...props}
      />
      {showClearButton && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2 top-2 text-muted-foreground hover:text-foreground transition"
          title="Очистить"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
});
