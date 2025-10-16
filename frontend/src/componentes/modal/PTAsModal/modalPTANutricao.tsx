import ModalTemplate from "../modalTemplate";
import { User } from "lucide-react";
import MedicoPacienteSection from "../../forms/blocks/MedicoPacienteSection";

type ModalPTANutricaoProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalPTANutricao({ isOpen, onClose }: ModalPTANutricaoProps) {
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
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Nutrição</h3>
            </div>

              <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Indicadores de necessidade nutricional:</label>
              <div className="block mb-2 text-base text-gray-900 dark:text-white">
                <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Inapetência</span></label>
                <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Desnutrição</span></label>
                <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Risco de desnutrição</span></label>
                <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Sobrepeso</span></label>
                <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Obesidade</span></label>
                <label className="flex items-center"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">NPT</span></label>
                <label className="flex items-center"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Outros:</span></label>
              </div>
            </div>
            </div>
            
            <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Paciente terá alta fazendo uso ou necessidade de:</label>
              <div className="block mb-2 text-base text-gray-900 dark:text-white">
                <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Oral</span></label>
                <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Oral assistida</span></label>
                <label className="flex items-center"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Enteral</span></label>
                <label className="flex items-center"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Outro</span></label>              
              </div>
            </div>

            <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ações desenvolvidas:</label>
              <div className="block mb-2 text-base text-gray-900 dark:text-white">
                <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Orientação para administração de dieta enteral</span></label>
                <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Encaminhamento</span></label>
                <label className="flex items-center"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Contato com a rede básica</span></label>
                <label className="flex items-center"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Outro</span></label>
              </div>
            </div>

            <div className="mt-4 mb-4">
              <label htmlFor="descricaoCasoClinico" className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Descrição do caso clínico:</label>
              <label htmlFor="dadosIniciais" className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Dados iniciais (Estado clinico):</label>
              <textarea id="dadosIniciais" rows={3} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Escreva aqui os dados iniciais do paciente"></textarea>

              <label htmlFor="dadosInternacao" className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Dados da internação (tratamentos):</label>
              <textarea id="dadosInternacao" rows={3} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Escreva aqui os dados da internação do paciente"></textarea>

              <label htmlFor="informacaoAlta" className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Informação da alta:</label>
              <textarea id="informacaoAlta" rows={3} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Escreva aqui as informações da alta do paciente"></textarea>
            </div>

                  <div className="mt-4 mb-4 space-y-4">
                    <div>
                    <label htmlFor="tipoOrientacao" className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Tipo da orientação fornecida:</label>
                    <input type="text" id="tipoOrientacao" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Ex: Alimentar, exercícios..." />
                    </div>

                    <div>
                    <label htmlFor="descricaoOrientacao" className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Descrição da orientação fornecida:</label>
                    <textarea id="descricaoOrientacao" rows={3} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Descreva aqui a orientação fornecida"></textarea>
                    </div>
                  </div>


          </>



            }/>

    );

}
