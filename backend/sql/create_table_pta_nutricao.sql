-- PTA Nutrição table
CREATE TABLE IF NOT EXISTS pta_nutricao (
  id BIGSERIAL PRIMARY KEY,
  paciente_id BIGINT NULL,
  medico_id BIGINT NULL,
  alta_id BIGINT NULL,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- indicadores de necessidade nutricional (0/1)
  inapetencia SMALLINT,
  desnutricao SMALLINT,
  risco_desnutricao SMALLINT,
  sobrepeso SMALLINT,
  obesidade SMALLINT,
  npt SMALLINT,
  indicadores_outros TEXT,

  -- modalidade de alta / necessidade
  necessidade_oral SMALLINT,
  necessidade_oral_assistida SMALLINT,
  necessidade_enteral SMALLINT,
  necessidade_outro SMALLINT,
  necessidade_outro_text TEXT,

  -- ações desenvolvidas (0/1)
  acoes_orientacao_enteral SMALLINT,
  acoes_encaminhamento SMALLINT,
  acoes_rede_basica SMALLINT,
  acoes_outro SMALLINT,
  acoes_outro_text TEXT,

  -- shared PTA template fields
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

-- optional index for alta_id
CREATE INDEX IF NOT EXISTS idx_pta_nutricao_alta_id ON pta_nutricao(alta_id);
