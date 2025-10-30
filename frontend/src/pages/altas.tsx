import { useState, useCallback } from "react";
import AltaModal from "../componentes/modal/altaModal";
import TabelaGenerica from "../componentes/tables/tabelaGenerica";
import BtnSearch from "../componentes/buttons/btnSearch";
import { Stethoscope } from "lucide-react";
import { getAllAltas } from "../api/altasApi";

export default function ModalPtaTemplate() {
  const [isOpen, setIsOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const fetchAltas = async () => {
    const altas = await getAllAltas();
    return altas.map((a: any) => ({
      id: a.id,
      paciente: a.paciente_nome || a.paciente_id,
      medico: a.medico_nome || a.medico_responsavel_id,
      setor: a.setor,
      leito: a.leito,
      data_internacao: a.data_internacao,
      data_alta: a.data_alta,
    }));
  };

  const colunas = [
    { header: "Paciente", accessorKey: "paciente" },
    { header: "Médico", accessorKey: "medico" },
    { header: "Setor", accessorKey: "setor" },
    { header: "Leito", accessorKey: "leito" },
    { header: "Data Internação", accessorKey: "data_internacao" },
    { header: "Data Alta", accessorKey: "data_alta" },
  ];

  const handleAfterCreate = useCallback(() => {
    // trigger reload in TabelaGenerica by changing key
    setReloadKey(k => k + 1);
  }, []);

  return (
    <>
      <div className="flex items-start mb-4 gap-3">
        <div className="rounded-full bg-green-100 p-2">
          <Stethoscope className="mr-0 h-10 w-10 text-green-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gerenciamento de Altas</h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">Gerenciamento de Altas</span>
        </div>
      </div>

      <BtnSearch text="Buscar Alta" />

      <TabelaGenerica
        key={reloadKey}
        title="Altas"
        description="Lista de altas cadastradas"
        buttonText="Adicionar Alta"
        onButtonClick={handleOpen}
        columns={colunas}
        fetchData={fetchAltas}
        onEdit={(index, row) => alert(`Editar alta: ${row.paciente}`)}
      />
    
      <AltaModal
        isOpen={isOpen}
        onClose={handleClose}
        onClick={handleAfterCreate}
        TituloModal="Cadastro de Alta"
        BtnText="Salvar Alta"
      />
    </>
  );
}