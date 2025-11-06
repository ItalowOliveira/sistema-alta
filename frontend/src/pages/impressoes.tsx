import { Printer } from "lucide-react";

export default function Painel() {
  return (
    <div>
      <div className="flex items-start mb-4 gap-3">
        <div className="rounded-full bg-blue-100 p-2">
          <Printer className="mr-0 h-10 w-10 text-blue-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Impressão de Relatorios
          </h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Gerenciamento de Relatorios
          </span>
        </div>
      </div>
    </div>

  );
}