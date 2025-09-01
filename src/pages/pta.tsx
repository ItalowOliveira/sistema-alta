import Modal from "../componentes/modal/ptaModal.tsx";

export default function Painel() {
  return (
    <div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Painel</h1>
        <h1 className="text-sm text-gray-500 dark:text-gray-400 mb-4">Cadastro de PTA</h1>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => <Modal isOpen={true} onClose={() => {}} children={<div>Conteúdo do Modal</div>} />}>
          Abrir Modal PTA
        </button>

      </div>

  );
}