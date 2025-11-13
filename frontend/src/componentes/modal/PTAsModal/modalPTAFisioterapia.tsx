import ModalTemplate from "../modalTemplate";
// import ModalPTATemplate from "./modalPTATemplate"; // <-- REMOVIDO
import { Stethoscope, FileText, BookOpen } from "lucide-react"; // <-- ATUALIZADO
import { useRef, useState } from "react";

type ModalPTAFisioterapiaProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedAlta?: any;
  isEditable?: boolean;
  onSaved?: () => void;
};

export default function ModalPTAFisioterapia({ isOpen, onClose, selectedAlta, isEditable = true, onSaved }: ModalPTAFisioterapiaProps) {
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
        // --- Campos Específicos da Fisioterapia ---
        payload.tosse_produtiva = fd.has('tosse_produtiva') ? 1 : 0;
        payload.tosse_inprodutiva = fd.has('tosse_inprodutiva') ? 1 : 0;
        payload.tosse_aspiracao = fd.has('tosse_aspiracao') ? 1 : 0;
        
        // Nota: O teu formulário original tem dois campos com name="outros_texto".
        // O FormData só vai pegar o valor do *primeiro* (o de Tosse).
        payload.tosse_outros_text = fd.get('outros_texto') ? String(fd.get('outros_texto')) : null; 
        
        payload.dependencia_banhar = fd.has('dependencia_banhar') ? 1 : 0;
        payload.dependencia_vestir = fd.has('dependencia_vestir') ? 1 : 0;
        payload.dependencia_banheiro = fd.has('dependencia_banheiro') ? 1 : 0;
        payload.dependencia_transferencia = fd.has('dependencia_transferencia') ? 1 : 0;
        payload.dependencia_continencia = fd.has('dependencia_continencia') ? 1 : 0;
        payload.dependencia_alimentacao = fd.has('dependencia_alimentacao') ? 1 : 0;
        
  // Collect altaNecessita checkboxes into an array (store as CSV string)
  const needs: string[] = [];
  if (fd.has('alta_neces_fisioterapia_motora')) needs.push('Fisioterapia Motora');
  if (fd.has('alta_neces_respiratoria')) needs.push('Respiratoria');
  if (fd.has('alta_neces_deambulacao')) needs.push('Deambulação Precoce');
  if (fd.has('alta_neces_outros')) needs.push('Outros');
  payload.alta_necessita = needs.length ? needs.join(', ') : null;
  payload.outros_texto_alta = fd.get('outros_texto_alta') ? String(fd.get('outros_texto_alta')) : null;
        
        payload.acoes_realizadas = fd.get('acoesRealizadas') ? String(fd.get('acoesRealizadas')) : null;

  // --- CAMPOS DO TEMPLATE (ADICIONADOS) ---
        // Esta lógica estava faltando no teu handleSave original
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
  // Alta date (optional) - sent to backend to update altas.data_alta
  payload.data_alta = fd.get('data_alta') ? String(fd.get('data_alta')) : null;
  // --- FIM DOS CAMPOS DO TEMPLATE ---
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

      const res = await fetch('http://localhost:3000/ptas/fisioterapia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Erro ao salvar PTA Fisioterapia', err);
      } else {
        onClose();
        if (typeof onSaved === 'function') onSaved();
      }
    } catch (err) {
      console.error('Erro ao salvar PTA Fisioterapia', err);
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
      TituloModal="Plano Terapêutico de Alta — Fisioterapia"
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

          {/* ============ SEÇÃO ESPECÍFICA DA FISIOTERAPIA (ANTIGO {children}) ============= */}
          <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <Stethoscope className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Fisioterapia</h3>
            </div>

            <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
              <div className="mb-8">
                <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Tosse</h3>
                </div>
                <div className="block mb-2 text-base text-gray-900 dark:text-white">
                    <label className="flex items-center mb-1"><input name="tosse_produtiva" type="checkbox" defaultChecked={Boolean(selectedAlta?.tosse_produtiva)} disabled={!isEditable} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Produtiva</span></label>
                    <label className="flex items-center mb-1"><input name="tosse_inprodutiva" type="checkbox" defaultChecked={Boolean(selectedAlta?.tosse_inprodutiva)} disabled={!isEditable} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Inprodutiva</span></label>
                    <label className="flex items-center mb-1"><input name="tosse_aspiracao" type="checkbox" defaultChecked={Boolean(selectedAlta?.tosse_aspiracao)} disabled={!isEditable} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Aspiração</span></label>
                    <div className="mt-2">
                    <input name="outros_texto" defaultValue={selectedAlta?.tosse_outros_text ?? selectedAlta?.outros_texto ?? ''} type="text" placeholder="Especifique outros (se aplicável)" readOnly={!isEditable} className="w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm rounded-lg p-2" />
                  </div>
                </div>
              </div>
            </div>


            <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
              <div className="mb-8">
                <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Níveis de dependência</h3>
                </div>
                <div className="block mb-2 text-base text-gray-900 dark:text-white">
                  <label className="flex items-center mb-1"><input name="dependencia_banhar" type="checkbox" defaultChecked={Boolean(selectedAlta?.dependencia_banhar)} disabled={!isEditable} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Banhar-se</span></label>
                  <label className="flex items-center mb-1"><input name="dependencia_vestir" type="checkbox" defaultChecked={Boolean(selectedAlta?.dependencia_vestir)} disabled={!isEditable} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Vestir-se</span></label>
                  <label className="flex items-center mb-1"><input name="dependencia_banheiro" type="checkbox" defaultChecked={Boolean(selectedAlta?.dependencia_banheiro)} disabled={!isEditable} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Ir ao Banheiro</span></label>
                  <label className="flex items-center mb-1"><input name="dependencia_transferencia" type="checkbox" defaultChecked={Boolean(selectedAlta?.dependencia_transferencia)} disabled={!isEditable} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Transferencia</span></label>
                  <label className="flex items-center mb-1"><input name="dependencia_continencia" type="checkbox" defaultChecked={Boolean(selectedAlta?.dependencia_continencia)} disabled={!isEditable} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Continencia</span></label>
                  <label className="flex items-center"><input name="dependencia_alimentacao" type="checkbox" defaultChecked={Boolean(selectedAlta?.dependencia_alimentacao)} disabled={!isEditable} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Alimentação</span></label>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
              <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Paciente terá alta necessitando de:</label>
              </div>
              <div className="block mb-2 text-base text-gray-900 dark:text-white">
                <label className="flex items-center mb-1"><input name="alta_neces_fisioterapia_motora" type="checkbox" defaultChecked={Boolean(selectedAlta?.alta_necessita?.includes?.('Fisioterapia Motora') || selectedAlta?.alta_necessita === 'Fisioterapia Motora')} disabled={!isEditable} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Fisioterapia Motora</span></label>
                <label className="flex items-center mb-1"><input name="alta_neces_respiratoria" type="checkbox" defaultChecked={Boolean(selectedAlta?.alta_necessita?.includes?.('Respiratoria') || selectedAlta?.alta_necessita === 'Respiratoria')} disabled={!isEditable} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Respiratória</span></label>
                <label className="flex items-center mb-1"><input name="alta_neces_deambulacao" type="checkbox" defaultChecked={Boolean(selectedAlta?.alta_necessita?.includes?.('Deambulação Precoce') || selectedAlta?.alta_necessita === 'Deambulação Precoce')} disabled={!isEditable} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Deambulação Precoce</span></label>
                <label className="flex items-center"><input name="alta_neces_outros" type="checkbox" defaultChecked={Boolean(selectedAlta?.alta_necessita?.includes?.('Outros') || selectedAlta?.alta_necessita === 'Outros')} disabled={!isEditable} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> <span className="ms-2">Outros</span></label>
                <div className="mt-2">
                  <input name="outros_texto_alta" defaultValue={selectedAlta?.outros_texto_alta ?? ''} type="text" placeholder="Especifique outros (se aplicável)" readOnly={!isEditable} className="w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm rounded-lg p-2" />
                  {/* ATENÇÃO: 'outros_texto_alta' separado do 'outros_texto' da Tosse */}
                </div>
              </div>
            </div>

            <div className="mt-4 mb-4">
              <label htmlFor="acoesRealizadas" className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Ações realizadas:</label>
                  <textarea name="acoesRealizadas" id="acoesRealizadas" rows={3} defaultValue={selectedAlta?.acoes_realizadas ?? ''} readOnly={!isEditable} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Descreva as ações realizadas durante a sessão de fisioterapia"></textarea>
            </div>
          </div>
          {/* ============ FIM DA SEÇÃO ESPECÍFICA ======================================== */}


          {/* Descrição do Caso Clínico */}
          <div className="mb-8">
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
                readOnly={!isEditable}
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
                <label><input name="orientado_paciente" type="checkbox"  defaultChecked={Boolean(selectedAlta?.orientado_paciente)} disabled={!isEditable}  className="mr-2" /> Paciente</label>
                <label><input name="orientado_familiar" type="checkbox" defaultChecked={Boolean(selectedAlta?.orientado_familiar)} disabled={!isEditable}  className="mr-2" /> Familiar</label>
                <label><input name="orientado_cuidador" type="checkbox" defaultChecked={Boolean(selectedAlta?.orientado_cuidador)} disabled={!isEditable}  className="mr-2" /> Cuidador</label>
                <label><input name="orientado_outros" type="checkbox" defaultChecked={Boolean(selectedAlta?.orientado_outros)} disabled={!isEditable}  className="mr-2" /> Outros</label>
                  <input 
                    name="orientado_outros_descricao" 
                    type="text" 
                    placeholder="Se outros, especifique" 
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