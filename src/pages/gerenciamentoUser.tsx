import { useState } from "react";
import { User, ShieldUser } from "lucide-react";
import BtnSearch from "../componentes/buttons/btnSearch";
import TabelaGenerica from "../componentes/tables/tabelaGenerica";
import UsuariosModal from "../componentes/modal/userModal";

export default function CadastroUsuarios() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>

        <div className="flex items-start mb-4 gap-3">
        <div className="rounded-full bg-purple-100 p-2">
          <ShieldUser className="mr-0 h-10 w-10 text-purple-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Cadastro de Usuários
          </h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
        Gerenciamento de Usuários
          </span>
        </div>
      </div>

      <BtnSearch text="Buscar Usuarios" />
      <TabelaGenerica
      title="Usuarios"
      description="Lista de usuarios cadastrados"
      buttonText="Adicionar Usuario"
      onButtonClick={handleOpenModal}
      headerColumns={["Foto", "Nome", "Email", "Tipo", "Ações"]}
      rowData={[
      { Foto: <User size={24} />, Nome: "João", Email: "joao@example.com", Tipo: "Admin" },
      { Foto: <User size={24} />, Nome: "Maria", Email: "maria@example.com", Tipo: "Usuário" },
      { Foto: <User size={24} />, Nome: "José", Email: "jose@example.com", Tipo: "Usuário" }
      ]}

      onEdit={(index) => console.log("Editar usuario", index)}
      />

      <UsuariosModal isOpen={isModalOpen} onClose={handleCloseModal} />
    
      </div>
  );
}