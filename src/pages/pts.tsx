import { useState } from "react";
import PtsModal from "../componentes/modal/ptsModal";

export default function ModalPtsTemplate() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Painel</h1>
      <h1 className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Cadastro de Projeto Terapêutico Singular
      </h1>

      <button
        type="button"
        onClick={() => setIsOpen(true)} 
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Cadastrar PTS
      </button>

      <PtsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}