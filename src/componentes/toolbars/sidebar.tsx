import { Link } from "react-router-dom";
import {Users, ChartPie, Bandage, Stethoscope, Printer, ShieldUser, Sun} from "lucide-react";


export default function Sidebar() {
  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 
      bg-white border-r border-gray-200 dark:bg-[#17181c] dark:border-[#17181c]"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <h1 className="text-[#7e7e7eff] px-3 font-bold text-[10px] mb-6">MENU PRINCIPAL</h1>
          <ul className="space-y-3 font-medium">


          <li>
            <Link to="/dashboard" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <ChartPie size={20} color="#999999" />
              <span className="ms-3 text-xs font-bold text-[#999999]">Dashboard</span>
            </Link>
          </li>


          <li>
            <Link to="/cadastro-paciente" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Users size={20} color="#999999" />
              <span className="ms-3 text-xs font-bold text-[#999999]">Cadastro de Pacientes</span>
            </Link>
          </li>


          <li>
            <Link to="/pta" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bandage size={20} color="#999999" />
             <span className="ms-3 text-xs font-bold text-[#999999]">PTA</span>
            </Link>
          </li>


            <li>
            <Link to="/pts" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Stethoscope size={20} color="#999999" />
             <span className="ms-3 text-xs font-bold text-[#999999]">PTS</span>
            </Link>
          </li>
          
          <li>
            <Link to="/impressoes" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Printer size={20} color="#999999" />
              <span className="ms-3 text-xs font-bold text-[#999999]">Impressão de Altas</span>
            </Link>
          </li>

            <li>
            <Link to="/gerenciamento-usuarios" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <ShieldUser size={20} color="#999999" />
              <span className="ms-3 text-xs font-bold text-[#999999]">Gerenciamento de Usuários</span>
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
