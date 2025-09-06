import { useState } from "react";
import BtnSearch from "../componentes/buttons/btnSearch";
import TabelaGenerica from "../componentes/tables/tabelaGenerica";
import UsuariosModal from "../componentes/modal/userModal";

export default function CadastroUsuarios() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Painel</h1>
        <h1 className="text-sm text-gray-500 dark:text-gray-400 mb-4">Visão geral do sistema</h1>


        <BtnSearch text="Buscar Usuarios" />
        <TabelaGenerica
          title="Usuarios"
          description="Lista de usuarios cadastrados"
          buttonText="Adicionar Usuario"
          onButtonClick={handleOpenModal}
          headerColumns={["Nome", "Email", "Tipo", "Ações"]}
          rowData={[
            { Nome: "João", Email: "joao@example.com", Tipo: "Admin" },
            { Nome: "Maria", Email: "maria@example.com", Tipo: "Usuário" },
            { Nome: "José", Email: "jose@example.com", Tipo: "Usuário" }
          ]}

          onEdit={(index) => console.log("Editar usuario", index)}
        />

        <UsuariosModal isOpen={isModalOpen} onClose={handleCloseModal} />
    
      </div>
  );
}