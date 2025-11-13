import { pool } from '../db';

export const createPtaEnfermagemRepository = async (data: any) => {
  const {
    paciente_id,
    medico_id,
    alta_id,
    glasgow,
    ulcera,
    sonda,
    oxigenio,
    curativo,
    estomas,
    traqueostomia,
    aspiracao,
    outros_texto,
    para_curativos,
    cuidados_sondas_estomas,
    orientacoes_dieta,
    prevencao_ulcera,
    aspiracao_vias,
    cuidados_pele,
    dados_iniciais,
    dados_internacao,
    informacao_alta,
    tipo_orientacao,
    descricao_orientacao,
    orientado_paciente,
    orientado_familiar,
    orientado_cuidador,
    orientado_outros,
    orientado_outros_descricao,
    data_criacao,
  } = data;

  const result = await pool.query(
    `INSERT INTO pta_enfermagem (
      paciente_id, medico_id, alta_id, criado_em,
      glasgow,
      ulcera, sonda, oxigenio, curativo, estomas, traqueostomia, aspiracao, outros_texto,
      para_curativos, cuidados_sondas_estomas, orientacoes_dieta, prevencao_ulcera, aspiracao_vias, cuidados_pele,
      dados_iniciais, dados_internacao, informacao_alta,
      tipo_orientacao, descricao_orientacao,
      orientado_paciente, orientado_familiar, orientado_cuidador, orientado_outros, orientado_outros_descricao
    ) VALUES (
      $1,$2,$3,$4,
      $5,
      $6,$7,$8,$9,$10,$11,$12,$13,
      $14,$15,$16,$17,$18,$19,
      $20,$21,$22,
      $23,$24,
  $25,$26,$27,$28,$29
    ) RETURNING *`,
    [
      paciente_id ?? null,
      medico_id ?? null,
      alta_id ?? null,
      data_criacao ?? new Date(),
      glasgow ?? null,
      ulcera ?? false,
      sonda ?? false,
      oxigenio ?? false,
      curativo ?? false,
      estomas ?? false,
      traqueostomia ?? false,
      aspiracao ?? false,
      outros_texto ?? null,
      para_curativos ?? false,
      cuidados_sondas_estomas ?? false,
      orientacoes_dieta ?? false,
      prevencao_ulcera ?? false,
      aspiracao_vias ?? false,
      cuidados_pele ?? false,
      dados_iniciais ?? null,
      dados_internacao ?? null,
      informacao_alta ?? null,
      tipo_orientacao ?? null,
      descricao_orientacao ?? null,
      orientado_paciente ?? false,
      orientado_familiar ?? false,
      orientado_cuidador ?? false,
      orientado_outros ?? false,
      orientado_outros_descricao ?? null,
    ]
  );

  return result.rows[0];
};

export const getPtaEnfermagemByIdRepository = async (id: number) => {
    const result = await pool.query(`SELECT * FROM pta_enfermagem WHERE id = $1`, [id]);
    return result.rows[0] ?? null;
};
    
