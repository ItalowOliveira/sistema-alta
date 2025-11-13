import { pool } from '../db';

export const createPtaNutricaoRepository = async (data: any) => {
  const {
    paciente_id,
    medico_id,
    alta_id,
    inapetencia,
    desnutricao,
    risco_desnutricao,
    sobrepeso,
    obesidade,
    npt,
    indicadores_outros,
    necessidade_oral,
    necessidade_oral_assistida,
    necessidade_enteral,
    necessidade_outro,
    necessidade_outro_text,
    acoes_orientacao_enteral,
    acoes_encaminhamento,
    acoes_rede_basica,
    acoes_outro,
    acoes_outro_text,
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
    `INSERT INTO pta_nutricao (
      paciente_id, medico_id, alta_id, criado_em,
      inapetencia, desnutricao, risco_desnutricao, sobrepeso, obesidade, npt, indicadores_outros,
      necessidade_oral, necessidade_oral_assistida, necessidade_enteral, necessidade_outro, necessidade_outro_text,
      acoes_orientacao_enteral, acoes_encaminhamento, acoes_rede_basica, acoes_outro, acoes_outro_text,
      dados_iniciais, dados_internacao, informacao_alta,
      tipo_orientacao, descricao_orientacao,
  orientado_paciente, orientado_familiar, orientado_cuidador, orientado_outros, orientado_outros_descricao
    ) VALUES (
      $1,$2,$3,$4,
      $5,$6,$7,$8,$9,$10,$11,
      $12,$13,$14,$15,$16,
      $17,$18,$19,$20,$21,
      $22,$23,$24,
      $25,$26,
  $27,$28,$29,$30,$31
    ) RETURNING *`,
    [
      paciente_id ?? null,
      medico_id ?? null,
      alta_id ?? null,
      data_criacao ?? new Date(),
      inapetencia ? 1 : 0,
      desnutricao ? 1 : 0,
      risco_desnutricao ? 1 : 0,
      sobrepeso ? 1 : 0,
      obesidade ? 1 : 0,
      npt ? 1 : 0,
      indicadores_outros ?? null,
      necessidade_oral ? 1 : 0,
      necessidade_oral_assistida ? 1 : 0,
      necessidade_enteral ? 1 : 0,
      necessidade_outro ? 1 : 0,
      necessidade_outro_text ?? null,
      acoes_orientacao_enteral ? 1 : 0,
      acoes_encaminhamento ? 1 : 0,
      acoes_rede_basica ? 1 : 0,
      acoes_outro ? 1 : 0,
      acoes_outro_text ?? null,
      dados_iniciais ?? null,
      dados_internacao ?? null,
      informacao_alta ?? null,
      tipo_orientacao ?? null,
      descricao_orientacao ?? null,
  orientado_paciente ? 1 : 0,
  orientado_familiar ? 1 : 0,
  orientado_cuidador ? 1 : 0,
  orientado_outros ? 1 : 0,
  orientado_outros_descricao ?? null,
    ]
  );

  return result.rows[0];
};

export const getPtaNutricaoByIdRepository = async (id: number) => {
  const result = await pool.query(`SELECT * FROM pta_nutricao WHERE id = $1`, [id]);
  return result.rows[0] ?? null;
};
