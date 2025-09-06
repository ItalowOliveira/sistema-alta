// Importações permanecem as mesmas
import { useState, memo } from "react";
import { User, CalendarClock, Stethoscope, HeartPulse, ClipboardList, Clock, Activity } from "lucide-react";
import ModalTemplate from "./ModalTemplate";

type PtsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// --- PASSO 1: Extrair a seção de Fisioterapia para um componente separado ---
// Usamos `memo` para evitar re-renderizações desnecessárias deste componente.
const AvaliacaoFisioterapeutica = memo(function AvaliacaoFisioterapeutica() {
  return (
    <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
      <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
        <Activity className="text-blue-500" />
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
  );
});


export default function ModalPtsTemplate({ isOpen, onClose }: PtsModalProps) {
  const [professional, setProfessional] = useState('');

  return (
    <ModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      TituloModal="Projeto Terapêutico Singular"
      BtnText="Salvar PTS"
      Conteudo={
        <>
          {/* Seção Dados do Paciente (sem alterações) */}
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

          {/* Seção Equipe (sem alterações) */}
          <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <Stethoscope className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Equipe Multiprofissional</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="md:col-span-2">
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

          {/* --- PASSO 2: Usar o componente e controlar a visibilidade com CSS --- */}
          {/* Este div sempre existe, mas a classe `hidden` o esconde visualmente */}
          <div className={`mb-8 ${professional === 'fisioterapia' ? 'block' : 'hidden'}`}>
            <AvaliacaoFisioterapeutica />
          </div>

          {/* --- O RESTO DO SEU FORMULÁRIO (sem alterações) --- */}

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

          <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <CalendarClock className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Proposta de Tratamento</h3>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 pb-2 mb-2">
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
            <div className="flex items-center gap-3 pb-2 mb-2">
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
            <div className="flex items-center gap-3 pb-2 mb-2">
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
        </>
      }
    />
  );


}