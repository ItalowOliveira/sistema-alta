-- PTA Psicologia table
CREATE TABLE IF NOT EXISTS pta_psicologia (
  id BIGSERIAL PRIMARY KEY,
  paciente_id BIGINT NULL,
  medico_id BIGINT NULL,
  alta_id BIGINT NULL,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- indicadores de necessidade (0/1)
  alteracoes_psicoemocionais SMALLINT,
  baixa_adesao_tratamento SMALLINT,
  tentativa_suicidio SMALLINT,
  suporte_emocional SMALLINT,
  baixa_compreensao SMALLINT,
  necessidade_outro SMALLINT,
  necessidade_outro_text TEXT,

  -- acoes desenvolvidas (0/1)
  acoes_intervencao_paciente SMALLINT,
  acoes_intervencao_familiares SMALLINT,
  acoes_orientacao_familiares SMALLINT,
  encaminhado_para TEXT,

  -- template fields
  dados_iniciais TEXT,
  dados_internacao TEXT,
  informacao_alta TEXT,
  tipo_orientacao TEXT,
  descricao_orientacao TEXT,
  orientado_paciente SMALLINT,
  orientado_familiar SMALLINT,
  orientado_cuidador SMALLINT,
  orientado_outros SMALLINT,
  orientado_outros_descricao TEXT,

  criado_por BIGINT NULL,
  atualizado_em TIMESTAMP WITH TIME ZONE NULL
);

CREATE INDEX IF NOT EXISTS idx_pta_psicologia_alta_id ON pta_psicologia(alta_id);
