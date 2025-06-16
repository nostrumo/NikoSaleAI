export const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded-md hover:opacity-90 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
