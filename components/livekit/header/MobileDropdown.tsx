import { AnimatePresence, motion } from "framer-motion";
import { Settings, Share, X } from "lucide-react";
import { useEffect, useRef } from "react";

interface MobileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
  onShareInvite: () => void;
}

function MobileDropdown({ 
  isOpen, 
  onClose, 
  onOpenSettings, 
  onShareInvite 
}: MobileDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const menuItems = [
    {
      icon: Share,
      label: "Share & Invite",
      onClick: () => {
        onShareInvite();
        onClose();
      },
    },
    {
      icon: Settings,
      label: "Settings",
      onClick: () => {
        onOpenSettings();
        onClose();
      },
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="relative" ref={dropdownRef}>
          <motion.div
            className="fixed inset-0 bg-black/20 md:hidden z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="absolute right-0 top-full mt-2 w-40 bg-card border border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden"
            style={{ 
              backgroundColor: 'var(--card)', 
              borderColor: 'var(--card-border)' 
            }}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.2 
            }}
          >
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.button
                    key={index}
                    onClick={item.onClick}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-800/50 transition-colors text-foreground"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <IconComponent className="w-5 h-5 text-primary" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default MobileDropdown;
