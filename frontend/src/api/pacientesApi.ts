import api from "./apiClient";

export interface Pacientes {
    
    id: number;
    nome_paciente: string;
    idade: number;
    portador_de: string;
    motivo: string;
    endereco: string;
    numero: number;
    cidade: string;
    setor: string;
    leito: string;
    data_internacao: string;
    data_alta: string;
    medico_responsavel: string;
}

export const getPacientes = async (): Promise<Pacientes[]> => {
    const response = await api.get<Pacientes[]>("/pacientes");
    return response.data;
}

export const criarPaciente = async (paciente: Omit<Pacientes, 'id'>): Promise<Pacientes> => {
    const response = await api.post<Pacientes>("/pacientes", paciente);
    return response.data;
}

