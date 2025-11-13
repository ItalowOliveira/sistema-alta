import {SquarePlus, LogOut, CircleUser} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { logout as apiLogout, meUsuario } from '../../api/usuarioApi';
import React from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState<string | null>(null);
  const [role, setRole] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      const u = await meUsuario();
      if (!mounted) return;
      setUserName(u ? u.nome : null);
      setRole(u ? u.tipo_usuario : null);
    })();
    return () => { mounted = false };
  }, []);
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-[#17181c] dark:border-[#17181c]">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start px-3">
        
            <SquarePlus size={24} color="#4a8cb5" />

            <a>
              <span className="self-center px-3 text-xl font-semibold sm:text-1xl whitespace-nowrap dark:text-white">
                  App de Altas Médicas
              </span>
            </a>
          </div>

          {/* USER */}
   <div className="flex items-center space-x-1">
  <button onClick={async () => { await apiLogout(); navigate('/'); }} className="flex items-center justify-center text-sm rounded-full p-2 transition duration-200 hover:bg-[#1e1f24] focus:ring-2 focus:ring-blue-500">
    <LogOut className="w-6 h-6 text-blue-400" />
  </button>

  <button className="flex items-center justify-center text-sm rounded-full p-2 transition duration-200 hover:bg-[#1e1f24] focus:ring-2 focus:ring-blue-500">
    <CircleUser className="w-6 h-6 text-blue-400" />
  </button>

  <span className="self-center px-1 text-xs font-semibold sm:text-1xl whitespace-nowrap dark:text-white">
    {userName || 'Usuário'} {role ? `(${role})` : ''}
  </span>
</div>
        </div>
      </div>
    </nav>
  );
}
