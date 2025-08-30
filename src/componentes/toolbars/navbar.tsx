import {SquarePlus, Bell, CircleUser} from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
        
            <SquarePlus size={32} color="#4a8cb5" />

            <a>
              <span className="self-center text-xl font-semibold sm:text-1xl whitespace-nowrap dark:text-white">
                  App de Altas Médicas
              </span>
            </a>
          </div>

          {/* USER */}
          <div className="flex items-center">

      <button
      className="p-1 rounded-xl hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      <Bell color="white"  className="w-8 h-8 text-blue-700" />
    </button>

            <button className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
              
              <CircleUser color="white"  className="w-8 h-8 text-blue-700" />

            </button>

            <a>
              <span className="self-center text-xl font-semibold sm:text-1xl whitespace-nowrap dark:text-white">
                  Dr. Italo Oliveira
              </span>
            </a>
            
          </div>
        </div>
      </div>
    </nav>
  );
}
