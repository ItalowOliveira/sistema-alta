import ModalTemplate from "../modalTemplate";
// import ModalPTATemplate from "./modalPTATemplate"; // <-- REMOVIDO
import { BookOpen, FileText } from "lucide-react"; // <-- ATUALIZADO
import { useRef, useState } from "react";

type ModalPTAPsicologiaProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedAlta?: any;
  isEditable?: boolean;
  onSaved?: () => void;
};
export default function ModalPTAPsicologia({ isOpen, onClose, selectedAlta, isEditable = true, onSaved }: ModalPTAPsicologiaProps) {
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
        // --- Campos Específicos da Psicologia ---
        payload.alteracoes_psicoemocionais = fd.has('alteracoes_psicoemocionais') ? 1 : 0;
        payload.baixa_adesao_tratamento = fd.has('baixa_adesao_tratamento') ? 1 : 0;
        payload.tentativa_suicidio = fd.has('tentativa_suicidio') ? 1 : 0;
        payload.suporte_emocional = fd.has('suporte_emocional') ? 1 : 0;
        payload.baixa_compreensao = fd.has('baixa_compreensao') ? 1 : 0;
        payload.necessidade_outro = fd.has('necessidade_outro') ? 1 : 0;
        payload.necessidade_outro_text = fd.get('necessidade_outro_text') ? String(fd.get('necessidade_outro_text')) : null;

        payload.acoes_intervencao_paciente = fd.has('acoes_intervencao_paciente') ? 1 : 0;
        payload.acoes_intervencao_familiares = fd.has('acoes_intervencao_familiares') ? 1 : 0;
        payload.acoes_orientacao_familiares = fd.has('acoes_orientacao_familiares') ? 1 : 0;
        payload.encaminhado_para = fd.get('encaminhado_para') ? String(fd.get('encaminhado_para')) : null;

        // --- Campos do Template (Já estavam corretos no seu código) ---
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

  const res = await fetch('http://localhost:3000/ptas/psicologia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Erro ao salvar PTA Psicologia', err);
      } else {
        onClose();
        if (typeof onSaved === 'function') onSaved();
      }
    } catch (err) {
      console.error('Erro ao salvar PTA Psicologia', err);
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
      TituloModal="Plano Terapêutico de Alta — Psicologia"
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
          </div>
          <div className="mb-4">
            <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Data da Alta</label>
            <input name="data_alta" type="date" defaultValue={selectedAlta?.data_alta ? new Date(selectedAlta.data_alta).toISOString().slice(0,10) : ''} readOnly={!isEditable} className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg p-2" />
          </div>

          {/* ============ SEÇÃO ESPECÍFICA DA PSICOLOGIA (ANTIGO {children}) ============= */}
          <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
            <BookOpen className="text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Psicologia</h3>
          </div>

          <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
            <div className="mb-8">
              <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
                <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">Indicadores de necessidade de suporte psicológico</label>
              </div>
              <div className="block mb-2 text-base text-gray-900 dark:text-white">
                <label className="flex items-center mb-1"><input name="alteracoes_psicoemocionais" type="checkbox" defaultChecked={Boolean(selectedAlta?.alteracoes_psicoemocionais)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Alterações psicoemocianais</span></label>
                <label className="flex items-center mb-1"><input name="baixa_adesao_tratamento" type="checkbox" defaultChecked={Boolean(selectedAlta?.baixa_adesao_tratamento)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Baixa adesão de tratamento</span></label>
                <label className="flex items-center mb-1"><input name="tentativa_suicidio" type="checkbox" defaultChecked={Boolean(selectedAlta?.tentativa_suicidio)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Tentativa de suicídio</span></label>
                <label className="flex items-center mb-1"><input name="suporte_emocional" type="checkbox" defaultChecked={Boolean(selectedAlta?.suporte_emocional)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Suporte emocional para patologia confirmadas</span></label>
                <label className="flex items-center mb-1"><input name="baixa_compreensao" type="checkbox" defaultChecked={Boolean(selectedAlta?.baixa_compreensao)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Baixo nivel de compreensão processo doença x saúde</span></label>
                <label className="flex items-center mb-1"><input name="necessidade_outro" type="checkbox" defaultChecked={Boolean(selectedAlta?.necessidade_outro)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Outros</span></label>
                  <div className="mt-2">
                  <input name="necessidade_outro_text" type="text" placeholder="Especifique outros (se aplicável)" defaultValue={selectedAlta?.necessidade_outro_text ?? ''} readOnly={!isEditable} className="w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm rounded-lg p-2" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">Ações desenvolvidas</label>
            </div>
            <div className="block mb-2 text-base text-gray-900 dark:text-white">
              <label className="flex items-center mb-1"><input name="acoes_intervencao_paciente" type="checkbox" defaultChecked={Boolean(selectedAlta?.acoes_intervencao_paciente)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Intervenções com o paciente</span></label>
              <label className="flex items-center mb-1"><input name="acoes_intervencao_familiares" type="checkbox" defaultChecked={Boolean(selectedAlta?.acoes_intervencao_familiares)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Intervenções com os familiares</span></label>
              <label className="flex items-center mb-1"><input name="acoes_orientacao_familiares" type="checkbox" defaultChecked={Boolean(selectedAlta?.acoes_orientacao_familiares)} disabled={!isEditable} className="w-4 h-4 ..." /> <span className="ms-2">Orientação aos familiares</span></label>
                <div className="mt-2">
                  <input name="encaminhado_para" type="text" placeholder="Encaminhado Para:" defaultValue={selectedAlta?.encaminhado_para ?? ''} readOnly={!isEditable} className="w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm rounded-lg p-2" />
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
                readOnly={!isEditable} 
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
                readOnly={!isEditable} 
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
                readOnly={!isEditable} 
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
                readOnly={!isEditable} 
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
                readOnly={!isEditable} 
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