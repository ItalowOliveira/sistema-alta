import { UserPlus, CalendarPlus, NotepadText, ClipboardPlus, Stethoscope} from "lucide-react";
import { useState } from "react";
import BtnAcoes from "../buttons/btnAcoes";
import BtnList from "../buttons/btnLista";
import PacientesModal from "../modal/pacientesModal";
import AltaModal from "../modal/altaModal";

export default function cardPanel() {
  const [isPacientesModalOpen, setIsPacientesModalOpen] = useState(false);
  const [isAltaModalOpen, setIsAltaModalOpen] = useState(false);

  const openPacientesModal = () => setIsPacientesModalOpen(true);
  const closePacientesModal = () => setIsPacientesModalOpen(false);

  const openAltaModal = () => setIsAltaModalOpen(true);
  const closeAltaModal = () => setIsAltaModalOpen(false);

  return (
    
     <div className="mt-6 flex gap-x-4 justify-center">

      {/* Card Atividades Recentes */}

      <div className="flex-1 h-100 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
      <h1 className="text-sm font-bold text-gray-900 dark:text-white mt-2 text-center">Atividades Recentes</h1>
      <div className="text-sm font-bold text-gray-900 dark:text-white mt-2 text-center">
      <div className="p-7 md:p-6 flex flex-col gap-4">
    
        <BtnList AtividadeTitulo="Consulta com João" AtividadeDesc="Realizada por Dr. Pedro" icon={<CalendarPlus size={20} color="#00cc66" />} Horario="14:32" FundoList="bg-green-50"/>
        <BtnList AtividadeTitulo="Novo Paciente: Maria" AtividadeDesc="Cadastrado por Ana" icon={<UserPlus size={20} color="#982bffff" />} Horario="13:15" FundoList="bg-blue-50"/>
        <BtnList AtividadeTitulo="Anamnese Atualizada" AtividadeDesc="Atualizada por Dr. Carlos" icon={<NotepadText size={20} color="#3812c2ff" />} Horario="11:47" FundoList="bg-yellow-50"/>
        <BtnList AtividadeTitulo="Prontuário Criado" AtividadeDesc="Criado por Dr. Lucas" icon={<ClipboardPlus size={20} color="#ff5e00ff" />} Horario="09:30" FundoList="bg-purple-50"/> 

        </div>
      </div>
      </div>



      <div className="flex-1 h-100 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-800 items-center">

        {/* Card Ações Rapidas */}

        <h1 className="text-sm font-bold text-gray-900 dark:text-white mt-2">Ações Rápidas</h1>
        <div className="p-7 md:p-12 w-full">
          <div className="grid grid-cols-2 gap-4 w-full">

            <BtnAcoes texto="Novo Paciente" icone={<UserPlus size={20} color="#0099ff" />} fundoBG="bg-blue-50" onClick={openPacientesModal} />
            <BtnAcoes texto="Nova Alta" icone={<Stethoscope size={20} color="#0099ff" />} fundoBG="bg-green-50" onClick={openAltaModal} />
            <BtnAcoes texto="Novo PTS" icone={<NotepadText size={20} color="#0099ff" />} fundoBG="bg-yellow-50"/>
            <BtnAcoes texto="Novo PTA" icone={<ClipboardPlus size={20} color="#0099ff" />} fundoBG="bg-purple-50"/>

            <PacientesModal isOpen={isPacientesModalOpen} onClose={closePacientesModal} />
            <AltaModal isOpen={isAltaModalOpen} onClose={closeAltaModal} onClick={() => { /* placeholder save handler */ closeAltaModal(); }} TituloModal="Cadastro de Altas" BtnText="Salvar" />
          </div>
        </div>
      </div>
    </div>


    

  );
}
