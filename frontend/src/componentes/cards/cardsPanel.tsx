import { UserPlus, NotepadText, ClipboardPlus, Stethoscope} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import BtnAcoes from "../buttons/btnAcoes";
import BtnList from "../buttons/btnLista";
import PacientesModal from "../modal/pacientesModal";
import AltaModal from "../modal/altaModal";
import { getPacientes } from "../../api/pacientesApi";
import { getAllAltas } from "../../api/altasApi";

export default function cardPanel() {
  const [isPacientesModalOpen, setIsPacientesModalOpen] = useState(false);
  const [isAltaModalOpen, setIsAltaModalOpen] = useState(false);
  const [recentActivities, setRecentActivities] = useState<Array<any>>([]);

  const openPacientesModal = () => setIsPacientesModalOpen(true);
  const closePacientesModal = () => setIsPacientesModalOpen(false);

  const openAltaModal = () => setIsAltaModalOpen(true);
  const closeAltaModal = () => setIsAltaModalOpen(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const altas = await getAllAltas();
        const pacientes = await getPacientes();
        const activities: Array<any> = [];
        // map recent altas
        (altas || []).slice(0, 5).forEach((a: any) => {
          activities.push({
            title: `Alta: ${a.paciente_nome ?? a.paciente ?? 'Paciente'}`,
            desc: `Médico: ${a.medico_nome ?? a.medico ?? '—'}`,
            icon: <Stethoscope size={20} color="#00cc66" />,
            time: a.data_alta ? String(a.data_alta).slice(0,10) : '',
            bg: 'bg-green-50'
          });
        });
        // map recent pacientes
        (pacientes || []).slice(0, 5).forEach((p: any) => {
          activities.push({
            title: `Paciente: ${p.nome_paciente ?? '—'}`,
            desc: `Setor: ${p.setor ?? '—'}`,
            icon: <UserPlus size={20} color="#982bffff" />,
            time: p.data_internacao ? String(p.data_internacao).slice(0,10) : '',
            bg: 'bg-blue-50'
          });
        });
        if (mounted) setRecentActivities(activities.slice(0,5));
      } catch (err) {
        console.error('Erro ao carregar atividades', err);
      }
    })();
    return () => { mounted = false };
  }, []);

  return (
    
     <div className="mt-6 flex gap-x-4 justify-center">

      {/* Card Atividades Recentes */}

      <div className="flex-1 h-100 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
      <h1 className="text-sm font-bold text-gray-900 dark:text-white mt-2 text-center">Atividades Recentes</h1>
      <div className="text-sm font-bold text-gray-900 dark:text-white mt-2 text-center">
        <div className="p-7 md:p-6 flex flex-col gap-4">
        {
          recentActivities.length === 0 ? (
            <div className="text-sm text-gray-500">Sem atividades recentes</div>
          ) : (
            recentActivities.map((act, idx) => (
              <BtnList key={idx} AtividadeTitulo={act.title} AtividadeDesc={act.desc} icon={act.icon} Horario={act.time} FundoList={act.bg} />
            ))
          )
        }

        </div>
      </div>
      </div>



      <div className="flex-1 h-100 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-800 items-center">

        {/* Card Ações Rapidas */}

        <h1 className="text-sm font-bold text-gray-900 dark:text-white mt-2">Ações Rápidas</h1>
        <div className="p-7 md:p-12 w-full">
          <div className="grid grid-cols-2 gap-4 w-full">

            <BtnAcoes texto="Novo Paciente" icone={<UserPlus size={20} color="#0099ff" />} fundoBG="bg-blue-50" onClick={openPacientesModal} />
            <BtnAcoes texto="Nova Alta" icone={<Stethoscope size={20} color="#0099ff" />} fundoBG="bg-green-50" onClick={openAltaModal} />
            <BtnAcoes texto="Gerenciar Altas" icone={<NotepadText size={20} color="#0099ff" />} fundoBG="bg-yellow-50" onClick={() => navigate("/altas")} />
            <BtnAcoes texto="Gerenciar Pacientes" icone={<ClipboardPlus size={20} color="#0099ff" />} fundoBG="bg-purple-50" onClick={() => navigate("/cadastro-paciente")} />

            <PacientesModal isOpen={isPacientesModalOpen} onClose={closePacientesModal} />
            <AltaModal isOpen={isAltaModalOpen} onClose={closeAltaModal} onClick={() => { /* placeholder save handler */ closeAltaModal(); }} TituloModal="Cadastro de Altas" BtnText="Salvar" />
          </div>
        </div>
      </div>
    </div>


    

  );
}
