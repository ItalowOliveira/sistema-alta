import { useState } from "react";
import PtsModal from "../componentes/modal/ptsModal";
import BtnSearch from "../componentes/buttons/btnSearch";
import TabelaGenerica from "../componentes/tables/tabelaGenerica";

export default function ModalPtsTemplate() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Painel</h1>
      <h1 className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Cadastro de Projeto Terapêutico Singular
      </h1>

      <PtsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      
      <BtnSearch text="Buscar PTS" />
      <TabelaGenerica
        title="Projetos Terapêuticos Singulares"
        description="Lista de PTS cadastrados"
        buttonText="Adicionar PTS"
        onButtonClick={() => setIsOpen(true)} B
        headerColumns={["Nome do Paciente", "Data de Criação", "Status", "Ações"]}
        rowData={[
          { Nome: "João", Idade: 30, Sexo: "Masculino" },
          { Nome: "Maria", Idade: 25, Sexo: "Feminino" },
        ]}
        onEdit={(index) => console.log("Editar PTS", index)}
      />

    </>
  );
}