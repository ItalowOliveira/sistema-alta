import { useState } from "react";
import PtsEspec from "../componentes/modal/especModal"
import TabelaGenerica from "../componentes/tables/tabelaGenerica";
import BtnSearch from "../componentes/buttons/btnSearch";
import { Bandage } from "lucide-react";

export default function ModalPtaTemplate() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>

        <div className="flex items-start mb-4 gap-3">
        <div className="rounded-full bg-green-100 p-2">
          <Bandage className="mr-0 h-10 w-10 text-green-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Cadastro de Plano Terapêutico de Altas
          </h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
        Gerenciamento de PTA's
          </span>
        </div>
      </div>
     


      <BtnSearch text="Buscar PTA" />
      <TabelaGenerica
      title="Plano Terapêutico Altas"
      description="Lista de PTA's cadastrados"
      buttonText="Adicionar PTA"
      onButtonClick={() => setIsOpen(true)}
      headerColumns={[
        "Nome do Plano",
        "Paciente",
        "Médico Responsável",
        "Data de Criação",
        "Status",
        "Ações",
      ]}
      rowData={[
        {
        "Nome do Plano": "Plano A",
        Paciente: "João Silva",
        "Médico Responsável": "Dra. Ana Paula",
        "Data de Criação": "01/01/2024",
        Status: "Ativo",
        },
        {
        "Nome do Plano": "Plano B",
        Paciente: "Maria Oliveira",
        "Médico Responsável": "Dr. Carlos Alberto",
        "Data de Criação": "15/01/2024",
        Status: "Inativo",
        },
      ]}
      onEdit={(index) => console.log("Editar PTA", index)}
      />
      <PtsEspec isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}