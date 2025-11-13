import { pool } from '../db';

export const createPtaFisioterapiaRepository = async (data: any) => {
  const {
    paciente_id,
    medico_id,
    alta_id,
    tosse_produtiva,
    tosse_inprodutiva,
    tosse_aspiracao,
    tosse_outros_text,
    dependencia_banhar,
    dependencia_vestir,
    dependencia_banheiro,
    dependencia_transferencia,
    dependencia_continencia,
    dependencia_alimentacao,
    alta_necessita,
    outros_texto,
  acoes_realizadas,
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
    `INSERT INTO pta_fisioterapia (
      paciente_id, medico_id, alta_id, criado_em,
      tosse_produtiva, tosse_inprodutiva, tosse_aspiracao, tosse_outros_text,
      dependencia_banhar, dependencia_vestir, dependencia_banheiro, dependencia_transferencia, dependencia_continencia, dependencia_alimentacao,
      alta_necessita, outros_texto,
      dados_iniciais, dados_internacao, informacao_alta,
      tipo_orientacao, descricao_orientacao,
      orientado_paciente, orientado_familiar, orientado_cuidador, orientado_outros, orientado_outros_descricao,
      acoes_realizadas
    ) VALUES (
      $1,$2,$3,$4,
      $5,$6,$7,$8,
      $9,$10,$11,$12,$13,$14,
      $15,$16,
      $17,$18,$19,
      $20,$21,
      $22,$23,$24,$25,$26,
      $27
    ) RETURNING *`,
    [
      paciente_id ?? null,
      medico_id ?? null,
      alta_id ?? null,
      data_criacao ?? new Date(),
      tosse_produtiva ? 1 : 0,
      tosse_inprodutiva ? 1 : 0,
      tosse_aspiracao ? 1 : 0,
      tosse_outros_text ?? null,
      dependencia_banhar ? 1 : 0,
      dependencia_vestir ? 1 : 0,
      dependencia_banheiro ? 1 : 0,
      dependencia_transferencia ? 1 : 0,
      dependencia_continencia ? 1 : 0,
      dependencia_alimentacao ? 1 : 0,
      alta_necessita ?? null,
      outros_texto ?? null,
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
      acoes_realizadas ?? null,
    ]
  );

  return result.rows[0];
};

export const getPtaFisioterapiaByIdRepository = async (id: number) => {
  const result = await pool.query(`SELECT * FROM pta_fisioterapia WHERE id = $1`, [id]);
  return result.rows[0] ?? null;
};
