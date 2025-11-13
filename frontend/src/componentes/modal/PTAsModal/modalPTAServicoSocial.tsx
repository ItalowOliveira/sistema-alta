import ModalTemplate from "../modalTemplate";
// import ModalPTATemplate from "./modalPTATemplate"; // <-- REMOVIDO
import { Users, FileText, BookOpen } from "lucide-react"; // <-- ATUALIZADO
import { useRef, useState } from "react";

type ModalPTAServicoSocialProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedAlta?: any;
  isEditable?: boolean;
  onSaved?: () => void;
};
export default function ModalPTAServicoSocial({ isOpen, onClose, selectedAlta, isEditable = true, onSaved }: ModalPTAServicoSocialProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  if (!isOpen) return null;

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      if (!isEditable) return onClose();
      const payload: any = {
        alta_id: selectedAlta?.id_internacao ?? selectedAlta?.id ?? null,
        paciente_id: selectedAlta?.paciente_id ?? selectedAlta?.id_paciente ?? null,
        medico_id: selectedAlta?.medico_id ?? selectedAlta?.id_medico_responsavel ?? null,
      };

      const form = formRef.current;
      if (form) {
        const fd = new FormData(form as HTMLFormElement);
        // mora
        payload.mora_sozinho = fd.has('mora_sozinho') ? 1 : 0;
        payload.mora_conjuge = fd.has('mora_conjuge') ? 1 : 0;
        payload.mora_filho = fd.has('mora_filho') ? 1 : 0;
        payload.mora_nora_genro = fd.has('mora_nora_genro') ? 1 : 0;
        payload.mora_irmao = fd.has('mora_irmao') ? 1 : 0;
        payload.mora_institucionalizado = fd.has('mora_institucionalizado') ? 1 : 0;
        payload.mora_outros_text = fd.get('mora_outros_text') ? String(fd.get('mora_outros_text')) : null;

        // pos alta
        payload.posalta_sozinho = fd.has('posalta_sozinho') ? 1 : 0;
        payload.posalta_conjuge = fd.has('posalta_conjuge') ? 1 : 0;
        payload.posalta_filho = fd.has('posalta_filho') ? 1 : 0;
        payload.posalta_nora_genro = fd.has('posalta_nora_genro') ? 1 : 0;
        payload.posalta_irmao = fd.has('posalta_irmao') ? 1 : 0;
        payload.posalta_institucionalizado = fd.has('posalta_institucionalizado') ? 1 : 0;
        payload.posalta_outros_text = fd.get('posalta_outros_text') ? String(fd.get('posalta_outros_text')) : null;

        // familiar
        payload.familiar_responsavel = fd.get('familiar_responsavel') ? String(fd.get('familiar_responsavel')) : null;
        payload.familiar_telefone = fd.get('familiar_telefone') ? String(fd.get('familiar_telefone')) : null;

        // renda
        payload.renda_aposentadoria = fd.has('renda_aposentadoria') ? 1 : 0;
        payload.renda_bolsa_familia = fd.has('renda_bolsa_familia') ? 1 : 0;
        payload.renda_pensao = fd.has('renda_pensao') ? 1 : 0;
        payload.renda_bpc = fd.has('renda_bpc') ? 1 : 0;
        payload.renda_salario = fd.has('renda_salario') ? 1 : 0;
        payload.renda_outros_text = fd.get('renda_outros_text') ? String(fd.get('renda_outros_text')) : null;

        // ações
        payload.acao_orientacao = fd.has('acao_orientacao') ? 1 : 0;
        payload.acao_negligencia = fd.has('acao_negligencia') ? 1 : 0;
        payload.acao_encaminhamento_rede = fd.has('acao_encaminhamento_rede') ? 1 : 0;
        payload.acao_outros = fd.has('acao_outros') ? 1 : 0;
        payload.acao_encaminhamento_outros_text = fd.get('acao_encaminhamento_outros_text') ? String(fd.get('acao_encaminhamento_outros_text')) : null;

        // template (Estes já estavam corretos no teu código)
        payload.dados_iniciais = fd.get('dados_iniciais') ? String(fd.get('dados_iniciais')) : null;
        payload.dados_internacao = fd.get('dados_internacao') ? String(fd.get('dados_internacao')) : null;
        payload.informacao_alta = fd.get('informacao_alta') ? String(fd.get('informacao_alta')) : null;
        payload.tipo_orientacao = fd.get('tipo_orientacao') ? String(fd.get('tipo_orientacao')) : null;
        payload.descricao_orientacao = fd.get('descricao_orientacao') ? String(fd.get('descricao_orientacao')) : null;
        payload.orientado_paciente = fd.has('orientado_paciente') ? 1 : 0;
        payload.orientado_familiar = fd.has('orientado_familiar') ? 1 : 0;
        payload.orientado_cuidador = fd.has('orientado_cuidador') ? 1 : 0;
        payload.orientado_outros = fd.has('orientado_outros') ? 1 : 0;
        payload.orientado_outros_descricao = fd.get('orientado_outros_descricao') ? String(fd.get('orientado_outros_descricao')) : null;
  // Alta date (optional)
  payload.data_alta = fd.get('data_alta') ? String(fd.get('data_alta')) : null;
      }
      // Validação de data: data_alta não pode ser anterior à data_internacao
      try {
        const provided = payload.data_alta ? new Date(String(payload.data_alta)) : null;
        const internacao = selectedAlta?.data_internacao ? new Date(String(selectedAlta.data_internacao)) : null;
        if (provided && internacao && provided < internacao) {
          console.error('Data da alta inválida: anterior à internação');
          return; // abort save
        }
      } catch (e) {
        // ignore
      }

  const res = await fetch('http://localhost:3000/ptas/servicosocial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Erro ao salvar PTA Servico Social', err);
      } else {
        onClose();
        if (typeof onSaved === 'function') onSaved();
      }
    } catch (err) {
      console.error('Erro ao salvar PTA Servico Social', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      onClick={isEditable ? handleSave : onClose}
      isSubmitting={isSubmitting}
      TituloModal="Plano Terapêutico de Alta — Serviço Social"
      BtnText={isEditable ? 'Salvar PTA' : 'Fechar'}
      Conteudo={
        <form ref={formRef}>
          {/* ====================================================================== */}
          {/* ============ INÍCIO DO CÓDIGO DO TEMPLATE INJETADO =================== */}
          {/* ====================================================================== */}

          {/* Dados do Paciente */}
          <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Dados do Paciente</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Paciente</label>
                <input 
                  type="text" 
                  readOnly // Sempre read-only
                  defaultValue={selectedAlta?.paciente_nome ?? selectedAlta?.paciente ?? ''} 
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg p-2.5" 
                />
                <input name="paciente_id" type="hidden" value={selectedAlta?.paciente_id ?? selectedAlta?.id ?? ''} />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Médico</label>
                <input 
                  type="text" 
                  readOnly // Sempre read-only
                  defaultValue={selectedAlta?.medico_nome ?? selectedAlta?.medico ?? ''} 
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg p-2.5" 
                />
                <input name="medico_id" type="hidden" value={selectedAlta?.medico_id ?? selectedAlta?.id_medico_responsavel ?? ''} />
                <input name="alta_id" type="hidden" value={selectedAlta?.id_internacao ?? selectedAlta?.id ?? ''} />
              </div>
            </div>
          <div className="mb-4">
            <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Data da Alta</label>
            <input name="data_alta" type="date" defaultValue={selectedAlta?.data_alta ? new Date(selectedAlta.data_alta).toISOString().slice(0,10) : ''} readOnly={!isEditable} className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg p-2" />
          </div>
          </div>

          {/* ============ SEÇÃO ESPECÍFICA DO SERVIÇO SOCIAL (ANTIGO {children}) ============= */}
          <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
            <Users className="text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Serviço Social</h3>
          </div>

          <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">

            {/* Mora com alguém */}
            <div className="mb-6">
              <div className="flex items-center gap-3 border-b border-blue-300 dark:border-blue-700 pb-2 mb-3">
                <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">Mora com alguém</label>
              </div>
              <div className="block text-base text-gray-900 dark:text-white">
                <label className="flex items-center mb-1"><input name="mora_sozinho" type="checkbox" defaultChecked={Boolean(selectedAlta?.mora_sozinho)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Sozinho</span></label>
                <label className="flex items-center mb-1"><input name="mora_conjuge" type="checkbox" defaultChecked={Boolean(selectedAlta?.mora_conjuge)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Cônjuge</span></label>
                <label className="flex items-center mb-1"><input name="mora_filho" type="checkbox" defaultChecked={Boolean(selectedAlta?.mora_filho)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Filho(a)</span></label>
                <label className="flex items-center mb-1"><input name="mora_nora_genro" type="checkbox" defaultChecked={Boolean(selectedAlta?.mora_nora_genro)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Nora/Genro</span></label>
                <label className="flex items-center mb-1"><input name="mora_irmao" type="checkbox" defaultChecked={Boolean(selectedAlta?.mora_irmao)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Irmão(ã)</span></label>
                <label className="flex items-center mb-1"><input name="mora_institucionalizado" type="checkbox" defaultChecked={Boolean(selectedAlta?.mora_institucionalizado)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Institucionalizado</span></label>
                <div className="mt-2">
                  <input name="mora_outros_text" type="text" placeholder="Outros" defaultValue={selectedAlta?.mora_outros_text ?? ''} readOnly={!isEditable} className="w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm rounded-lg p-2" />
                </div>
              </div>
            </div>

            {/* Pós-alta residirá com */}
            <div className="mb-6">
              <div className="flex items-center gap-3 border-b border-blue-300 dark:border-blue-700 pb-2 mb-3">
                <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">Pós-alta residirá com</label>
              </div>
              <div className="block text-base text-gray-900 dark:text-white">
                <label className="flex items-center mb-1"><input name="posalta_sozinho" type="checkbox" defaultChecked={Boolean(selectedAlta?.posalta_sozinho)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Sozinho</span></label>
                <label className="flex items-center mb-1"><input name="posalta_conjuge" type="checkbox" defaultChecked={Boolean(selectedAlta?.posalta_conjuge)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Cônjuge</span></label>
                <label className="flex items-center mb-1"><input name="posalta_filho" type="checkbox" defaultChecked={Boolean(selectedAlta?.posalta_filho)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Filho(a)</span></label>
                <label className="flex items-center mb-1"><input name="posalta_nora_genro" type="checkbox" defaultChecked={Boolean(selectedAlta?.posalta_nora_genro)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Nora/Genro</span></label>
                <label className="flex items-center mb-1"><input name="posalta_irmao" type="checkbox" defaultChecked={Boolean(selectedAlta?.posalta_irmao)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Irmão(ã)</span></label>
                <label className="flex items-center mb-1"><input name="posalta_institucionalizado" type="checkbox" defaultChecked={Boolean(selectedAlta?.posalta_institucionalizado)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Institucionalizado</span></label>
                <div className="mt-2">
                  <input name="posalta_outros_text" type="text" placeholder="Outros" defaultValue={selectedAlta?.posalta_outros_text ?? ''} readOnly={!isEditable} className="w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm rounded-lg p-2" />
                </div>
              </div>
            </div>

            {/* Familiar responsável / referência */}
            <div className="mb-6">
              <div className="flex items-center gap-3 border-b border-blue-300 dark:border-blue-700 pb-2 mb-3">
                <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">Familiar responsável / referência</label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 text-base text-gray-900 dark:text-white">
                <input name="familiar_responsavel" type="text" placeholder="Nome" defaultValue={selectedAlta?.familiar_responsavel ?? ''} readOnly={!isEditable} className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm rounded-lg p-2" />
                <input name="familiar_telefone" type="text" placeholder="Fone" defaultValue={selectedAlta?.familiar_telefone ?? ''} readOnly={!isEditable} className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm rounded-lg p-2" />
              </div>
            </div>

            {/* Renda proveniente de */}
            <div className="mb-6">
              <div className="flex items-center gap-3 border-b border-blue-300 dark:border-blue-700 pb-2 mb-3">
                <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">Renda proveniente de</label>
              </div>
              <div className="block text-base text-gray-900 dark:text-white">
                <label className="flex items-center mb-1"><input name="renda_aposentadoria" type="checkbox" defaultChecked={Boolean(selectedAlta?.renda_aposentadoria)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Aposentadoria</span></label>
                <label className="flex items-center mb-1"><input name="renda_bolsa_familia" type="checkbox" defaultChecked={Boolean(selectedAlta?.renda_bolsa_familia)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Bolsa Família</span></label>
                <label className="flex items-center mb-1"><input name="renda_pensao" type="checkbox" defaultChecked={Boolean(selectedAlta?.renda_pensao)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Pensão</span></label>
                <label className="flex items-center mb-1"><input name="renda_bpc" type="checkbox" defaultChecked={Boolean(selectedAlta?.renda_bpc)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">BPC</span></label>
                <label className="flex items-center mb-1"><input name="renda_salario" type="checkbox" defaultChecked={Boolean(selectedAlta?.renda_salario)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Salário</span></label>
                <div className="mt-2">
                  <input name="renda_outros_text" type="text" placeholder="Outros" defaultValue={selectedAlta?.renda_outros_text ?? ''} readOnly={!isEditable} className="w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm rounded-lg p-2" />
                </div>
              </div>
            </div>

            {/* Ações desenvolvidas */}
            <div>
              <div className="flex items-center gap-3 border-b border-blue-300 dark:border-blue-700 pb-2 mb-3">
                <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">Ações desenvolvidas</label>
              </div>
              <div className="block text-base text-gray-900 dark:text-white">
                <label className="flex items-center mb-1"><input name="acao_orientacao" type="checkbox" defaultChecked={Boolean(selectedAlta?.acao_orientacao)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Orientação sobre direitos / previdência</span></label>
                <label className="flex items-center mb-1"><input name="acao_negligencia" type="checkbox" defaultChecked={Boolean(selectedAlta?.acao_negligencia)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Situação de negligência / violência</span></label>
                <label className="flex items-center mb-1"><input name="acao_encaminhamento_rede" type="checkbox" defaultChecked={Boolean(selectedAlta?.acao_encaminhamento_rede)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Encaminhamento para rede básica de saúde</span></label>
                <label className="flex items-center mb-1"><input name="acao_outros" type="checkbox" defaultChecked={Boolean(selectedAlta?.acao_outros)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Outros</span></label>
                <div className="mt-2">
                  <input name="acao_encaminhamento_outros_text" type="text" placeholder="Encaminhamento para" defaultValue={selectedAlta?.acao_encaminhamento_outros_text ?? ''} readOnly={!isEditable} className="w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm rounded-lg p-2" />
                  
                </div>
              </div>
            </div>
          </div>
          {/* ============ FIM DA SEÇÃO ESPECÍFICA ======================================== */}


          {/* Descrição do Caso Clínico */}
          <div className="mb-8 mt-8"> {/* Adicionado mt-8 para separar */}
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <FileText className="text-blue-500" />
              <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200">Descrição do Caso Clínico</h4>
            </div>
          </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">Dados Iniciais (Estado clínico inicial)</label>
              <textarea 
                name="dados_iniciais" 
                rows={3} 
                placeholder="Descreva o estado clínico inicial do paciente." 
                defaultValue={selectedAlta?.dados_iniciais ?? ''}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg p-2.5"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">Dados da Internação (Tratamentos oferecidos)</label>
              <textarea 
                name="dados_internacao" 
                rows={3} 
                placeholder="Descreva os tratamentos realizados durante a internação." 
                defaultValue={selectedAlta?.dados_internacao ?? ''}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg p-2.5"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">Informação de Alta (Evolução do paciente)</label>
              <textarea 
                name="informacao_alta" 
                rows={3} 
                placeholder="Descreva a evolução do paciente até a alta." 
                defaultValue={selectedAlta?.informacao_alta ?? ''}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg p-2.5"
              ></textarea>
            </div>


          {/* Orientação para alta qualificada */}
          <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <BookOpen className="text-blue-500" />
              <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200">Orientação para alta qualificada</h4>
            </div>
          </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">Tipo de orientação fornecida</label>
              <textarea 
                name="tipo_orientacao" 
                rows={1} 
                placeholder="Tipo de orientação" 
                defaultValue={selectedAlta?.tipo_orientacao ?? ''}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg p-2.5"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">Descrição da orientação fornecida</label>
              <textarea 
                name="descricao_orientacao" 
                rows={3} 
                placeholder="Descreva a orientação que foi fornecida." 
                defaultValue={selectedAlta?.descricao_orientacao ?? ''}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg p-2.5"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">Orientação fornecida a</label>
              <div className="flex flex-col gap-2 text-sm text-gray-900 dark:text-gray-200">
                <label><input name="orientado_paciente" type="checkbox" defaultChecked={Boolean(selectedAlta?.orientado_paciente)} disabled={!isEditable} className="mr-2" /> Paciente</label>
                <label><input name="orientado_familiar" type="checkbox" defaultChecked={Boolean(selectedAlta?.orientado_familiar)} disabled={!isEditable} className="mr-2" /> Familiar</label>
                <label><input name="orientado_cuidador" type="checkbox" defaultChecked={Boolean(selectedAlta?.orientado_cuidador)} disabled={!isEditable} className="mr-2" /> Cuidador</label>
                <label><input name="orientado_outros" type="checkbox" defaultChecked={Boolean(selectedAlta?.orientado_outros)} disabled={!isEditable} className="mr-2" /> Outros</label>
                  <input 
                    name="orientado_outros_descricao" 
                    type="text" 
                    placeholder="Se outros, especifique" 
                    defaultValue={selectedAlta?.orientado_outros_descricao ?? ''}
                    readOnly={!isEditable}
                    className="mt-2 w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg p-2.5" 
                  />
              </div>
            </div>

          {/* ====================================================================== */}
          {/* ================ FIM DO CÓDIGO DO TEMPLATE INJETADO ================== */}
          {/* ====================================================================== */}
        </form>
      }
    />
  );
}