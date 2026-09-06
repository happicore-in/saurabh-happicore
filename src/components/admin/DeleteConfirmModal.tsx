import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  message?: string;
  itemName?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  title,
  message = 'This action cannot be undone.',
  itemName,
  onConfirm,
  onCancel,
  isDeleting = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/80 backdrop-blur-sm">
      <div className="bg-[#0D0E12] border border-[#2A2E37] rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-full bg-[#FF4D4D]/10 border border-[#FF4D4D]/25 flex items-center justify-center text-[#FF4D4D] flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <button
            onClick={onCancel}
            className="text-[#6F7682] hover:text-[#F2F4F7] transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1.5">
          <h3 className="font-mono text-base font-bold text-[#F2F4F7] uppercase tracking-wider">
            {title}
          </h3>
          {itemName && (
            <p className="font-mono text-xs text-[#F5A623] bg-[#F5A623]/10 px-2 py-1 rounded border border-[#F5A623]/20 break-all">
              {itemName}
            </p>
          )}
          <p className="text-xs text-[#A7ADB7] font-sans">
            {message}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 bg-[#171A21] hover:bg-[#202530] text-[#A7ADB7] hover:text-[#F2F4F7] text-xs font-mono rounded border border-[#22252A] transition-colors cursor-pointer"
          >
            CANCEL
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-[#FF4D4D] hover:bg-[#FF3333] text-[#FFFFFF] text-xs font-mono font-bold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {isDeleting ? 'DELETING...' : 'DELETE'}
          </button>
        </div>
      </div>
    </div>
  );
};
