import React from "react";

export const Spacer = ({ label }) => {
  if (!label) {
    // Si no se entrega un label o es null, renderizar un separador simple, una linea horizontal
    return (
      <div className="px-3 py-3">
        <div className="h-px bg-sidebar-foreground/20" />
      </div>
    );
  }

    // Si se entrega un label, renderizar un separador con el label centrado, parecido a un fieldset de form
  return (
    <div className="px-4 py-2 relative">
      <div className="absolute inset-0 flex items-center px-2">
        <div className="w-full h-px bg-sidebar-foreground/20" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-2 text-xs font-medium bg-esteril-blue-light rounded text-sidebar-foreground/90">
          {label}
        </span>
      </div>
    </div>
  );
};