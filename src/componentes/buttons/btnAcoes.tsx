
const btnAcoes = ({texto, icone, fundoBG, }: {texto: string; icone: React.ReactNode; fundoBG: string;}) => {
  return (


      <button
      
        className={`flex flex-col ${fundoBG} items-center justify-center p-4 
                    bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 
                    dark:border-neutral-700 shadow-sm transition 
                    hover:bg-gray-100 dark:hover:bg-neutral-700 hover:shadow-md hover:scale-[1.02]`}
      >
        <div
          className="p-3 rounded-full bg-black text-blue-600 
                    dark:bg-blue-900/30 dark:text-blue-400 mb-2 
                    transition-transform duration-200 group-hover:scale-110"
        >
          {icone}
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {texto}
        </span>
      </button>

  );
}

export default btnAcoes;