import { useState, useCallback, useEffect } from "react";
import { Stethoscope, Eye, CheckCircle, FilePlus, ClipboardPlus, FileSearch, ClipboardList } from "lucide-react";

import AltaModal from "../componentes/modal/altaModal";
import TabelaGenerica from "../componentes/tables/tabelaGenerica";
import PtsModal from "../componentes/modal/ptsModal";
import api from "../api/apiClient";
import EspecModal from "../componentes/modal/especModal";
import ModalPTANutricao from "../componentes/modal/PTAsModal/modalPTANutricao";
import ModalPTAEnfermagem from "../componentes/modal/PTAsModal/modalPTAEnfermagem";
import ModalPTAServicoSocial from "../componentes/modal/PTAsModal/modalPTAServicoSocial";
import ModalPTAPsicologia from "../componentes/modal/PTAsModal/modalPTAPsicologo";
import ModalPTAFisioterapia from "../componentes/modal/PTAsModal/modalPTAFisioterapia";
import BtnSearch from "../componentes/buttons/btnSearch";

import { meUsuario } from "../api/usuarioApi";
import { getAltasPaged } from "../api/altasApi";

export default function ModalPtaTemplate() {
  const [role, setRole] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [allowEditDateOnOpen, setAllowEditDateOnOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPtsOpen, setIsPtsOpen] = useState(false);
  const [ptsViewOnly, setPtsViewOnly] = useState(false);
  const [isPtaEditable, setIsPtaEditable] = useState(true);
  const [ptsInitialData, setPtsInitialData] = useState<any | null>(null);
  const [selectedAlta, setSelectedAlta] = useState<any | null>(null);
  const [isEspecOpen, setIsEspecOpen] = useState(false);
  const [isEnfermagemModalOpen, setIsEnfermagemModalOpen] = useState(false);
  const [isNutricaoModalOpen, setIsNutricaoModalOpen] = useState(false);
  const [isServicoSocialModalOpen, setIsServicoSocialModalOpen] = useState(false);
  const [isPsicologiaModalOpen, setIsPsicologiaModalOpen] = useState(false);
  const [isFisioterapiaModalOpen, setIsFisioterapiaModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const user = await meUsuario();
      if (mounted) setRole(user ? user.tipo_usuario : null);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleOpen = () => {
    setSelectedAlta(null);
    setPtsInitialData(null);
    setPtsViewOnly(false);
    setIsPtsOpen(false);
  setAllowEditDateOnOpen(false);
  setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
    setSelectedAlta(null);
  setAllowEditDateOnOpen(false);
  };
  const handleAfterCreate = useCallback(() => setReloadKey(k => k + 1), []);

  // server-side fetch: accepts page,pageSize and returns { rows, total }
  const fetchAltas = async (page?: number, pageSize?: number) => {
    const res = await getAltasPaged(page ?? 1, pageSize ?? 10, searchQuery ?? '');
    return {
      rows: (res.rows || []).map((a: any) => ({
        id: a.id ?? a.id_internacao ?? a.id_alta ?? null,
        paciente: a.paciente_nome ?? a.paciente ?? a.paciente_id ?? a.nome_paciente ?? null,
        paciente_id: a.paciente_id ?? a.id_paciente ?? a.paciente?.id ?? null,
        paciente_nome: a.paciente_nome ?? a.nome_paciente ?? null,
        medico: a.medico_nome ?? a.medico ?? null,
        medico_id: a.medico_id ?? a.id_medico_responsavel ?? a.medico_responsavel_id ?? a.medico?.id ?? null,
        setor: a.setor,
        leito: a.leito,
        data_internacao: a.data_internacao,
        data_alta: a.data_alta,
        status: a.status ?? "Pendente",
        tipo_documento: a.tipo_documento ?? a.tipo ?? null,
        documento_id: a.documento_id ?? a.documento ?? a.pt_id ?? null,
      })),
      total: res.total ?? 0,
    };
  };

  const colunas = [
    { header: "Paciente", accessorKey: "paciente" },
    { header: "Médico", accessorKey: "medico" },
    { header: "Setor", accessorKey: "setor" },
    { header: "Leito", accessorKey: "leito" },
    { header: "Data Internação", accessorKey: "data_internacao", dateFormat: "datetime" as "datetime" },
    { header: "Data Alta", accessorKey: "data_alta", dateFormat: "datetime" as "datetime" },
  { header: "Tipo de Documento", accessorKey: "tipo_documento" },
    { header: "Status", accessorKey: "status" },
  ];

  const renderActions = (_: number, row: any) => {
    const status = String(row.status ?? "").toLowerCase();
    const isFinalizado = status === "finalizado" || status === "finalizada";
    const roleStr = String(role);
    const ptsRoles = ["Enfermagem", "Nutricionista", "Nutrição", "Fisioterapia", "Admin"];
    // Adicionado "Fisioterapia" e "Fisioterapeuta" para liberar PTA para Fisioterapia
    const ptaRoles = ["Enfermagem", "Fisioterapista", "Fisioterapeuta", "Fisioterapia", "Nutrição", "Psicologia", "Assistente Social", "Admin"];

    const openPtaModalByType = (type: string) => {
      const t = String(type ?? "").toLowerCase(); 

      if (t.includes("enferm")) {
        setTimeout(() => setIsEnfermagemModalOpen(true), 0);
      } else if (t.includes("nutri")) { 
        setIsNutricaoModalOpen(true);
      } else if (t.includes("fisio")) { 
        setIsFisioterapiaModalOpen(true);
      } else if (t.includes("psico")) { 
        setIsPsicologiaModalOpen(true);
      } else if (t.includes("social") || t.includes("assistente") || t.includes("serviço")) {
        setIsServicoSocialModalOpen(true);
      } else {
        setIsEspecOpen(true);
      }
    };

    const handlePtsEditClick = () => {
      setSelectedAlta(row);
      setPtsViewOnly(false);
      setIsPtsOpen(true);
    };

    const handlePtaEditClick = () => {
      setSelectedAlta(row);
      setIsPtaEditable(true);
      openPtaModalByType(roleStr);
    };

    const handlePtsViewClick = async () => {
      try {
        setSelectedAlta(row);
        setPtsViewOnly(true);
        const docId = row.documento_id ?? row.id ?? null;
        if (docId) {
          const res = await api.get(`/pts/${docId}`);
          setPtsInitialData(res.data);
        } else {
          setPtsInitialData(null);
        }
        setIsPtsOpen(true);
      } catch (err) {
        console.error('Erro ao buscar PTS para visualização', err);
        setPtsInitialData(null);
        setIsPtsOpen(true);               
      }
    };

    const handlePtaViewClick = async () => {
      try {
        setSelectedAlta(row);
        setIsPtaEditable(false); 

        const docId = row.documento_id ?? row.id ?? null;
        const tipoDocumento = String(row.tipo_documento ?? "").toLowerCase();

        if (docId && (tipoDocumento.includes("enferm") || tipoDocumento.includes("nutri") || tipoDocumento.includes("fisio") || tipoDocumento.includes("psico") || tipoDocumento.includes("social"))) {
          let endpoint = '';
          if (tipoDocumento.includes("enferm")) endpoint = `/ptas/enfermagem/${docId}`;
          else if (tipoDocumento.includes("nutri")) endpoint = `/ptas/nutricao/${docId}`;
          else if (tipoDocumento.includes("fisio")) endpoint = `/ptas/fisioterapia/${docId}`;
          else if (tipoDocumento.includes("psico")) endpoint = `/ptas/psicologia/${docId}`;
          else if (tipoDocumento.includes("social") || tipoDocumento.includes("serviço") || tipoDocumento.includes("assistente")) endpoint = `/ptas/servicosocial/${docId}`;

          try {
            const res = await api.get(endpoint);
            const fetched = res.data || {};
            const merged = { ...row };
            Object.keys(fetched).forEach((k) => {
              const v = (fetched as any)[k];
              if (v !== null && v !== undefined) merged[k] = v;
            });
            setSelectedAlta(merged);
          } catch (fetchErr) {
            console.error(`Erro ao buscar PTA ${tipoDocumento} para visualização`, fetchErr);
            setSelectedAlta(row);
          }
        }

        openPtaModalByType(tipoDocumento);

      } catch (err) {
        console.error('Erro ao abrir PTA visualização', err);
        openPtaModalByType('default');
      }
    };

  const tipoDocumento = String(row.tipo_documento ?? "").toLowerCase();
  const isPtsType = tipoDocumento.toUpperCase() === "PTS";
  const isAltaType = tipoDocumento === 'alta';


    const canEditPts = !isFinalizado && ptsRoles.includes(roleStr);
    const canEditPta = !isFinalizado && ptaRoles.includes(roleStr);

    const canViewPts = isFinalizado && isPtsType;
    const canViewPta = isFinalizado && !isPtsType;

 return (
      <div className="flex gap-4"> {/* Container principal com espaço MAIOR */}
    
        {/* Grupo 1: Ações Principais */}
        <div className="inline-flex gap-2"> {/* Container aninhado com espaço MENOR */}
          {!isFinalizado ? (
            <>
          {/*    <button
                onClick={() => alert(`Editar alta: ${row.paciente}`)}
                className="text-xs px-1 py-1 rounded-lg border border-transparent bg-[#232c46] text-[#0099ff] hover:bg-[#1f263b] focus:outline-hidden focus:bg-[#1f263b] flex items-center gap-2"
              >
                <Edit size={14} />
                <span>Editar</span>
              </button>*/}
              <button
                onClick={async () => {
                  setSelectedAlta(row);
                  setAllowEditDateOnOpen(true);
                  setIsOpen(true);
                }}
                className="text-xs px-1 py-1 rounded-lg border border-transparent bg-[#004d40] text-[#00ffc8] hover:bg-[#1f263b] focus:outline-hidden focus:bg-[#1f263b] flex items-center gap-2"
              >
                <CheckCircle size={14} />
                <span>Finalizar</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setSelectedAlta(row);
                setIsOpen(true);
              }}
              className="text-xs px-1 py-1 rounded-lg border border-transparent bg-[#1976d2] text-white hover:bg-[#1565c0] focus:outline-hidden flex items-center gap-2"
            >
              <Eye size={14} />
              <span>Visualizar</span>
            </button>
          )}
        </div>

        {/* Grupo 2: Ações de Documentos */}
        <div className="inline-flex gap-2">
          {/* === BOTÃO DE DOCUMENTO PTS (Consolidado) === */}
          { !isAltaType && (canEditPts || canViewPts) && (
            <button
              onClick={isFinalizado ? handlePtsViewClick : handlePtsEditClick}
              className="text-xs px-1 py-1 rounded-lg border border-transparent bg-[#ffd530] text-[#1f2937] hover:bg-[#ffc04d] focus:outline-hidden focus:bg-[#ffc04d] flex items-center gap-2"
            >
              {isFinalizado ? <><ClipboardList size={14} /><span>PTS</span></> : <><ClipboardPlus size={14} /><span>PTS</span></>}
            </button>
          )}
          
          {/* === BOTÃO DE DOCUMENTO PTA (Consolidado) === */}
          { !isAltaType && (canEditPta || canViewPta) && (
            <button
              onClick={isFinalizado ? handlePtaViewClick : handlePtaEditClick}
              className="text-xs px-1 py-1 rounded-lg border border-transparent bg-[#880e4f] text-[#ff80ab] hover:bg-[#1f263b] focus:outline-hidden focus:bg-[#1f263b] flex items-center gap-2"
            >
              {isFinalizado ? <><FileSearch size={14} /><span>PTA</span></> : <><FilePlus size={14} /><span>PTA</span></>}
            </button>
          )}
        </div>
        
      </div>
    );
  };

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

  <BtnSearch text="Buscar Alta" onSearch={(q) => { setSearchQuery(q); setReloadKey(k => k + 1); }} />

      <TabelaGenerica
        title="Altas"
        description="Lista de altas cadastradas"
        buttonText="Adicionar Alta"
        onButtonClick={handleOpen}
        columns={colunas}
        fetchData={fetchAltas}
        pageSize={10}
        refreshSignal={reloadKey}
        renderActions={renderActions}
      />

      {/* ... (Modais PtsModal e EspecModal) ... */}
  <PtsModal isOpen={isPtsOpen} onClose={() => setIsPtsOpen(false)} selectedAlta={selectedAlta} initialData={ptsInitialData} viewOnly={ptsViewOnly} onSaved={handleAfterCreate} />
      <EspecModal isOpen={isEspecOpen} onClose={() => setIsEspecOpen(false)} />


      {/* --- MUDANÇA PRINCIPAL 2: Passar a prop "isEditable" para TODOS os modais --- */}

      {isEnfermagemModalOpen && (
        <ModalPTAEnfermagem 
          isOpen={isEnfermagemModalOpen} 
          onClose={() => setIsEnfermagemModalOpen(false)} 
          selectedAlta={selectedAlta} 
          isEditable={isPtaEditable} // <-- ADICIONADO
          onSaved={handleAfterCreate}
        />
      )}
      {isNutricaoModalOpen && (
        <ModalPTANutricao 
          isOpen={isNutricaoModalOpen} 
          onClose={() => setIsNutricaoModalOpen(false)} 
          selectedAlta={selectedAlta} 
          isEditable={isPtaEditable}
          onSaved={handleAfterCreate}
        />
      )}
      {isServicoSocialModalOpen && (
        <ModalPTAServicoSocial 
          isOpen={isServicoSocialModalOpen} 
          onClose={() => setIsServicoSocialModalOpen(false)} 
          selectedAlta={selectedAlta} 
          isEditable={isPtaEditable}
          onSaved={handleAfterCreate}
        />
      )}
      {isPsicologiaModalOpen && (
        <ModalPTAPsicologia 
          isOpen={isPsicologiaModalOpen} 
          onClose={() => setIsPsicologiaModalOpen(false)} 
          selectedAlta={selectedAlta} 
          isEditable={isPtaEditable}
          onSaved={handleAfterCreate}
        />
      )}
      {isFisioterapiaModalOpen && (
        <ModalPTAFisioterapia 
          isOpen={isFisioterapiaModalOpen} 
          onClose={() => setIsFisioterapiaModalOpen(false)} 
          selectedAlta={selectedAlta} 
          isEditable={isPtaEditable}
          onSaved={handleAfterCreate}
        />
      )}

      {/* ... (Resto do seu JSX: Modal de Alta) ... */}
      <AltaModal
        isOpen={isOpen}
        onClose={handleClose}
        onClick={handleAfterCreate}
        TituloModal={String(selectedAlta ? 'Visualizar Alta' : 'Cadastro de Alta')}
        BtnText={selectedAlta ? (allowEditDateOnOpen ? 'Finalizar' : 'Fechar') : 'Salvar Alta'}
        selectedAlta={selectedAlta}
        viewOnly={Boolean(selectedAlta)}
        allowEditDateInView={allowEditDateOnOpen}
      />
    </>
  );
}