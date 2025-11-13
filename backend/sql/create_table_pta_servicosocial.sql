-- PTA Serviço Social table
CREATE TABLE IF NOT EXISTS pta_servicosocial (
  id BIGSERIAL PRIMARY KEY,
  paciente_id BIGINT NULL,
  medico_id BIGINT NULL,
  alta_id BIGINT NULL,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- mora / convivência
  mora_sozinho SMALLINT,
  mora_conjuge SMALLINT,
  mora_filho SMALLINT,
  mora_nora_genro SMALLINT,
  mora_irmao SMALLINT,
  mora_institucionalizado SMALLINT,
  mora_outros_text TEXT,

  -- pós-alta residência
  posalta_sozinho SMALLINT,
  posalta_conjuge SMALLINT,
  posalta_filho SMALLINT,
  posalta_nora_genro SMALLINT,
  posalta_irmao SMALLINT,
  posalta_institucionalizado SMALLINT,
  posalta_outros_text TEXT,

  -- familiar responsável
  familiar_responsavel TEXT,
  familiar_telefone TEXT,

  -- renda
  renda_aposentadoria SMALLINT,
  renda_bolsa_familia SMALLINT,
  renda_pensao SMALLINT,
  renda_bpc SMALLINT,
  renda_salario SMALLINT,
  renda_outros_text TEXT,

  -- acoes desenvolvidas
  acao_orientacao SMALLINT,
  acao_negligencia SMALLINT,
  acao_encaminhamento_rede SMALLINT,
  acao_outros SMALLINT,
  acao_encaminhamento_outros_text TEXT,

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

CREATE INDEX IF NOT EXISTS idx_pta_servicosocial_alta_id ON pta_servicosocial(alta_id);
