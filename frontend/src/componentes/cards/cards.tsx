const cartoes = ({ titulo, valor, porcentagem, icone, fundoIcone, corIcone, corPorcentagem, descricao }: { titulo: string; valor: string; porcentagem?: string; icone: React.ReactNode; fundoIcone: string; corIcone: string; corPorcentagem: string; descricao: string }) => {
  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
      <div className="p-4 md:p-5 flex justify-between gap-x-3">
        <div>
          <p className="text-xs uppercase text-gray-500 dark:text-neutral-500">{titulo}</p>
          <div className="mt-1 flex items-center gap-x-2">
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">{valor}</h3>
            {porcentagem && (
              <span className={`flex items-center gap-x-1 ${corPorcentagem}`}>
                {icone}
                <span className="inline-block text-lg">{porcentagem}</span>
              </span>
            )}
          </div>
        </div>
        <div className={`shrink-0 flex justify-center items-center w-11 h-11 ${fundoIcone} ${corIcone} rounded-full`}>
          {icone}
        </div>
      </div>

      <a className="py-3 px-4 md:px-3 inline-flex justify-between items-center text-[12px] text-gray-600 border-t border-gray-200 hover:bg-gray-50 focus:outline-none focus:bg-gray-5 rounded-b-xl dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
       {descricao}
      </a>
    </div>
  );
}

export default cartoes;
