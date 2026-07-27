import React from 'react';
import { IconX } from '@tabler/icons-react';
import { cn } from '../../utils/cn';

export const Modal = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className={cn("relative w-full max-w-lg rounded-xl bg-white shadow-lg", className)}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <IconX size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export const ModalHeader = ({ children, className }) => (
  <div className={cn("border-b px-6 py-4", className)}>
    {children}
  </div>
);

export const ModalTitle = ({ children, className }) => (
  <h2 className={cn("text-lg font-semibold text-gray-900", className)}>
    {children}
  </h2>
);

export const ModalBody = ({ children, className }) => (
  <div className={cn("px-6 py-4", className)}>
    {children}
  </div>
);

export const ModalFooter = ({ children, className }) => (
  <div className={cn("flex justify-end gap-3 border-t bg-gray-50 px-6 py-4 rounded-b-xl", className)}>
    {children}
  </div>
);
