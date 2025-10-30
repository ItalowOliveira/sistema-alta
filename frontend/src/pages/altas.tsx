import { useState } from "react";
import AltaModal from "../componentes/modal/altaModal";
import TabelaGenerica from "../componentes/tables/tabelaGenerica";
import BtnSearch from "../componentes/buttons/btnSearch";
import { Stethoscope } from "lucide-react";

export default function ModalPtaTemplate() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>

        <div className="flex items-start mb-4 gap-3">
        <div className="rounded-full bg-green-100 p-2">
          <Stethoscope className="mr-0 h-10 w-10 text-green-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Gerenciamento de Altas
          </h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
        Gerenciamento de Altas
          </span>
        </div>
      </div>
     


      <BtnSearch text="Buscar Alta" />
      <TabelaGenerica
      title="Altas"
      description="Lista de Altas cadastrados"
      buttonText="Adicionar Alta"
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
      <AltaModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onClick={() => console.log("Clique no botão")}
        TituloModal="Título do Modal"
        BtnText="Texto do Botão"
        Conteudo={
          <>
            <p>Conteúdo do Modal</p>
          </>
        }
      />
    </>
  );
}