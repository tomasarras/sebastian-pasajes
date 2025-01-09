import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function Modal({ size = 'lg', children, title, isOpen, close, dialogClassName, innerRef }) {
  return (
    <Transition show={isOpen}>
      <Dialog className="relative z-50" onClose={close}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div ref={innerRef} className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                className={`relative transform overflow-visible rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-${size} ${dialogClassName}`}
              >
                <div className="bg-white pb-4 pt-5 sm:p-4 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <div className="flex justify-between w-full border-b-2 border-b-gray-200 pb-2">
                        <h2 className="font-semibold leading-6 text-gray-900">{title}</h2>
                        <button onClick={close}>
                          <XMarkIcon className="h-6 w-6" />
                        </button>
                      </div>
                      <div className="mt-2">
                        <div className="text-sm text-gray-500">{children}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
