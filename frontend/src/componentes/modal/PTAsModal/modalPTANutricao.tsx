import ModalTemplate from "../modalTemplate";
import { Stethoscope, FileText, BookOpen } from "lucide-react"; // Importações atualizadas
import { useRef, useState } from "react";
// A importação do ModalPTATemplate foi removida

type ModalPTANutricaoProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedAlta?: any;
  isEditable?: boolean;
  onSaved?: () => void;
};

export default function ModalPTANutricao({ isOpen, onClose, selectedAlta, isEditable = true, onSaved }: ModalPTANutricaoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  if (!isOpen) return null;

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const payload: any = {
        alta_id: selectedAlta?.id_internacao ?? selectedAlta?.id ?? null,
        paciente_id: selectedAlta?.paciente_id ?? selectedAlta?.id_paciente ?? null,
        medico_id: selectedAlta?.medico_id ?? selectedAlta?.id_medico_responsavel ?? null,
      };

      const form = formRef.current;
      if (form) {
        const fd = new FormData(form as HTMLFormElement);
        // indicadores
        payload.inapetencia = fd.has('inapetencia') ? 1 : 0;
        payload.desnutricao = fd.has('desnutricao') ? 1 : 0;
        payload.risco_desnutricao = fd.has('risco_desnutricao') ? 1 : 0;
        payload.sobrepeso = fd.has('sobrepeso') ? 1 : 0;
        payload.obesidade = fd.has('obesidade') ? 1 : 0;
        payload.npt = fd.has('npt') ? 1 : 0;
        payload.indicadores_outros = fd.get('indicadores_outros') ? String(fd.get('indicadores_outros')) : null;

        // necessidade
        payload.necessidade_oral = fd.has('necessidade_oral') ? 1 : 0;
        payload.necessidade_oral_assistida = fd.has('necessidade_oral_assistida') ? 1 : 0;
        payload.necessidade_enteral = fd.has('necessidade_enteral') ? 1 : 0;
        payload.necessidade_outro = fd.has('necessidade_outro') ? 1 : 0;
        payload.necessidade_outro_text = fd.get('necessidade_outro_text') ? String(fd.get('necessidade_outro_text')) : null;

        // ações
        payload.acoes_orientacao_enteral = fd.has('acoes_orientacao_enteral') ? 1 : 0;
        payload.acoes_encaminhamento = fd.has('acoes_encaminhamento') ? 1 : 0;
        payload.acoes_rede_basica = fd.has('acoes_rede_basica') ? 1 : 0;
        payload.acoes_outro = fd.has('acoes_outro') ? 1 : 0;
        payload.acoes_outro_text = fd.get('acoes_outro_text') ? String(fd.get('acoes_outro_text')) : null;

        // --- CAMPOS DO TEMPLATE (JÁ ESTAVAM AQUI) ---
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

      const res = await fetch('http://localhost:3000/ptas/nutricao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Erro ao salvar PTA Nutricao', err);
      } else {
        onClose();
        if (typeof onSaved === 'function') onSaved();
      }
    } catch (err) {
      console.error('Erro ao salvar PTA Nutricao', err);
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
      TituloModal="Plano Terapêutico de Alta — Nutrição"
      BtnText={isEditable ? "Salvar PTA" : "Fechar"}
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
                  readOnly // Paciente e Médico são apenas para visualização
                  defaultValue={selectedAlta?.paciente_nome ?? selectedAlta?.paciente ?? ''} 
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg p-2.5" 
                />
                <input name="paciente_id" type="hidden" value={selectedAlta?.paciente_id ?? selectedAlta?.id ?? ''} />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Médico</label>
                <input 
                  type="text" 
                  readOnly // Paciente e Médico são apenas para visualização
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

          {/* ============ SEÇÃO ESPECÍFICA DA NUTRIÇÃO (ANTIGO {children}) ============= */}
          <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
            <Stethoscope className="text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Nutrição</h3>
          </div>

          <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Indicadores de necessidade nutricional:</label>
            <div className="block mb-2 text-base text-gray-900 dark:text-white">
              <label className="flex items-center mb-1"><input name="inapetencia" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.inapetencia)} className="w-4 h-4 ..." /> <span className="ms-2">Inapetência</span></label>
              <label className="flex items-center mb-1"><input name="desnutricao" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.desnutricao)} className="w-4 h-4 ..." /> <span className="ms-2">Desnutrição</span></label>
              <label className="flex items-center mb-1"><input name="risco_desnutricao" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.risco_desnutricao)} className="w-4 h-4 ..." /> <span className="ms-2">Risco de desnutrição</span></label>
              <label className="flex items-center mb-1"><input name="sobrepeso" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.sobrepeso)} className="w-4 h-4 ..." /> <span className="ms-2">Sobrepeso</span></label>
              <label className="flex items-center mb-1"><input name="obesidade" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.obesidade)} className="w-4 h-4 ..." /> <span className="ms-2">Obesidade</span></label>
              <label className="flex items-center"><input name="npt" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.npt)} className="w-4 h-4 ..." /> <span className="ms-2">NPT</span></label>
              <label className="flex items-center"><input name="indicadores_outros" type="text" readOnly={!isEditable} defaultValue={selectedAlta?.indicadores_outros ?? ''} className="w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm rounded-lg p-2" placeholder="Outros (especifique)" /></label>
            </div>
          </div>

          <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Paciente terá alta fazendo uso ou necessidade de:</label>
            <div className="block mb-2 text-base text-gray-900 dark:text-white">
              <label className="flex items-center mb-1"><input name="necessidade_oral" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.necessidade_oral)} className="w-4 h-4 ..." /> <span className="ms-2">Oral</span></label>
              <label className="flex items-center mb-1"><input name="necessidade_oral_assistida" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.necessidade_oral_assistida)} className="w-4 h-4 ..." /> <span className="ms-2">Oral assistida</span></label>
              <label className="flex items-center"><input name="necessidade_enteral" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.necessidade_enteral)} className="w-4 h-4 ..." /> <span className="ms-2">Enteral</span></label>
              <label className="flex items-center"><input name="necessidade_outro" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.necessidade_outro)} className="w-4 h-4 ..." /> <span className="ms-2">Outro</span></label>
              <div className="mt-2">
                <input name="necessidade_outro_text" type="text" placeholder="Especifique outros (se aplicável)" readOnly={!isEditable} defaultValue={selectedAlta?.necessidade_outro_text ?? ''} className="w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm rounded-lg p-2" />
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ações desenvolvidas:</label>
            <div className="block mb-2 text-base text-gray-900 dark:text-white">
              <label className="flex items-center mb-1"><input name="acoes_orientacao_enteral" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.acoes_orientacao_enteral)} className="w-4 h-4 ..." /> <span className="ms-2">Orientação para administração de dieta enteral</span></label>
              <label className="flex items-center mb-1"><input name="acoes_encaminhamento" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.acoes_encaminhamento)} className="w-4 h-4 ..." /> <span className="ms-2">Encaminhamento</span></label>
              <label className="flex items-center"><input name="acoes_rede_basica" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.acoes_rede_basica)} className="w-4 h-4 ..." /> <span className="ms-2">Contato com a rede básica</span></label>
              <label className="flex items-center"><input name="acoes_outro" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.acoes_outro)} className="w-4 h-4 ..." /> <span className="ms-2">Outro</span></label>
              <div className="mt-2">
                <input name="acoes_outro_text" type="text" placeholder="Especifique (se aplicável)" readOnly={!isEditable} defaultValue={selectedAlta?.acoes_outro_text ?? ''} className="w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm rounded-lg p-2" />
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
                readOnly={!isEditable}
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
                readOnly={!isEditable}
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
                readOnly={!isEditable}
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
                readOnly={!isEditable}
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
                readOnly={!isEditable}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg p-2.5"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">Orientação fornecida a</label>
                <div className="flex flex-col gap-2 text-sm text-gray-900 dark:text-gray-200">
                <label><input name="orientado_paciente" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.orientado_paciente)} className="mr-2" /> Paciente</label>
                <label><input name="orientado_familiar" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.orientado_familiar)} className="mr-2" /> Familiar</label>
                <label><input name="orientado_cuidador" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.orientado_cuidador)} className="mr-2" /> Cuidador</label>
                <label><input name="orientado_outros" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.orientado_outros)} className="mr-2" /> Outros</label>
                  <input 
                    name="orientado_outros_descricao" 
                    type="text" 
                    placeholder="Se outros, especifique" 
                    readOnly={!isEditable}
                    defaultValue={selectedAlta?.orientado_outros_descricao ?? ''}
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