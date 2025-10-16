import ModalTemplate from "../modalTemplate";
import MedicoPacienteSection from "../../forms/blocks/MedicoPacienteSection";
import { User } from "lucide-react";

type ModalPTAPsicologiaProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalPTAPsicologia({ isOpen, onClose }: ModalPTAPsicologiaProps) {
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
          </div>


                 <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
                <div className="mb-8">
                <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
                  <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">Indicadores de necessidade de suporte psicológico</label>
                </div>
                <div className="block mb-2 text-base text-gray-900 dark:text-white">
                  <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Ansiedade</span></label>
                  <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Tristeza</span></label>
                  <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Tentativa de suicídio</span></label>
                  <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Ideação suicida</span></label>
                  <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Transtorno psiquiátrico com patologia confirmada</span></label>
                  <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Luto patológico</span></label>
                  <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Medo/Angústia referente ao processo de adoecimento e hospitalização</span></label>
                  <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Internações frequentes</span></label>
                  <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Outros</span></label>
                </div>
                </div>
                </div>



            <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
                <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
                  <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">Ações desenvolvidas</label>
                </div>
                <div className="block mb-2 text-base text-gray-900 dark:text-white">
                  <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Atendimento com o paciente</span></label>
                  <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Atendimento com familiares</span></label>
                  <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Atendimento com equipe</span></label>
                  <label className="flex items-center"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Encaminhamento para rede de psicologia do município de Lucélia</span></label>
                </div>
                </div>

                <div className="mt-4 mb-4">
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">DADOS INICIAIS (BREVE CLÍNICO INICIAL)</label>
                <textarea rows={3} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Ex: Paciente apresentando sinais de ansiedade e dificuldades de adaptação ao ambiente hospitalar."></textarea>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">DADOS DA INTERNAÇÃO (TRATAMENTO PSICOLÓGICO)</label>
                <textarea rows={3} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Ex: Realizadas sessões de psicoterapia focadas no manejo da ansiedade e no fortalecimento dos recursos internos do paciente."></textarea>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">INFORMAÇÕES DE ALTA (EVOLUÇÃO DO PACIENTE)</label>
                <textarea rows={3} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Ex: Paciente demonstra melhora significativa no humor e na capacidade de lidar com as dificuldades."></textarea>
                </div>

                <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
                <div className="mt-4 mb-4">
                 <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
                  <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">Prognóstico de Alta qualificada</label>
                </div>
                <div className="block mb-2 text-base text-gray-900 dark:text-white">
                  <label className="flex items-center mb-1"><input type="radio" name="prognostico" value="favoravel" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Favorável</span></label>
                  <label className="flex items-center mb-1"><input type="radio" name="prognostico" value="reservado" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Reservado</span></label>
                  <label className="flex items-center"><input type="radio" name="prognostico" value="desfavoravel" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Desfavorável</span></label>
                </div>
                </div>
                </div>

                <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
                <div className="mt-4 mb-4">
                      <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
                  <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">Tipo de orientação fornecida : Verbal</label>
                </div>
                <div className="block mb-2 text-base text-gray-900 dark:text-white">
                  <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Paciente</span></label>
                  <label className="flex items-center mb-1"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Familiar</span></label>
                  <label className="flex items-center"><input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Cuidador</span></label>
                </div>
                </div>
              </div>
           
                     <div>
                    <label htmlFor="descricaoOrientacao" className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Encaminhamentos pós-alta</label>
                    <textarea id="descricaoOrientacao" rows={3} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Agendar consulta com psiquiatra, acompanhamento psicológico semanal."></textarea>
                    </div>
                     

        </>
      }
    />

    
  );
}

