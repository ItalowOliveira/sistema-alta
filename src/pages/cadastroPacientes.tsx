import { useState } from "react";
import BtnSearch from "../componentes/buttons/btnSearch";
import TabelaGenerica from "../componentes/tables/tabelaGenerica";
import PacientesModal from "../componentes/modal/pacientesModal";
import { User } from "lucide-react";

export default function CadastroPacientes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      
      
      <div className="flex items-start mb-4 gap-3">
        <div className="rounded-full bg-blue-100 p-2">
          <User className="mr-0 h-10 w-10 text-blue-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Cadastro de Pacientes
          </h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
        Gerenciamento de Pacientes
          </span>
        </div>
      </div>
     

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