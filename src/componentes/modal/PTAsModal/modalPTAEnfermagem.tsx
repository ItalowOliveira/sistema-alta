import { User } from "lucide-react";
import ModalTemplate from "../ModalTemplate";
import MedicoPacienteSection from "../../forms/blocks/MedicoPacienteSection";

type ModalPTAEnfermagemProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalPTAEnfermagem({ isOpen, onClose }: ModalPTAEnfermagemProps) {
  if (!isOpen) return null;
  return (
    <ModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      TituloModal="Cadastro de Plano Terapêutico de Alta"
      BtnText="Salvar PTA"
      Conteudo={
        <>
          <MedicoPacienteSection />

            <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <User className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Enfermagem</h3>
            </div>
            
            <div className="mb-4">
              <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Nivel de Consciencia/Comportamento (Glasgow)</label>
              <input
              type="number"
              placeholder="Nível de Glasgow"
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              />
            </div>

        <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Paciente terá alta fazendo uso ou necessidade de:</label>
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
            </div>
              <div className="block mb-2 text-base text-gray-900 dark:text-white">
                <label><input type="checkbox" className="dark:bg-gray-700 dark:border-gray-600" /> Cuidados com úlcera de pressão</label><br />
                <label><input type="checkbox" className="dark:bg-gray-700 dark:border-gray-600" /> Sonda vesical</label><br />
                <label><input type="checkbox" className="dark:bg-gray-700 dark:border-gray-600" /> Oxigenio</label><br />
                <label><input type="checkbox" className="dark:bg-gray-700 dark:border-gray-600" /> Curativo</label><br />
                <label><input type="checkbox" className="dark:bg-gray-700 dark:border-gray-600" /> Estomas</label><br />
                <label><input type="checkbox" className="dark:bg-gray-700 dark:border-gray-600" /> Traqueostomia</label><br />
                <label><input type="checkbox" className="dark:bg-gray-700 dark:border-gray-600" /> Aspiração (orotraqueal)</label><br />
                <label><input type="checkbox" className="dark:bg-gray-700 dark:border-gray-600" /> Outros</label>
              </div>
          </div>


           <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Paciente terá alta fazendo uso ou necessidade de:</label>
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
            </div>
        
          <div>
             <div className="block mb-2 text-base text-gray-900 dark:text-white">
            <label><input type="checkbox" /> Para curativos</label><br />
            <label><input type="checkbox" /> Cuidados com sondas/estomas</label><br />
            <label><input type="checkbox" /> Orientações da dieta assistida</label><br />
            <label><input type="checkbox" /> Prevenção e cuidados com ulcera de pressão</label><br />
            <label><input type="checkbox" /> Aspiração de vias aéreas e traqueostomias</label><br />
            <label><input type="checkbox" /> Cuidados com a pele e higienização corporal</label>
          </div>
        </div>
      </div>
          <div>

                 <div className="mt-4 mb-4">
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">História Pregressa</label>
                <textarea rows={4} placeholder="Descreva o histórico do paciente, como a lesão medular e outras condições pré-existentes." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
                </div>


          </div>
          </div>
        </>
      }
    />
  );
}

