import Cartoes from "../componentes/cards/cards";
import CardPanel from "../componentes/cards/cardsPanel";
import { User, Stethoscope, MessageCircleMore, Clipboard } from "lucide-react";
import { useEffect, useState } from "react";
import { getDashboardMetrics } from "../api/dashboardApi";

export default function Painel() {
  const [totalPacientes, setTotalPacientes] = useState<number | null>(null);
  const [totalMedicos, setTotalMedicos] = useState<number | null>(null);
  const [altasPending, setAltasPending] = useState<number | null>(null);
  const [altasTotal, setAltasTotal] = useState<number | null>(null);
  const [loadingTotal, setLoadingTotal] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingTotal(true);
  // fetch aggregated dashboard metrics scoped to session user
  const metrics = await getDashboardMetrics();
  if (!mounted) return;
  setTotalPacientes(metrics.pacientes ?? null);
  setTotalMedicos(metrics.medicos ?? null);
  setAltasPending(metrics.altas?.pending ?? null);
  setAltasTotal(metrics.altas?.total ?? null);
      } catch (err) {
        console.error('Erro ao buscar total de pacientes', err);
      } finally {
        if (mounted) setLoadingTotal(false);
      }
    })();
    return () => { mounted = false };
  }, []);
  return (
    <div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Painel</h1>
        <h1 className="text-sm text-gray-500 dark:text-gray-400 mb-4">Visão geral do sistema</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

          <Cartoes
            titulo="Total de Pacientes"
            valor={loadingTotal ? "..." : String(totalPacientes ?? 0)}
            porcentagem=""
            icone={<User size={20} color="#0066ffff" />}
            fundoIcone="bg-blue-100"
            corIcone="text-green-500"
            corPorcentagem="text-green-500"
            descricao="+5% desde a última semana"
          />

          <Cartoes
            titulo="Total de Profissionais"
            valor={loadingTotal ? "..." : String(totalMedicos ?? 0)}
            porcentagem=""
            icone={<Stethoscope size={20} color="#00af17ff" />}
            fundoIcone="bg-green-100"
            corIcone="text-green-500"
            corPorcentagem="text-green-500"
            descricao="+5% desde a última semana"
          />

          <Cartoes
            titulo="Altas Pendentes"
            valor={loadingTotal ? "..." : String(altasPending ?? 0)}
            porcentagem=""
            icone={<MessageCircleMore size={20} color="#ff5e00ff" />}
            fundoIcone="bg-orange-100"
            corIcone="text-green-500"
            corPorcentagem="text-green-500"
            descricao="Pendentes"
          />

          <Cartoes
            titulo="Altas Geradas"
            valor={loadingTotal ? "..." : String(altasTotal ?? 0)}
            porcentagem=""
            icone={<Clipboard size={20} color="#4c00ffff" />}
            fundoIcone="bg-purple-100"
            corIcone="text-green-500"
            corPorcentagem="text-green-500"
            descricao="Este mês"
          />
        </div>

        <CardPanel 

        />

      </div>

  );
}
