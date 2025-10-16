import { Link, useLocation} from "react-router-dom";
import {Users, ChartPie, Bandage, Stethoscope, Printer, ShieldUser, Sun} from "lucide-react";


export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
   return location.pathname === path;
  }

  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 
      bg-white border-r border-gray-200 dark:bg-[#17181c] dark:border-[#17181c]"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <h1 className="text-[#7e7e7eff] px-3 font-bold text-[10px] mb-6">MENU PRINCIPAL</h1>
          <ul className="space-y-3 font-medium">


          <li>
          <Link to="/dashboard" className={`flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive("/dashboard") ? "bg-blue-600 dark:bg-blue-600" : ""}`}>
            <ChartPie size={20} color={isActive("/dashboard") ? "white" : "#999999"} />
            <span className={`ms-3 text-xs font-bold ${isActive("/dashboard") ? "text-white" : "text-[#999999]"}`}>Dashboard</span>
          </Link>
          </li>


          <li>
        <Link to="/cadastro-paciente" className={`flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive("/cadastro-paciente") ? "bg-blue-600 dark:bg-blue-600" : ""}`}>
          <Users size={20} color={isActive("/cadastro-paciente") ? "white" : "#999999"} />
          <span className={`ms-3 text-xs font-bold ${isActive("/cadastro-paciente") ? "text-white" : "text-[#999999]"}`}>Cadastro de Pacientes</span>
        </Link>
          </li>


          <li>
        <Link to="/pta" className={`flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive("/pta") ? "bg-blue-600 dark:bg-blue-600" : ""}`}>
          <Bandage size={20} color={isActive("/pta") ? "white" : "#999999"} />
         <span className={`ms-3 text-xs font-bold ${isActive("/pta") ? "text-white" : "text-[#999999]"}`}>PTA</span>
        </Link>
          </li>


        <li>
        <Link to="/pts" className={`flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive("/pts") ? "bg-blue-600 dark:bg-blue-600" : ""}`}>
          <Stethoscope size={20} color={isActive("/pts") ? "white" : "#999999"} />
         <span className={`ms-3 text-xs font-bold ${isActive("/pts") ? "text-white" : "text-[#999999]"}`}>PTS</span>
        </Link>
          </li>
          
          <li>
        <Link to="/impressoes" className={`flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive("/impressoes") ? "bg-blue-600 dark:bg-blue-600" : ""}`}>
          <Printer size={20} color={isActive("/impressoes") ? "white" : "#999999"} />
          <span className={`ms-3 text-xs font-bold ${isActive("/impressoes") ? "text-white" : "text-[#999999]"}`}>Impressão de Relatorios</span>
        </Link>
          </li>

        <li>
        <Link to="/gerenciamento-usuarios" className={`flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive("/gerenciamento-usuarios") ? "bg-blue-600 dark:bg-blue-600" : ""}`}>
          <ShieldUser size={20} color={isActive("/gerenciamento-usuarios") ? "white" : "#999999"} />
          <span className={`ms-3 text-xs font-bold ${isActive("/gerenciamento-usuarios") ? "text-white" : "text-[#999999]"}`}>Gerenciamento de Usuários</span>
        </Link>
          </li>

           <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700"></ul>

             <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white 
                hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <Sun size={20} color="#999999" />
              <span className="ms-3 text-xs font-bold text-[#999999]">Modo Claro</span>
            </a>
          </li>


        </ul>
      </div>
    </aside>
  );
}
