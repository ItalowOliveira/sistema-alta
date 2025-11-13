import { pool } from '../db';

export const createPtaPsicologiaRepository = async (data: any) => {
  const {
    paciente_id,
    medico_id,
    alta_id,
    alteracoes_psicoemocionais,
    baixa_adesao_tratamento,
    tentativa_suicidio,
    suporte_emocional,
    baixa_compreensao,
    necessidade_outro,
    necessidade_outro_text,
    acoes_intervencao_paciente,
    acoes_intervencao_familiares,
    acoes_orientacao_familiares,
    encaminhado_para,
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
    `INSERT INTO pta_psicologia (
      paciente_id, medico_id, alta_id, criado_em,
      alteracoes_psicoemocionais, baixa_adesao_tratamento, tentativa_suicidio, suporte_emocional, baixa_compreensao, necessidade_outro, necessidade_outro_text,
      acoes_intervencao_paciente, acoes_intervencao_familiares, acoes_orientacao_familiares, encaminhado_para,
      dados_iniciais, dados_internacao, informacao_alta,
      tipo_orientacao, descricao_orientacao,
      orientado_paciente, orientado_familiar, orientado_cuidador, orientado_outros, orientado_outros_descricao
    ) VALUES (
      $1,$2,$3,$4,
      $5,$6,$7,$8,$9,$10,$11,
      $12,$13,$14,$15,
      $16,$17,$18,
  $19,$20,$21,
  $22,$23,$24,$25
    ) RETURNING *`,
    [
      paciente_id ?? null,
      medico_id ?? null,
      alta_id ?? null,
      data_criacao ?? new Date(),
      alteracoes_psicoemocionais ? 1 : 0,
      baixa_adesao_tratamento ? 1 : 0,
      tentativa_suicidio ? 1 : 0,
      suporte_emocional ? 1 : 0,
      baixa_compreensao ? 1 : 0,
      necessidade_outro ? 1 : 0,
      necessidade_outro_text ?? null,
      acoes_intervencao_paciente ? 1 : 0,
      acoes_intervencao_familiares ? 1 : 0,
      acoes_orientacao_familiares ? 1 : 0,
      encaminhado_para ?? null,
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

export const getPtaPsicologiaByIdRepository = async (id: number) => {
  const result = await pool.query(`SELECT * FROM pta_psicologia WHERE id = $1`, [id]);
  return result.rows[0] ?? null;
};
