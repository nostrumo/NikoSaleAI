export const Label = ({ htmlFor, className = '', children }) => {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium mb-1 dark:text-white ${className}`}>
      {children}
    </label>
  );
};
