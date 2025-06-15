export const Description = ({ children, className = "" }) => (
  <p className={`mb-3 font-medium text-muted-foreground ${className}`}>
    {children}
  </p>
);