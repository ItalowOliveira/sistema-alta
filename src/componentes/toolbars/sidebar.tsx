import {Users, ChartPie, Bandage, Stethoscope, Printer, ShieldUser, Sun} from "lucide-react";


export default function Sidebar() {
  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 
      bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">

      <h1 className="text-white text-1xl font-bold mb-6">Menu Principal</h1>

        <ul className="space-y-2 font-medium">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white 
                hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <ChartPie size={32} color="white" />
              <span className="ms-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white 
                hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <Users size={32} color="white" />
              <span className="ms-3">Cadastro de Pacientes</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white 
                hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >

              <Bandage size={32} color="white" />

              <span className="ms-3">Planos Terapêutico</span>
            </a>
          </li>
            <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white 
                hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >

              <Stethoscope size={32} color="white" />

              <span className="ms-3">PTS</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white 
                hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >

              <Printer size={32} color="white" />

              <span className="ms-3">Impressão de Altas</span>
            </a>
          </li>
            <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white 
                hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >

              <ShieldUser size={32} color="white" />

              <span className="ms-3">Gerenciamento de Usuários</span>
            </a>
          </li>

           <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700"></ul>

               <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white 
                hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >

              <Sun size={32} color="white" />

              <span className="ms-3">Modo Claro</span>
            </a>
          </li>


        </ul>
      </div>
    </aside>
  );
}
