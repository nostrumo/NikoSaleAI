export const Card = ({ className = '', children }) => {
  return <div className={`bg-white dark:bg-zinc-900 rounded-lg shadow-md ${className}`}>{children}</div>;
};

export const CardContent = ({ className = '', children }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
