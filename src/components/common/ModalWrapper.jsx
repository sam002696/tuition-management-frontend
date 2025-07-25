import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const ModalWrapper = ({ open, setOpen, title, children }) => {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-xs" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="relative w-full max-w-4xl transform overflow-hidden rounded-xl bg-white shadow-xl transition-all">
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              {title && (
                <DialogTitle className="text-lg font-semibold text-gray-900 mb-4">
                  {title}
                </DialogTitle>
              )}
              {children}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalWrapper;
