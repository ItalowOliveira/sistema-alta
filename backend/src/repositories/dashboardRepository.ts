import { pool } from '../db';

export const getPacientesQuantity = async (userId?: number) => {
    if (userId) {
        try {
            const result = await pool.query('SELECT COUNT(*) FROM pacientes WHERE id_medico_responsavel = $1', [userId]);
            return parseInt(result.rows[0].count, 10);
        } catch (err) {
            try {
                const result = await pool.query('SELECT COUNT(*) FROM pacientes WHERE medico_responsavel = $1', [userId]);
                return parseInt(result.rows[0].count, 10);
            } catch (err2) {
                // if neither column exists, return 0 as safe default
                return 0;
            }
        }
    }
    const result = await pool.query('SELECT COUNT(*) FROM pacientes');
    return parseInt(result.rows[0].count, 10);
}

export const getMedicosQuantity = async () => {
    const res = await pool.query('SELECT COUNT(*) FROM usuarios');
    return parseInt(res.rows[0].count, 10);
}

export const getAltasCounts = async (userId?: number) => {
    // total altas for user
    if (userId) {
        try {
            const totalRes = await pool.query('SELECT COUNT(*) FROM altas WHERE id_medico_responsavel = $1', [userId]);
            const pendingRes = await pool.query("SELECT COUNT(*) FROM altas WHERE id_medico_responsavel = $1 AND (status IS NULL OR LOWER(status) NOT LIKE 'finaliz%')", [userId]);
            return {
                total: parseInt(totalRes.rows[0].count, 10),
                pending: parseInt(pendingRes.rows[0].count, 10),
            };
        } catch (err) {
            // fallback: try using 'medico_id' column name if schema differs
            const totalRes = await pool.query('SELECT COUNT(*) FROM altas WHERE medico_id = $1', [userId]);
            const pendingRes = await pool.query("SELECT COUNT(*) FROM altas WHERE medico_id = $1 AND (status IS NULL OR LOWER(status) NOT LIKE 'finaliz%')", [userId]);
            return {
                total: parseInt(totalRes.rows[0].count, 10),
                pending: parseInt(pendingRes.rows[0].count, 10),
            };
        }
    }
    // without user filter
    const totalRes = await pool.query('SELECT COUNT(*) FROM altas');
    const pendingRes = await pool.query("SELECT COUNT(*) FROM altas WHERE (status IS NULL OR LOWER(status) NOT LIKE 'finaliz%')");
    return {
        total: parseInt(totalRes.rows[0].count, 10),
        pending: parseInt(pendingRes.rows[0].count, 10),
    };
}