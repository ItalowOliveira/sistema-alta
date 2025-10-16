
const btnList = ({AtividadeTitulo, FundoList, AtividadeDesc, icon, Horario}: {AtividadeTitulo: String; FundoList: String; AtividadeDesc: String; icon: React.ReactNode; Horario: String}) => {
  return (

<div
  className="flex items-start gap-3 p-3 rounded-lg transition 
             hover:bg-gray-100 dark:hover:bg-neutral-800 hover:shadow-md"
>
  <div
    className={`flex ${FundoList} items-center justify-center w-12 h-12 
                bg-white dark:bg-neutral-800 rounded-full border border-gray-200 
                dark:border-neutral-700 shadow-sm`}
  >
    {icon}
  </div>

  <div className="flex-1">
    <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
      {AtividadeTitulo}
    </p>
    <p className="text-xs text-gray-500 dark:text-gray-400">
      {AtividadeDesc}
    </p>
  </div>

  <span className="text-xs text-gray-400 dark:text-gray-500">{Horario}</span>
</div>
  );
}

export default btnList;