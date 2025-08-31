import Cartoes from "../componentes/cards/cards";
import CardPanel from "../componentes/cards/cardsPanel";
import { User, CalendarCheck, MessageCircleMore, Clipboard } from "lucide-react";

export default function Painel() {
  return (
    <div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Painel</h1>
        <h1 className="text-sm text-gray-500 dark:text-gray-400 mb-4">Visão geral do sistema</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

          <Cartoes
            titulo="Total de Pacientes"
            valor="247"
            porcentagem=""
            icone={<User size={20} color="#0066ffff" />}
            fundoIcone="bg-blue-100"
            corIcone="text-green-500"
            corPorcentagem="text-green-500"
            descricao="+5% desde a última semana"
          />

          <Cartoes
            titulo="Consultas Hoje"
            valor="12"
            porcentagem=""
            icone={<CalendarCheck size={20} color="#00af17ff" />}
            fundoIcone="bg-green-100"
            corIcone="text-green-500"
            corPorcentagem="text-green-500"
            descricao="Hoje"
          />

          <Cartoes
            titulo="Altas Pendentes"
            valor="8"
            porcentagem=""
            icone={<MessageCircleMore size={20} color="#ff5e00ff" />}
            fundoIcone="bg-orange-100"
            corIcone="text-green-500"
            corPorcentagem="text-green-500"
            descricao="Pendentes"
          />

          <Cartoes
            titulo="Relatórios Gerados"
            valor="156"
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
