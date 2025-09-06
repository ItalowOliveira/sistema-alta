import { UserRoundSearch, Search } from "lucide-react";

export default function btnSearch(){

    return(

        <>
        <form className="flex items-center max-w-1xl mx-auto">   {/* Aumentei a largura máxima */}
    <label className="sr-only">Search</label>
    <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <UserRoundSearch color="white"/>
        </div>
        <input 
            type="text" 
            id="voice-search" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-12 py-2 px-4  dark:bg-neutral-900 dark:border-neutral-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" // Aumentei o padding vertical e o tamanho da fonte
            placeholder="Insira Nome do Paciente" 
            required 
        />
    </div>
    <button 
        type="submit" 
        className="inline-flex items-center py-2 px-3 ms-2 text-base font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> {/* Aumentei o padding e a fonte do botão para combinar */}
        <Search/> 
         Procurar
    </button>
</form>
        
        
        
        
        </>

    );





}