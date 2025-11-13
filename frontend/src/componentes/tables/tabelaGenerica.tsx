import React, { useEffect, useState } from "react";
import { Plus, Loader2 } from "lucide-react";

type TableRow = { [key: string]: string | number | boolean };

type ColumnDefinition = {
  header: string; 
  accessorKey: string; 
  // optional: 'date' will show only date; 'datetime' will show date+time
  dateFormat?: 'date' | 'datetime';
};

type TableProps = {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  columns: ColumnDefinition[];
  // fetchData may accept optional (page, pageSize) and return either TableRow[] (client) or { rows, total } (server)
  fetchData: (page?: number, pageSize?: number) => Promise<TableRow[] | { rows: TableRow[]; total: number }>;
  // optional page size for client-side pagination
  pageSize?: number;
  // optional numeric signal to trigger a refresh without remounting the component
  refreshSignal?: number;
  onEdit?: (index: number, row: TableRow) => void;
  // optional custom renderer for action buttons (returns React nodes).
  renderActions?: (index: number, row: TableRow) => React.ReactNode;
};

const TabelaGenerica = ({
  title,
  description,
  buttonText,
  onButtonClick,
  columns,
  fetchData,
  pageSize,
  refreshSignal,
  onEdit,
  renderActions,
}: TableProps) => {
  const [rowData, setRowData] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSizeState, setPageSizeState] = useState<number>(10);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [serverSide, setServerSide] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
  const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const currentPageSize = (typeof pageSize === 'number') ? pageSize : pageSizeState;
        if (mounted && typeof pageSize === 'number') setPageSizeState(pageSize);
        const resp = await fetchData(1, currentPageSize);
        if (!mounted) return;
        setCurrentPage(1);
        if (Array.isArray(resp)) {
          setServerSide(false);
          setRowData(resp);
          setTotalRows(resp.length);
        } else {
          setServerSide(true);
          setRowData(resp.rows);
          setTotalRows(resp.total);
        }
      } catch (err: any) {
        setError("Erro ao carregar dados. Tente novamente.");
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadData();
    return () => { mounted = false; };
  }, [fetchData]);

  // react to external refresh signal without remounting the whole table
  useEffect(() => {
    if (typeof refreshSignal === 'undefined') return;
    let mounted = true;
    const run = async () => {
      try {
        setRefreshing(true);
        const currentPageSize = (typeof pageSize === 'number') ? pageSize : pageSizeState;
        const resp = await fetchData(1, currentPageSize);
        if (!mounted) return;
        setCurrentPage(1);
        if (Array.isArray(resp)) {
          setServerSide(false);
          setRowData(resp);
          setTotalRows(resp.length);
        } else {
          setServerSide(true);
          setRowData(resp.rows);
          setTotalRows(resp.total);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setRefreshing(false);
      }
    };
    run();
    return () => { mounted = false; };
  }, [fetchData, refreshSignal]);

  // ensure currentPage is valid when data or pageSize changes
  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(totalRows / pageSizeState));
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalRows, pageSizeState, currentPage]);

  // fetch page on page change (server-side) or leave client-side data as-is
  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (!serverSide) return;
      try {
        setLoading(true);
        const resp = await fetchData(currentPage, pageSizeState);
        if (!mounted) return;
        if (!Array.isArray(resp)) {
          setRowData(resp.rows);
          setTotalRows(resp.total);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run();
    return () => { mounted = false; };
  }, [currentPage, pageSizeState, serverSide, fetchData]);

  const formatDate = (value: any, kind: 'date' | 'datetime') => {
    if (!value && value !== 0) return '';
    const optsDate: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const optsDateTime: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const opts = kind === 'date' ? optsDate : optsDateTime;

    let d: Date | null = null;
    if (typeof value === 'number') {
      const v = value.toString().length === 10 ? value * 1000 : value;
      d = new Date(Number(v));
    } else if (typeof value === 'string') {
      // try ISO or YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}/.test(value)) d = new Date(value);
    }
    if (d && !isNaN(d.getTime())) {
      return new Intl.DateTimeFormat('pt-BR', { ...opts, timeZone: 'America/Sao_Paulo' }).format(d);
    }
    return null;
  };

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
                <div className="inline-flex gap-x-2 items-center">
                  {refreshing && <Loader2 className="animate-spin h-5 w-5 text-gray-500" />}
                  <button
                    onClick={onButtonClick}
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <Plus className="h-4 w-4" />
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
                        <th className="text-xs font-semibold uppercase tracking-wider text-gray-800 dark:text-neutral-200">Ações</th> {/* Largura fixa para ações */}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      { /* render current page rows; client-side mode stores all rows so slice, server-side rows already paged */ }
                      {(serverSide ? rowData : rowData.slice((currentPage - 1) * pageSizeState, currentPage * pageSizeState)).map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-neutral-800">
                          <td className="text-center ps-6 py-4">
                            <input
                              type="checkbox"
                              className="border-gray-300 rounded-sm text-blue-600"
                            />
                          </td>
                          {/* ALTERADO: Mapeia as definições de coluna para garantir a ordem correta */}
                          {columns.map((column) => {
                            const cellValue = row[column.accessorKey];
                            // special render for status column
                            if (String(column.accessorKey).toLowerCase() === 'status') {
                              const val = String(cellValue ?? '').toLowerCase();
                              const isFinalizado = val === 'finalizado' || val === 'finalizada';
                              const bg = isFinalizado ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
                              return (
                                <td key={column.accessorKey} className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bg}`}>
                                    {String(cellValue ?? '')}
                                  </span>
                                </td>
                              );
                            }
                            return (
                              <td key={column.accessorKey} className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                                  {column.dateFormat
                                    ? (formatDate(cellValue, column.dateFormat) ?? String(cellValue ?? ''))
                                    : String(cellValue ?? '')}
                                </span>
                              </td>
                            );
                          })}
                          <td className="text-center px-6 py-4">
                            {renderActions ? (
                              renderActions(index, row)
                            ) : onEdit ? (
                              <button
                                onClick={() => onEdit(index, row)}
                                className="text-blue-600 hover:underline dark:text-blue-400"
                              >
                                Editar
                              </button>
                            ) : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200 dark:border-neutral-700">
                { /* Pagination controls */}
                <nav aria-label="Page navigation" className="">
                  <ul className="flex -space-x-px text-sm">
                    <li>
 <button
    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
    disabled={currentPage === 1}
    className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border transition-all duration-200 backdrop-blur-sm
      bg-white/50 text-blue-600 border-blue-200 hover:bg-blue-50/50 hover:text-blue-700 hover:underline
      dark:bg-white/10 dark:text-blue-400 dark:border-blue-700 dark:hover:bg-blue-900/30
      focus:outline-hidden focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none`}
  >
    Voltar
  </button>
</li>

{Array.from({ length: Math.max(1, Math.ceil(totalRows / pageSizeState)) }).map((_, i) => {
  const page = i + 1;
  return (
    <li key={page}>
      <button
        onClick={() => setCurrentPage(page)}
        aria-current={currentPage === page ? 'page' : undefined}
        className={`py-2 px-4 inline-flex items-center justify-center text-sm font-medium rounded-md border transition-all duration-200 backdrop-blur-sm
          ${
            currentPage === page
              ? 'bg-blue-100/60 text-blue-700 border-blue-300 shadow-sm hover:bg-blue-200/70 hover:text-blue-800 hover:underline dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700'
              : 'bg-white/50 text-blue-600 border-blue-200 hover:bg-blue-50/50 hover:text-blue-700 hover:underline dark:bg-white/10 dark:text-blue-400 dark:border-blue-700 dark:hover:bg-blue-900/30'
          }
          focus:outline-hidden focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none`}
      >
        {page}
      </button>
    </li>
  );
})}

                    <li>
  <button
    onClick={() =>
      setCurrentPage(p =>
        Math.min(Math.ceil(totalRows / pageSizeState), p + 1)
      )
    }
    disabled={currentPage >= Math.ceil(totalRows / pageSizeState)}
    className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border transition-all duration-200 backdrop-blur-sm
      bg-white/50 text-blue-600 border-blue-200 hover:bg-blue-50/50 hover:text-blue-700 hover:underline
      dark:bg-white/10 dark:text-blue-400 dark:border-blue-700 dark:hover:bg-blue-900/30
      focus:outline-hidden focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none`}
  >
    Próximo
  </button>
                    </li>
                  </ul>
                </nav>
                <div className="text-sm text-gray-600 dark:text-white">
                  {`Mostrando ${(totalRows === 0) ? 0 : ((currentPage - 1) * pageSizeState + 1)}–${Math.min(currentPage * pageSizeState, totalRows)} de ${totalRows}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabelaGenerica;