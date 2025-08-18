"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  className?: string;
  overlayClassName?: string;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md", 
  lg: "max-w-lg",
  xl: "max-w-xl"
};

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  icon,
  size = "md",
  showCloseButton = true,
  closeOnBackdropClick = true,
  className = "",
  overlayClassName = ""
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 flex items-center bg-black/50 justify-center z-50 ${overlayClassName}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeOnBackdropClick ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            className={`
              surface rounded-xl shadow-lg p-6 w-full mx-4 relative
              ${sizeClasses[size]}
              ${className}
            `}
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--card-border)",
              color: "var(--foreground)",
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.8,
              y: 20 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0 
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8,
              y: 20 
            }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || icon || showCloseButton) && (
              <motion.div 
                className="flex items-center justify-between mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                {(title || icon) && (
                  <div className="flex items-center space-x-3">
                    {icon && (
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "var(--primary)20" }}
                      >
                        {icon}
                      </div>
                    )}
                    {title && (
                      <h3 className="text-lg font-semibold">{title}</h3>
                    )}
                  </div>
                )}
                
                {showCloseButton && (
                  <motion.button
                    onClick={onClose}
                    className="text-muted hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.2 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Additional utility components for common modal patterns
export function ModalHeader({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function ModalBody({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <div className={`mb-6 ${className}`}>
      {children}
    </div>
  );
}

export default Modal;
