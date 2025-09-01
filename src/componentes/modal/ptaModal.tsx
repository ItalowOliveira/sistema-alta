

type PtsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};


export default function ModalPtaTemplate({ isOpen, onClose }: PtsModalProps) {
    if (!isOpen) return null;
  return (

   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
  <div className="dark:bg-[#17181c] bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">

    {/* Cabeçalho do Modal */}
    <div className="flex justify-between items-center p-5 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-[#17181c] rounded-t-lg">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Projeto Terapêutico Singular
      </h3>
      <button onClick={onClose} className="text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-1.5 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>

    {/* Conteúdo Rolável */}
    <div className="p-6 overflow-y-auto">

         <select
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                >
                  <option value="" disabled selected>
                    Profissional:
                  </option>
                  <option value="Enfermagem">Enfermagem</option>
                  <option value="Nutricionista">Nutricionista</option>
                  <option value="Fisioterapista">Fisioterapista</option>
                  <option value="Psicologo">Psicólogo</option>
                </select>







      </div>

    

    {/* Footer do Modal */}
    <div className="flex justify-end items-center gap-3 p-4 bg-white dark:bg-[#17181c] border-t dark:border-gray-700 sticky bottom-0 rounded-b-lg">
      <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
        Cancelar
      </button>
      <button className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:hover:bg-blue-600">
        Salvar PTS
      </button>
    </div>

  </div>
</div>

  );
}