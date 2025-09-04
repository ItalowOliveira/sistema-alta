import { useState } from "react"; // 1. Importar useState
import { User, Stethoscope, HeartPulse, ClipboardList, Clock, Activity} from "lucide-react";

type PtsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};


export default function ModalPtsTemplate({ isOpen, onClose }: PtsModalProps) {
    // 2. Criar estado para controlar o profissional selecionado
    const [professional, setProfessional] = useState('');

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

      {/* --- Seção: Dados do Paciente --- */}
      <div className="mb-8">
        <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
          <User className="text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Dados do Paciente</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="md:col-span-2">
            <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Paciente</label>
            <select
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            >
                <option value="" disabled selected>
                Nome completo do paciente
                </option>
                <option value="joao">João da Silva</option>
                <option value="maria">Maria Oliveira</option>
                <option value="carlos">Carlos Souza</option>
            </select>
          </div>
        </div>
      </div>

      {/* --- Seção: Equipe Multiprofissional --- */}
      <div className="mb-8">
        <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
          <Stethoscope className="text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Equipe Multiprofissional</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="md:col-span-2">
            {/* 3. Conectar o select ao estado */}
            <select
                value={professional}
                onChange={(e) => setProfessional(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            >
                <option value="" disabled>
                    Selecione o profissional
                </option>
                <option value="enfermagem">Enfermagem</option>
                <option value="nutricionista">Nutricionista</option>
                <option value="fisioterapia">Fisioterapia</option>
            </select>
            </div>
        </div>
      </div>

       {/* 4. SEÇÃO CONDICIONAL PARA FISIOTERAPIA */}
      {professional === 'fisioterapia' && (
        <div className="mb-8 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
                <Activity className="text-blue-500" /> {/* Ícone para fisio */}
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Avaliação Fisioterapêutica</h3>
            </div>
            
            {/* Sinais Vitais */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">PA</label>
                    <input type="text" placeholder="113/90 mmHg" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
                </div>
                <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">FC</label>
                    <input type="text" placeholder="100 bpm" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
                </div>
                <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">SatO2</label>
                    <input type="text" placeholder="97%" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
                </div>
            </div>

            {/* Avaliações em texto */}
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Inspeção e palpação</label>
                    <textarea rows={3} placeholder="Ao chegar no leito, paciente se..." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
                </div>
                <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Avaliação Física</label>
                    <textarea rows={3} placeholder="Descreva a avaliação física..." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
                </div>
                 <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Grau de Mobilidade</label>
                    <textarea rows={3} placeholder="mobilidade de MMSS preservadas..." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
                </div>
                 <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Força e sensibilidade</label>
                    <textarea rows={3} placeholder="de MMSS preservadas." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
                </div>
                 <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Nível de dependência</label>
                    <textarea rows={3} placeholder="semi-dependente..." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
                </div>
            </div>
        </div>
      )}

      
      {/* --- Seção: Histórico Clínico --- */}
      <div className="mb-8">
        <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
          <HeartPulse className="text-red-500" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Histórico Clínico</h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Medicamentos de Uso Contínuo</label>
            <textarea rows={4} placeholder="Liste os medicamentos e dosagens." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
          </div>
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">História Pregressa</label>
            <textarea rows={4} placeholder="Descreva o histórico do paciente, como a lesão medular e outras condições pré-existentes." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
          </div>
        </div>
      </div>
      
      {/* --- Seção: Avaliação Geral --- */}
        <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
                <ClipboardList className="text-green-500" />
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Avaliação</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Avaliação Geral</label>
                    <textarea rows={6} placeholder="Estado geral do paciente, descrição detalhada das lesões por pressão (local, grau, profundidade, tecido, etc.)." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
                </div>
            </div>
        </div>

      {/* --- Seção: Proposta de Tratamento --- */}
      {/* ... (o resto do seu código continua aqui) ... */}
        <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
                <Clock className="text-red-500" />
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Ações de Curto Prazo (Início Imediato)</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Proposta de Tratamento</label>
                    <textarea rows={3} placeholder="Ex: Avaliação da LPP, realizar curativo com..." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
                </div>
            </div>
        </div>

           <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
                <Clock className="text-yellow-500" />
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Ações de Médio Prazo</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Proposta de Tratamento</label>
                    <textarea rows={3} placeholder="Ex: Avaliação da LPP, realizar curativo com..." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
                </div>
            </div>
        </div>

           <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
                <Clock className="text-green-500" />
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Ações de Longo Prazo</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Proposta de Tratamento</label>
                    <textarea rows={3} placeholder="Ex: Avaliação da LPP, realizar curativo com..." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
                </div>
            </div>
        </div>

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