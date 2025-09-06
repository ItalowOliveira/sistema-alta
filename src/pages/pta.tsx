import { useState } from "react";
import PtsEspec from "../componentes/modal/especModal"
import TabelaGenerica from "../componentes/tables/tabelaGenerica";

export default function ModalPtaTemplate() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Painel</h1>
      <h1 className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Cadastro de Plano Terapêutico Altas (PTA)
      </h1>

      <TabelaGenerica
        title="PTAs"
        description="Lista de Planos Terapêuticos Altas (PTA) cadastrados"
        buttonText="Adicionar PTA"
        onButtonClick={() => setIsOpen(true)}
        headerColumns={["Paciente", "Idade", "Sexo", "Ações"]}
        rowData={[
          { Paciente: "João", Idade: 30, Sexo: "Masculino" },
          { Paciente: "Maria", Idade: 25, Sexo: "Feminino" },
        ]}
        onEdit={(index) => console.log("Editar PTA", index)}
      />
      <PtsEspec isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}