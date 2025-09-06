import { User } from "lucide-react";
export default function MedicoPacienteSection() {

    return (
        <div className="mb-8">

            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <User className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Dados do Paciente</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">

              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Paciente</label>
                <input type="text" placeholder="Nome completo do paciente" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Idade</label>
                <input type="number" placeholder="Idade" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
              </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">ESF</label>
                    <input type="text" placeholder="ESF" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
                  </div>
              
             <div>
               <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Orientação fornecida a:</label>
                <select id="small" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" >
                  <option selected>Selecione uma opção</option>
                  <option value="US">Paciente</option>
                  <option value="CA">Familiar/Cuidador</option>
                  <option value="DE">Outro</option>
                </select>
              </div> 

            </div>      
          </div>
        

    );
    
}