import { useState } from "react";
import BtnSearch from "../componentes/buttons/btnSearch";
import TabelaGenerica from "../componentes/tables/tabelaGenerica";
import PacientesModal from "../componentes/modal/pacientesModal";

export default function CadastroPacientes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Painel</h1>
      <h1 className="text-sm text-gray-500 dark:text-gray-400 mb-4">Cadastro de Pacientes</h1>

      <BtnSearch text="Buscar Pacientes" />
      <TabelaGenerica
        title="Pacientes"
        description="Lista de pacientes cadastrados"
        buttonText="Adicionar Paciente"
        onButtonClick={handleOpenModal}
        headerColumns={["Nome", "Idade", "Sexo", "Ações"]}
        rowData={[
          { Nome: "João", Idade: 30, Sexo: "Masculino" },
          { Nome: "Maria", Idade: 25, Sexo: "Feminino" },
        ]}
        onEdit={(index) => console.log("Editar paciente", index)}
      />

      <PacientesModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
 
}