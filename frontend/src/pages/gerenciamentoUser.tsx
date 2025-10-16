import { useState } from "react";
import { ShieldUser } from "lucide-react";
import { getUsuarios } from "../api/usuarioApi";
import BtnSearch from "../componentes/buttons/btnSearch";
import TabelaGenerica from "../componentes/tables/tabelaGenerica";
import UsuariosModal from "../componentes/modal/userModal";

export default function CadastroUsuarios() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const fetchUsuarios = async () => {
    const usuarios = await getUsuarios();
    return usuarios.map(u => ({
      id: u.id,
      nome: u.nome,
      email: u.email,
      tipoUsuario: u.tipo_usuario,
    }));
  };

  const colunasTabela = [
    { header: "ID", accessorKey: "id" },
    { header: "Nome", accessorKey: "nome" },
    { header: "E-mail", accessorKey: "email" },
    { header: "Tipo de Usuário", accessorKey: "tipoUsuario" },
  ];

  return (
    <div className="w-full"> 
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
        title="Usuários"
        description="Lista de usuários cadastrados"
        buttonText="Novo Usuário"
        onButtonClick={handleOpenModal}
        columns={colunasTabela}
        fetchData={fetchUsuarios}
        onEdit={(index, row) => alert(`Editar usuário: ${row.nome}`)}
      />

      <UsuariosModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}