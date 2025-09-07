import { UserRoundSearch, Search } from "lucide-react";

type btnProps = {
    text: string;
};

export default function BtnSearch({ text }: btnProps) {
    return (
        <form className="flex items-center w-full max-w-[85rem] mx-auto mb-0">
            <label className="sr-only">Buscar</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                    <UserRoundSearch color="white" className="h-5 w-5" />
                </div>
                <input
                    type="text"
                    id="voice-search"
                    className="bg-gray-50 border border-gray-300 text-neutral-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 py-3 px-5 dark:bg-neutral-900 dark:border-neutral-800 dark:placeholder-neutral-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={text}
                    required
                />
            </div>
            <button
                type="submit"
                className="inline-flex items-center py-2 px-4 ms-2 text-base font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                <Search className="mr-1" />
                Procurar
            </button>
        </form>
    );
}