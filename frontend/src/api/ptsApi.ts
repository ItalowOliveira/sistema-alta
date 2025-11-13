import api from "./apiClient";

export interface PTS {
        paciente_id: number,
        medico_id: number,
        data_criacao: string,
        tipo: string,
        pa: string,
        fc: string,
        fr: string,
        sato2: string,
        inspecao_palpacao: string,
        avaliacao_fisica: string,
        grau_mobilidade: string,
        forca_sensibilidade: string,
        medicamentos_uso_continuo: string,
        historia_pregressa: string,
        avaliacao_geral: string,
        acoes_curto_prazo: string,
        acoes_medio_prazo: string,
        acoes_longo_prazo: string
    }

    export const criarPTS = async (pts: Omit<PTS, 'id'>): Promise<PTS> => {
        const response = await api.post<PTS>("/pts", pts);
        return response.data;
    }
