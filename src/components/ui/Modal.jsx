import { Dialog, DialogPanel } from "@headlessui/react";

export default function Modal({ isOpen, onClose, children }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[100]">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl rounded-modal border border-medical-border bg-white p-6 shadow-modal">
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
