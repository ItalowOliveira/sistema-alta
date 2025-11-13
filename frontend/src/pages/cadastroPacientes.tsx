import { useState } from "react";
import BtnSearch from "../componentes/buttons/btnSearch";
import TabelaGenerica from "../componentes/tables/tabelaGenerica";
import PacientesModal from "../componentes/modal/pacientesModal";
import { User } from "lucide-react";
import { getPacientes } from "../api/pacientesApi";

export default function CadastroPacientes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const fetchPacientes = async () => {
    const pacientes = await getPacientes();
    return pacientes.map(p => ({
      id: p.id,
      nome: p.nome_paciente,
      data_nascimento: p.data_nascimento ?? '',
      portador: p.portador_de ?? '',
      setor: p.setor ?? '',
      leito: p.leito ?? '',
      cidade: p.cidade ?? '',
    }));
  };

  const colunasTabela = [
    { header: "Nome", accessorKey: "nome" },
  { header: "Data Nasc.", accessorKey: "data_nascimento" },
    { header: "Portador de", accessorKey: "portador" },
    { header: "Setor", accessorKey: "setor" },
    { header: "Leito", accessorKey: "leito" },
    { header: "Cidade", accessorKey: "cidade" },
  ];

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
        columns={colunasTabela}
          fetchData={fetchPacientes}
          pageSize={10}
         renderActions={(_index, row) => (
                   <div className="inline-flex gap-2">
            <button
              onClick={() => alert(`Editar alta: ${row.paciente}`)}
              className="text-xs px-1 py-1 rounded-lg border border-transparent bg-[#232c46] text-[#0099ff] hover:bg-[#1f263b] focus:outline-hidden focus:bg-[#1f263b] disabled:opacity-50 disabled:pointer-events-none"
            >
              Editar
            </button>
          </div>

        )}
      />

      <PacientesModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}