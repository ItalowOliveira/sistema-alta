import { useState } from "react";
import PtsModal from "../componentes/modal/ptsModal";
import BtnSearch from "../componentes/buttons/btnSearch";
import TabelaGenerica from "../componentes/tables/tabelaGenerica";
import { Stethoscope } from "lucide-react";

export default function ModalPtsTemplate() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-start mb-4 gap-3">
        <div className="rounded-full bg-orange-100 p-2">
          <Stethoscope className="mr-0 h-10 w-10 text-orange-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Cadastro de Projetos Terapêuticos Singulares
          </h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
        Gerenciamento de PTS
          </span>
        </div>
      </div>

      <PtsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      
      <BtnSearch text="Buscar PTS" />
      <TabelaGenerica
      title="Projetos Terapêuticos Singulares"
      description="Lista de PTS cadastrados"
      buttonText="Adicionar PTS"
      onButtonClick={() => setIsOpen(true)} 
      headerColumns={["Paciente", "Médico Responsável", "Tipo", "Data de Criação", "Status", "Ações"]}
      rowData={[
        { Paciente: "João", Medico: "Dr. Silva", Tipo: "Individual", Data: "2024-01-20", Status: "Ativo" },
        { Paciente: "Maria", Medico: "Dra. Souza", Tipo: "Grupo", Data: "2024-02-15", Status: "Pendente" },
      ]}
      onEdit={(index) => console.log("Editar PTS", index)}
      />

    </>
  );
}