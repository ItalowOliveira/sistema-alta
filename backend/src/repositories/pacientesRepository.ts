import { pool } from '../db'; 

export const createPacienteRepository = async (data: any) => {
    const { nome_paciente, data_nascimento, portador_de, endereco, numero, cidade, setor, leito, esf, hd } = data;
    const result = await pool.query(
        'INSERT INTO pacientes (nome_paciente, data_nascimento, portador_de, endereco, numero, cidade, setor, leito, esf, hd) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        [nome_paciente, data_nascimento, portador_de, endereco, numero, cidade, setor, leito, esf, hd]
    );
    return result.rows[0];
};

export const getAllPacientesRepository = async () => {
    const result = await pool.query('SELECT * FROM pacientes');
    return result.rows;
}
