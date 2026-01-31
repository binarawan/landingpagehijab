
import React from 'react';
import { ICONS } from '../constants';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isWhatsApp?: boolean;
  pulse?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = "", isWhatsApp = false, pulse = false }) => {
  const baseStyles = "flex items-center justify-center gap-2 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg active:shadow-sm";
  const colorStyles = isWhatsApp 
    ? "bg-[#25D366] text-white hover:bg-[#20bd5c]" 
    : "bg-pink-500 text-white hover:bg-pink-600";
  const pulseStyle = pulse ? "animate-pulse-soft" : "";

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${colorStyles} ${pulseStyle} ${className}`}
    >
      {isWhatsApp && ICONS.WhatsApp}
      {children}
    </button>
  );
};

export default Button;
