import api from "./apiClient";

export interface Alta {
    id: number;
    paciente_id: number;
    paciente_nome?: string;
    medico_responsavel_id: number;
    medico_nome?: string;
    setor: string;
    leito: string;
    data_internacao: string;
    data_alta: string;
}

export const getAllAltas = async (): Promise<Alta[]> => {
    const response = await api.get<Alta[]>("/altas");
    return response.data;
}

export const criarAlta = async (alta: Omit<Alta, 'id'>): Promise<Alta> => {
    const response = await api.post<Alta>("/altas", alta);
    return response.data;
}