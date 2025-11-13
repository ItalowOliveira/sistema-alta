import { pool } from '../db';

export const createAltaRepository = async (data: any) => {
    // aceitar múltiplos nomes de campo por compatibilidade
    const {
        paciente_id,
        id_paciente,
        ID_PACIENTE,
        medico_responsavel_id,
        medico_responsavel,
        setor,
        leito,
        data_internacao,
        data_alta,
        status,
        tipo_documento,
        documento_id,
        } = data as any;

    const pacienteId = paciente_id ?? id_paciente ?? ID_PACIENTE ?? null;
    const medicoIdRaw = medico_responsavel_id ?? medico_responsavel ?? null;

    const pacienteIdNum = pacienteId == null ? null : Number(pacienteId);
    const medicoIdNum = medicoIdRaw == null ? null : Number(medicoIdRaw);

    if (pacienteId != null && Number.isNaN(pacienteIdNum)) {
        throw new Error('Invalid paciente id');
    }
    if (medicoIdRaw != null && Number.isNaN(medicoIdNum)) {
        throw new Error('Invalid medico_responsavel id');
    }


    const statusVal = status ?? 'Pendente';
    const tipoDocVal = tipo_documento ?? null;
    const documentoIdVal = documento_id ?? null;

    const result = await pool.query(
    `INSERT INTO altas (id_paciente, id_medico_responsavel, setor, leito, data_internacao, data_alta, status, tipo_documento, documento_id)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [pacienteIdNum, medicoIdNum, setor ?? null, leito ?? null, data_internacao ?? null, data_alta ?? null, statusVal, tipoDocVal, documentoIdVal]
    );

    return result.rows[0];
};

export const getAllAltasRepository = async () => {
    return await getAltasByMedicoRepository();
};

export const getAltasByMedicoRepository = async (medicoId?: number, page?: number, pageSize?: number, q?: string) => {
    const baseQuery = `FROM altas a
         LEFT JOIN pacientes p ON p.id = a.id_paciente
         LEFT JOIN usuarios u ON u.id = a.id_medico_responsavel`;

    const whereClauses: string[] = [];
    const params: any[] = [];
    if (medicoId != null) {
        params.push(medicoId);
        whereClauses.push(`a.id_medico_responsavel = $${params.length}`);
    }
    if (q && q.trim().length > 0) {
        const like = `%${q.trim()}%`;
        params.push(like, like, like, like);
        // search in paciente nome, medico nome, setor, leito
        whereClauses.push(`(p.nome_paciente ILIKE $${params.length - 3} OR u.nome ILIKE $${params.length - 2} OR a.setor ILIKE $${params.length - 1} OR a.leito ILIKE $${params.length})`);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // total count
    const countRes = await pool.query(`SELECT COUNT(*) as total ${baseQuery} ${whereSql}`, params);
    const total = Number(countRes.rows[0]?.total ?? 0);

    // pagination
    let rows: any[] = [];
    if (typeof page === 'number' && typeof pageSize === 'number') {
        const offset = (Math.max(1, page) - 1) * pageSize;
        const pagParams = params.slice();
        pagParams.push(pageSize, offset);
        const qstr = `SELECT a.*, a.status as status, p.nome_paciente as paciente_nome, u.nome as medico_nome ${baseQuery} ${whereSql} ORDER BY a.id_internacao DESC LIMIT $${pagParams.length - 1} OFFSET $${pagParams.length}`;
        const res = await pool.query(qstr, pagParams);
        rows = res.rows;
    } else {
        const res = await pool.query(`SELECT a.*, a.status as status, p.nome_paciente as paciente_nome, u.nome as medico_nome ${baseQuery} ${whereSql} ORDER BY a.id_internacao DESC`, params);
        rows = res.rows;
    }

    return { rows, total };
};

export const updateAltaStatusRepository = async (altaId: number, status: string) => {
    const result = await pool.query(
        `UPDATE altas SET status = $1 WHERE id_internacao = $2 RETURNING *`,
        [status, altaId]
    );
    return result.rows[0];
}

export const updateAltaDocumentoRepository = async (altaId: number, tipo_documento: string, documento_id: number) => {
    const result = await pool.query(
        `UPDATE altas SET tipo_documento = $1, documento_id = $2 WHERE id_internacao = $3 RETURNING *`,
        [tipo_documento, documento_id, altaId]
    );
    return result.rows[0];
}

export const updateAltaDataAltaRepository = async (altaId: number, data_alta: string | null) => {
    const result = await pool.query(
        `UPDATE altas SET data_alta = $1 WHERE id_internacao = $2 RETURNING *`,
        [data_alta ?? null, altaId]
    );
    return result.rows[0];
}
