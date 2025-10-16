import ModalTemplate from "../modalTemplate";
import MedicoPacienteSection from "../../forms/blocks/MedicoPacienteSection";
import { User } from "lucide-react";

type ModalPTAServicoSocialProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalPTAServicoSocial({ isOpen, onClose }: ModalPTAServicoSocialProps) {
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
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Serviço Social</h3>
            </div>

                <div className="flex flex-col gap-4">
                    <div>
                  <label htmlFor="composicaoFamiliar" className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">
                    Composição Familiar/Rede de Apoio:
                  </label>
                  <textarea
                    id="composicaoFamiliar"
                    rows={3}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    placeholder="Ex: Esposo, filhos, amigos próximos..."
                  />
                    </div>
                    

                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Situação Socioeconômica:</label>
                    <select className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                      <option selected>Selecione uma opção</option>
                      <option value="empregado">Empregado</option>
                      <option value="desempregado">Desempregado</option>
                    </select>
                  </div>
                
                

                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Condições de Moradia:</label>
                    <select className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                      <option selected>Selecione uma opção</option>
                      <option value="propria">Própria</option>
                      <option value="alugada">Alugada</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Demandas identificadas durante a internação:</label>
                    <select className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                      <option selected>Selecione uma opção</option>
                      <option value="acompanhamento">Acompanhamento médico</option>
                      <option value="psicologico">Suporte psicológico</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Providências e Encaminhamentos:</label>
                    <select className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                      <option selected>Selecione uma opção</option>
                      <option value="agendamento">Agendamento de consulta</option>
                      <option value="visita">Visita domiciliar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Recursos necessários para a alta:</label>
                    <select className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                      <option selected>Selecione uma opção</option>
                      <option value="cesta">Cesta básica</option>
                      <option value="transporte">Transporte</option>
                    </select>
                  </div>

                    <div>
                  <label htmlFor="parecerSocial" className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">
                    Parecer Social e Orientações para a alta:
                  </label>
                  <textarea 
                    id="parecerSocial" 
                    rows={3} 
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    placeholder="Ex: Paciente necessita de acompanhamento..."
                  />
                    </div>
                  </div>
                  </div>






            </>
            }/>

    );

}
