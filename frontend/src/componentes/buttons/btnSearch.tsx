import { UserRoundSearch, Search } from "lucide-react";

type btnProps = {
    text: string;
};

export default function BtnSearch({ text }: btnProps) {
    return (
        <form className="flex items-center w-full mb-4">
            <label htmlFor="voice-search" className="sr-only">Buscar</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <UserRoundSearch color="gray" className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    id="voice-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={text}
                    required
                />
            </div>
            <button
                type="submit"
                className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                <Search className="h-4 w-4 me-2" />
                Procurar
            </button>
        </form>
    );
}