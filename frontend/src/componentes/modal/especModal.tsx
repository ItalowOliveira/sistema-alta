import { useState } from "react";
import ModalPTANutricao from "./PTAsModal/modalPTANutricao";
import ModalPTAEnfermagem from "./PTAsModal/modalPTAEnfermagem";
import ModalPTAServicoSocial from "./PTAsModal/modalPTAServicoSocial";
import ModalPTAPsicologia from "./PTAsModal/modalPTAPsicologio";
import ModalPTAFisioterapia from "./PTAsModal/modalPTAFisioterapia";

type EspecModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function EspecTemplate({ isOpen, onClose }: EspecModalProps) {
    const [isEnfermagemModalOpen, setIsEnfermagemModalOpen,] = useState(false);
    const [isNutricaoModalOpen, setIsNutricaoModalOpen] = useState(false);
    const [isServicoSocialModalOpen, setIsServicoSocialModalOpen] = useState(false);
    const [isPsicologiaModalOpen, setIsPsicologiaModalOpen] = useState(false);
    const [isFisioterapiaModalOpen, setIsFisioterapiaModalOpen] = useState(false);

    if (!isOpen) return null;
        return (
            <>
                <div
                    id="select-modal"
                    aria-hidden={!isOpen}
                    className={`${isOpen ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Profissional
                                </h3>
                                <button onClick={onClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="select-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <p className="text-gray-500 dark:text-gray-400 mb-4"> Selecione sua especialidade: </p>
                                <ul className="space-y-4 mb-4">
                                    <li>
                                        <input type="radio" id="job-1" name="job" value="job-1" className="hidden peer" required />
                                        <label
                                            onClick={() => setIsEnfermagemModalOpen(true)}
                                            className="inline-flex items-center justify-between w-full p-3 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                            <div className="block">
                                                <div className="w-full text-lg font-semibold">Enfermagem</div>
                                            </div>
                                            <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
                                        </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="job-2" name="job" value="job-2" className="hidden peer" />
                                        <label
                                         onClick={() => setIsFisioterapiaModalOpen(true)}
                                         className="inline-flex items-center justify-between w-full p-3 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                            <div className="block">
                                                <div className="w-full text-lg font-semibold">Fisioterapia</div>
                                            </div>
                                            <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
                                        </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="job-2" name="job" value="job-2" className="hidden peer" />
                                        <label 
                                        onClick={() => setIsServicoSocialModalOpen(true)}
                                        className="inline-flex items-center justify-between w-full p-3 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                            <div className="block">
                                                <div className="w-full text-lg font-semibold">Serviço Social</div>
                                            </div>
                                            <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
                                        </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="job-2" name="job" value="job-2" className="hidden peer" />
                                        <label 
                                        onClick={() => setIsPsicologiaModalOpen(true)}
                                        className="inline-flex items-center justify-between w-full p-3 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                            <div className="block">
                                                <div className="w-full text-lg font-semibold">Psicologia</div>
                                            </div>
                                            <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
                                        </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="job-3" name="job" value="job-3" className="hidden peer" />
                                        <label 
                                        onClick={() => setIsNutricaoModalOpen(true)}
                                        className="inline-flex items-center justify-between w-full p-3 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                            <div className="block">
                                                <div className="w-full text-lg font-semibold">Nutrição</div>
                                            </div>
                                            <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
                                        </label>
                                    </li>
                                </ul>
                                <div className="relative p-4 w-full max-w-md max-h-full">
                                    <div className="flex items-center justify-center p-1 md:p-1 border-b rounded-t dark:border-gray-600 border-gray-200"></div>
                                </div>
                                <button onClick={onClose} className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal de Enfermagem */}
                {isEnfermagemModalOpen && (
                    <ModalPTAEnfermagem isOpen={isEnfermagemModalOpen} onClose={() => setIsEnfermagemModalOpen(false)} />
                )}

                {/* Modal de Nutrição */}
                {isNutricaoModalOpen && (
                    <ModalPTANutricao isOpen={isNutricaoModalOpen} onClose={() => setIsNutricaoModalOpen(false)} />
                )}

                {/* Modal de Serviço Social */}
                {isServicoSocialModalOpen && (
                    <ModalPTAServicoSocial isOpen={isServicoSocialModalOpen} onClose={() => setIsServicoSocialModalOpen(false)} />
                )}

                {/* Modal de Psicologia */}
                {isPsicologiaModalOpen && (
                    <ModalPTAPsicologia isOpen={isPsicologiaModalOpen} onClose={() => setIsPsicologiaModalOpen(false)} />
                )}

                {/* Modal de Fisioterapia */}
                {isFisioterapiaModalOpen && (
                    <ModalPTAFisioterapia isOpen={isFisioterapiaModalOpen} onClose={() => setIsFisioterapiaModalOpen(false)} />
                )}  
            </>
        );
}