import { BadgeCheck } from "lucide-react";

type ModalPopUpProps = {
    isOpen: boolean;
    onClose: () => void;
    onClick: () => void;
    title?: string;
    message?: string;
};

export default function ModalPopUp({ isOpen, onClose, onClick, title = "Confirm", message = "Are you sure?" }: ModalPopUpProps) {
    if (!isOpen) return null;

    return (
        <div id="popup-modal" className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        aria-label="Close modal"
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        <BadgeCheck className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-green-500" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{title}</h3>
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-300">{message}</p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => {
                                    onClick();
                                    onClose();
                                }}
                                type="button"
                                className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}