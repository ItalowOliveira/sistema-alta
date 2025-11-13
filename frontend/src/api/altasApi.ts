import api from "./apiClient";

export interface Alta {
    id_internacao: number;
    id_paciente: number;
    paciente_nome?: string;
    id_medico_responsavel: number;
    medico_nome?: string;
    setor?: string;
    leito?: string;
    data_internacao?: string | null;
    data_alta?: string | null;
    plano?: string | null;
    status?: string | null;
}

export const getAllAltas = async (): Promise<Alta[]> => {
    const response = await api.get<Alta[]>("/altas");
    return response.data as any;
}

export const getAltasPaged = async (page: number, pageSize: number, q?: string): Promise<{ rows: Alta[]; total: number }> => {
    const params: any = { page, pageSize };
    if (q) params.q = q;
    const response = await api.get<{ rows: Alta[]; total: number }>("/altas", { params });
    return response.data;
}

export const criarAlta = async (alta: Omit<Alta, 'id_internacao'>): Promise<Alta> => {
    const response = await api.post<Alta>("/altas", alta);
    return response.data;
}

export const finalizeAlta = async (id: number, data_alta: string | null) => {
    const response = await api.post(`/altas/${id}/finalizar`, { data_alta });
    return response.data;
}