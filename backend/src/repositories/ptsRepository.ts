import { pool } from '../db';

export const createPTSRepository = async (data: any) => {
    const {
        paciente_id,
        medico_id,
        data_criacao,
        tipo,
        pa,
        fc,
        nivel_dependencia,
        sato2,
        inspecao_palpacao,
        avaliacao_fisica,
        grau_mobilidade,
        forca_sensibilidade,
        medicamentos_uso_continuo,
        historia_pregressa,
        avaliacao_geral,
        acoes_curto_prazo,
        acoes_medio_prazo,
        acoes_longo_prazo,  
    } = data;

    const result = await pool.query(
        `INSERT INTO pts 
        (paciente_id, medico_id, data_criacao, tipo, pa, fc, nivel_dependencia, sato2, inspecao_palpacao, avaliacao_fisica, grau_mobilidade, forca_sensibilidade, medicamentos_uso_continuo, historia_pregressa, avaliacao_geral, acoes_curto_prazo, acoes_medio_prazo, acoes_longo_prazo)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING *`,
        [
            paciente_id,
            medico_id,
            data_criacao,
            tipo,
            pa,
            fc,
            nivel_dependencia,
            sato2,
            inspecao_palpacao,
            avaliacao_fisica,
            grau_mobilidade,
            forca_sensibilidade,
            medicamentos_uso_continuo,
            historia_pregressa,
            avaliacao_geral,
            acoes_curto_prazo,
            acoes_medio_prazo,
            acoes_longo_prazo,
        ]
    );

    return result.rows[0];
};

export const getPTSByIdRepository = async (id: number) => {
    const result = await pool.query(`SELECT * FROM pts WHERE id = $1`, [id]);
    return result.rows[0] ?? null;
};
    
