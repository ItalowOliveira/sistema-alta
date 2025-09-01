import { User, Stethoscope, HeartPulse, ClipboardList, Clock} from "lucide-react";

export default function ModalPtsTemplate() {
  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="dark:bg-[#17181c] rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">


        <div className="flex justify-between items-center p-5 border-b sticky top-0 text-gray-500 dark:text-gray-400 rounded-t-lg">
          <h3 className="text-xl font-semibold text-white">
            Projeto Terapêutico Singular
          </h3>
          <button className="text-gray-400 hover:bg-gray-200 rounded-full p-1.5 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>


        <div className="p-6 overflow-y-auto">


          <div className="mb-8">
            <div className="flex items-center gap-3 border-b pb-2 mb-4">
              <User className="text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Dados do Paciente</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="md:col-span-2">
                <label className="block mb-1.5 text-sm font-medium text-gray-600">Paciente</label>
                <input type="text" placeholder="Nome completo do paciente" className="bg-gray-50 w-full bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600">Idade</label>
                <input type="number" placeholder="Ex: 35" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600">ESF de Referência</label>
                <input type="text" placeholder="Ex: ESF Vila Nova" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1.5 text-sm font-medium text-gray-600">Endereço</label>
                <input type="text" placeholder="Rua, número, bairro" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
              </div>
            </div>
          </div>

          {/* --- Seção: Equipe Multiprofissional --- */}
          <div className="mb-8">
            <div className="flex items-center gap-3 border-b pb-2 mb-4">
              <Stethoscope className="text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Equipe Multiprofissional</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <input type="text" placeholder="Nome do(a) enfermeira(o)" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
                <input type="text" placeholder="Nome do(a) médica(o)" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
                <input type="text" placeholder="Nome do(a) nutricionista" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
                <input type="text" placeholder="Nome do(a) fisioterapeuta" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
              <div className="md:col-span-2">
                <input type="text" placeholder="Nome do(a) psicólogo(a)" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
              </div>
            </div>
          </div>
          
          {/* --- Seção: Histórico Clínico --- */}
          <div className="mb-8">
            <div className="flex items-center gap-3 border-b pb-2 mb-4">
              <HeartPulse className="text-red-500" />
              <h3 className="text-lg font-semibold text-gray-800">Histórico Clínico</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600">Medicamentos de Uso Contínuo</label>
                <textarea rows={4} placeholder="Liste os medicamentos, dosagens e horários." className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600">História Pregressa</label>
                <textarea rows={4} placeholder="Descreva o histórico do paciente, como a lesão medular e outras condições pré-existentes." className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
              </div>
            </div>
          </div>
          
          {/* --- Seção: Avaliação de Enfermagem --- */}
           <div className="mb-8">
                <div className="flex items-center gap-3 border-b pb-2 mb-4">
                    <ClipboardList className="text-green-500" />
                    <h3 className="text-lg font-semibold text-gray-800">Avaliação de Enfermagem</h3>
                </div>
                 <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block mb-1.5 text-sm font-medium text-gray-600">Avaliação Geral e Lesões</label>
                        <textarea rows={6} placeholder="Estado geral do paciente, descrição detalhada das lesões por pressão (local, grau, profundidade, tecido, etc.)." className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
                    </div>
                    <div>
                        <label className="block mb-1.5 text-sm font-medium text-gray-600">Eliminações</label>
                        <textarea rows={3} placeholder="Descreva o padrão de eliminações vesicais e intestinais." className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
                    </div>
                </div>
           </div>

          {/* --- Seção: Proposta de Tratamento --- */}
           <div className="mb-8">
                <div className="flex items-center gap-3 border-b pb-2 mb-4">
                    <Clock className="text-yellow-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Ações de Curto Prazo (Início Imediato)</h3>
                </div>
                 <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block mb-1.5 text-sm font-medium text-gray-600">Enfermagem</label>
                        <textarea rows={3} placeholder="Ex: Avaliação da LPP, realizar curativo com..." className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
                    </div>
                     <div>
                        <label className="block mb-1.5 text-sm font-medium text-gray-600">Fisioterapia</label>
                        <textarea rows={3} placeholder="Ex: Orientação com manejo no leito, trocas de decúbitos..." className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
                    </div>
                     <div>
                        <label className="block mb-1.5 text-sm font-medium text-gray-600">Nutrição</label>
                        <textarea rows={3} placeholder="Ex: Investigar hábitos alimentares, trabalhar estratégias para consumo de..." className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
                    </div>
                </div>
           </div>
        </div>

        {/* Footer do Modal */}
        <div className="flex justify-end items-center gap-3 p-4 dark:bg-[#17181c] border-t sticky bottom-0 rounded-b-lg">
          <button className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
            Cancelar
          </button>
          <button className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800">
            Salvar PTS
          </button>
        </div>

      </div>
    </div>
  );
}