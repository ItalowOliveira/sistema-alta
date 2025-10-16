import { useEffect, useState } from "react";


type TableRow = { [key: string]: string | number | boolean };

type ColumnDefinition = {
  header: string; 
  accessorKey: string; 
};

type TableProps = {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  columns: ColumnDefinition[];
  fetchData: () => Promise<TableRow[]>;
  onEdit?: (index: number, row: TableRow) => void;
};

const TabelaGenerica = ({
  title,
  description,
  buttonText,
  onButtonClick,
  columns,
  fetchData,
  onEdit,
}: TableProps) => {
  const [rowData, setRowData] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchData();
        setRowData(data);
      } catch (err: any) {
        setError("Erro ao carregar dados. Tente novamente.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchData]);

  return (
<div className="w-full">
      <div className="flex flex-col">
        <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          <div className="min-w-full inline-block align-middle">
            <div className="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
              
              {/* Cabeçalho */}
              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                    {title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    {description}
                  </p>
                </div>
                <div className="inline-flex gap-x-2">
                  <button
                    onClick={onButtonClick}
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    {buttonText}
                  </button>
                </div>
              </div>

              {/* Corpo da Tabela */}
              <div className="w-full overflow-x-auto">
                {loading ? (
                  <p className="p-6 text-center text-gray-500 dark:text-neutral-400">
                    Carregando dados...
                  </p>
                ) : error ? (
                  <p className="p-6 text-center text-red-500">{error}</p>
                ) : rowData.length === 0 ? (
                  <p className="p-6 text-center text-gray-500 dark:text-neutral-400">
                    Nenhum dado encontrado.
                  </p>
                ) : (
                  // ALTERADO: 'table-fixed' para 'table-auto' para que as colunas se ajustem melhor ao conteúdo
                  <table className="min-w-full w-full divide-y divide-gray-200 dark:divide-neutral-700 table-auto">
                    <thead className="bg-gray-50 dark:bg-neutral-800">
                      <tr>
                        <th className="ps-6 py-3 text-center w-12"> {/* Largura fixa para checkbox */}
                          <input
                            type="checkbox"
                            className="border-gray-300 rounded-sm text-blue-600"
                          />
                        </th>
                        {columns.map((column) => (
                          <th
                            key={column.accessorKey}
                            className="px-6 py-3 text-left"
                          >
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-800 dark:text-neutral-200">
                              {column.header}
                            </span>
                          </th>
                        ))}
                        <th className="px-6 py-3 text-center w-24">Ações</th> {/* Largura fixa para ações */}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {rowData.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-neutral-800">
                          <td className="text-center ps-6 py-4">
                            <input
                              type="checkbox"
                              className="border-gray-300 rounded-sm text-blue-600"
                            />
                          </td>
                          {/* ALTERADO: Mapeia as definições de coluna para garantir a ordem correta */}
                          {columns.map((column) => (
                            <td key={column.accessorKey} className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                                {String(row[column.accessorKey])}
                              </span>
                            </td>
                          ))}
                          <td className="text-center px-6 py-4">
                            {onEdit && (
                              <button
                                onClick={() => onEdit(index, row)}
                                className="text-blue-600 hover:underline dark:text-blue-400"
                              >
                                Editar
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Rodapé (sem alterações) */}
              <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200 dark:border-neutral-700">
                {/* ... conteúdo do rodapé ... */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabelaGenerica;