import PacientesTable from "../componentes/tables/pacientesTable";
import BtnSearch from "../componentes/buttons/btnSearch";

export default function Painel() {
  return (

    <div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Painel</h1>
        <h1 className="text-sm text-gray-500 dark:text-gray-400 mb-4">Cadastro de Pacientes</h1>


        <BtnSearch />
        <PacientesTable/>


      </div>



  );
}