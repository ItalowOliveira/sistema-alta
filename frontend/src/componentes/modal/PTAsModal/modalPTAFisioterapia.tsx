import ModalTemplate from "../modalTemplate";
import MedicoPacienteSection from "../../forms/blocks/MedicoPacienteSection";
import { User } from "lucide-react";

type ModalPTAFisioterapiaProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalPTAFisioterapia({ isOpen, onClose }: ModalPTAFisioterapiaProps) {
  if (!isOpen) return null;
  return (
    <ModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      TituloModal="Cadastro de Paciente"
      BtnText="Salvar Paciente"
      Conteudo={
        <>
          <MedicoPacienteSection />

            <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <User className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Fisioterapia</h3>
            </div>

         <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
          <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Níveis de dependência</h3>
            </div>
            <div className="block mb-2 text-base text-gray-900 dark:text-white">
              <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Banhar-se</span></label>
              <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Vestir-se</span></label>
              <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Ir ao Banheiro</span></label>
              <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Transferencia</span></label>
              <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Continencia</span></label>
              <label className="flex items-center"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Alimentação</span></label>
            </div>
          </div>
          </div>

          <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
          <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Paciente terá alta necessitando de:</label>
          </div>
            <div className="block mb-2 text-base text-gray-900 dark:text-white">
              <label className="flex items-center mb-1"><input type="radio" name="altaNecessita" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Fisioterapia Motora</span></label>
              <label className="flex items-center mb-1"><input type="radio" name="altaNecessita" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Respiratoria</span></label>
              <label className="flex items-center"><input type="radio" name="altaNecessita" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">outros</span></label>
            </div>
          </div>

          <div className="mt-4 mb-4">
            <label htmlFor="acoesRealizadas" className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Ações realizadas:</label>
            <textarea id="acoesRealizadas" rows={3} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Descreva as ações realizadas durante a sessão de fisioterapia"></textarea>
          </div>

          <div className="mt-4 mb-4">
            <label htmlFor="estadoClinicoInicial" className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Estado clínico inicial:</label>
            <textarea id="estadoClinicoInicial" rows={3} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Descreva o estado clínico do paciente no início da fisioterapia"></textarea>
          </div>

          <div className="mt-4 mb-4">
            <label htmlFor="evolucaoPaciente" className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Evolução do paciente:</label>
            <textarea id="evolucaoPaciente" rows={3} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Detalhe a evolução do paciente durante o tratamento"></textarea>
          </div>

          <div className="mt-4 mb-4">
            <label htmlFor="tipoOrientacao" className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Tipo de orientação recebida:</label>
            <input type="text" id="tipoOrientacao" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Ex: Orientações sobre exercícios domiciliares" />
          </div>

          <div className="mt-4 mb-4">
            <label htmlFor="descricaoOrientacao" className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Descrição da orientação recebida:</label>
            <textarea id="descricaoOrientacao" rows={3} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Forneça uma descrição detalhada da orientação"></textarea>
          </div>

          </div>
        </>
      }
    />
  );
}

