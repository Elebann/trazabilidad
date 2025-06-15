export const Description = ({ children, className = "" }) => (
  <p className={`mb-4 font-medium text-muted-foreground ${className}`}>
    {children}
  </p>
);