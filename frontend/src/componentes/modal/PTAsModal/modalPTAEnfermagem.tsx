import { Stethoscope, FileText, BookOpen } from "lucide-react"; // <-- ATUALIZADO
import ModalTemplate from "../modalTemplate";
// import ModalPTATemplate from "./modalPTATemplate"; // <-- REMOVIDO
import { useState, useRef } from "react";
// import parseModalPTATemplate from "./ptaFormUtils"; // <-- REMOVIDO

type ModalPTAEnfermagemProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedAlta?: any;
  isEditable?: boolean; 
  onSaved?: () => void;
};

export default function ModalPTAEnfermagem({ 
  isOpen, 
  onClose, 
  selectedAlta, 
  isEditable = true,
  onSaved
}: ModalPTAEnfermagemProps) {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!isEditable) return; 
    setIsSubmitting(true);
    try {
      const form = formRef.current;
      const payload: any = {
        alta_id: selectedAlta?.id_internacao ?? selectedAlta?.id ?? null,
        paciente_id: selectedAlta?.paciente_id ?? selectedAlta?.id_paciente ?? null,
        medico_id: selectedAlta?.medico_id ?? selectedAlta?.id_medico_responsavel ?? null,
      };

      if (form) {
        const fd = new FormData(form as HTMLFormElement);
  // data da alta
  payload.data_alta = fd.get('data_alta') ? String(fd.get('data_alta')) : null;
        // simples campos
        payload.glasgow = fd.get('glasgow') ? Number(fd.get('glasgow')) : null;
        payload.outros_texto = fd.get('outros_texto') ? String(fd.get('outros_texto')) : null;

        // checkboxes booleanos (específicos de Enfermagem)
        payload.ulcera = fd.has('needs_ulcera') ? 1 : 0;
        payload.sonda = fd.has('needs_sonda') ? 1 : 0;
        payload.oxigenio = fd.has('needs_oxigenio') ? 1 : 0;
        payload.curativo = fd.has('needs_curativo') ? 1 : 0;
        payload.estomas = fd.has('needs_estomas') ? 1 : 0;
        payload.traqueostomia = fd.has('needs_traqueostomia') ? 1 : 0;
        payload.aspiracao = fd.has('needs_aspiracao') ? 1 : 0;

        payload.para_curativos = fd.has('para_curativos') ? 1 : 0;
        payload.cuidados_sondas_estomas = fd.has('cuidados_sondas_estomas') ? 1 : 0;
        payload.orientacoes_dieta = fd.has('orientacoes_dieta') ? 1 : 0;
        payload.prevencao_ulcera = fd.has('prev_ulcera') ? 1 : 0;
        payload.aspiracao_vias = fd.has('aspiracao_vias') ? 1 : 0;
        payload.cuidados_pele = fd.has('cuidados_pele') ? 1 : 0;

        // --- LÓGICA DO TEMPLATE INTEGRADA ---
        // (Substitui parseModalPTATemplate e Object.assign)
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
        // --- FIM DA LÓGICA INTEGRADA ---
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

      const res = await fetch('http://localhost:3000/ptas/enfermagem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Erro ao salvar PTA Enfermagem', err);
      } else {
  onClose();
  if (typeof onSaved === 'function') onSaved();
      }
    } catch (err) {
      console.error('Erro ao salvar PTA Enfermagem', err);
    } finally {
      setIsSubmitting(false);
    }
  };


    return (
    <ModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      onClick={isEditable ? handleSave : onClose} // Atualizado para apenas fechar se não for editável
      isSubmitting={isSubmitting}
      TituloModal="Plano Terapêutico de Alta — Enfermagem"
      BtnText={isEditable ? "Salvar PTA" : "Fechar"} // Texto do botão dinâmico
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
                  readOnly={!isEditable}
                  defaultValue={selectedAlta?.paciente_nome ?? selectedAlta?.paciente ?? ''} 
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg p-2.5" 
                />
                <input name="paciente_id" type="hidden" value={selectedAlta?.paciente_id ?? selectedAlta?.id ?? ''} />
                <div className="mt-2">
                  <label className="block text-sm text-gray-600 dark:text-gray-300">Data da Alta</label>
                  <input
                    name="data_alta"
                    type="date"
                    defaultValue={selectedAlta?.data_alta ? new Date(selectedAlta.data_alta).toISOString().slice(0,10) : ''}
                    readOnly={!isEditable}
                    className="w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg p-2"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Médico</label>
                <input 
                  type="text" 
                  readOnly={!isEditable}
                  defaultValue={selectedAlta?.medico_nome ?? selectedAlta?.medico ?? ''} 
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg p-2.5" 
                />
                <input name="medico_id" type="hidden" value={selectedAlta?.medico_id ?? selectedAlta?.id_medico_responsavel ?? ''} />
                <input name="alta_id" type="hidden" value={selectedAlta?.id_internacao ?? selectedAlta?.id ?? ''} />
              </div>
            </div>
          </div>

          {/* ============ SEÇÃO ESPECÍFICA DA ENFERMAGEM (ANTIGO {children}) ============= */}
          <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <Stethoscope className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Enfermagem</h3>
            </div>

            <div className="mb-4">
              <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Nivel de Consciencia/Comportamento (Glasgow)</label>
              <input
                type="number"
                name="glasgow"
                placeholder="Nível de Glasgow"
                readOnly={!isEditable} 
                defaultValue={selectedAlta?.glasgow ?? ''}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              />
            </div>

            <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Paciente terá alta fazendo uso ou necessidade de:</label>
              <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              </div>
              <div className="block mb-2 text-base text-gray-900 dark:text-white">
                <label><input type="checkbox" name="needs_ulcera" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.ulcera)} className="dark:bg-gray-700 dark:border-gray-600" /> Cuidados com úlcera de pressão</label><br />
                <label><input type="checkbox" name="needs_sonda" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.sonda)} className="dark:bg-gray-700 dark:border-gray-600" /> Sonda vesical</label><br />
                <label><input type="checkbox" name="needs_oxigenio" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.oxigenio)} className="dark:bg-gray-700 dark:border-gray-600" /> Oxigenio</label><br />
                <label><input type="checkbox" name="needs_curativo" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.curativo)} className="dark:bg-gray-700 dark:border-gray-600" /> Curativo</label><br />
                <label><input type="checkbox" name="needs_estomas" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.estomas)} className="dark:bg-gray-700 dark:border-gray-600" /> Estomas</label><br />
                <label><input type="checkbox" name="needs_traqueostomia" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.traqueostomia)} className="dark:bg-gray-700 dark:border-gray-600" /> Traqueostomia</label><br />
                <label><input type="checkbox" name="needs_aspiracao" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.aspiracao)} className="dark:bg-gray-700 dark:border-gray-600" /> Aspiração (orotraqueal)</label><br />
                <label><input type="checkbox" name="needs_outros" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.outros_texto)} className="dark:bg-gray-700 dark:border-gray-600" /> Outros</label>
                <div className="mt-2">
                  <input name="outros_texto" type="text" placeholder="Especifique outros (se aplicável)" readOnly={!isEditable} defaultValue={selectedAlta?.outros_texto ?? ''} className="w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm rounded-lg p-2" />
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Paciente terá alta fazendo uso ou necessidade de:</label>
              <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              </div>

              <div>
                <div className="block mb-2 text-base text-gray-900 dark:text-white">
                  <label><input type="checkbox" name="para_curativos" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.para_curativos)} className="dark:bg-gray-700 dark:border-gray-600" /> Para curativos</label><br />
                  <label><input type="checkbox" name="cuidados_sondas_estomas" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.cuidados_sondas_estomas)} className="dark:bg-gray-700 dark:border-gray-600" /> Cuidados com sondas/estomas</label><br />
                  <label><input type="checkbox" name="orientacoes_dieta" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.orientacoes_dieta)} className="dark:bg-gray-700 dark:border-gray-600" /> Orientações da dieta assistida</label><br />
                  <label><input type="checkbox" name="prev_ulcera" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.prevencao_ulcera ?? selectedAlta?.prev_ulcera)} className="dark:bg-gray-700 dark:border-gray-600" /> Prevenção e cuidados com ulcera de pressão</label><br />
                  <label><input type="checkbox" name="aspiracao_vias" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.aspiracao_vias)} className="dark:bg-gray-700 dark:border-gray-600" /> Aspiração de vias aéreas e traqueostomias</label><br />
                  <label><input type="checkbox" name="cuidados_pele" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.cuidados_pele)} className="dark:bg-gray-700 dark:border-gray-600" /> Cuidados com a pele e higienização corporal</label>
                </div>
              </div>
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
                readOnly={!isEditable} // <-- ATUALIZADO
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
                readOnly={!isEditable} // <-- ATUALIZADO
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
                readOnly={!isEditable} // <-- ATUALIZADO
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
                readOnly={!isEditable} // <-- ATUALIZADO
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
                readOnly={!isEditable} // <-- ATUALIZADO
                defaultValue={selectedAlta?.descricao_orientacao ?? ''}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg p-2.5"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">Orientação fornecida a</label>
              <div className="flex flex-col gap-2 text-sm text-gray-900 dark:text-gray-200">
                {/* ATUALIZADO: Usando 'disabled' para checkboxes */}
                <label><input name="orientado_paciente" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.orientado_paciente)} className="mr-2" /> Paciente</label>
                <label><input name="orientado_familiar" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.orientado_familiar)} className="mr-2" /> Familiar</label>
                <label><input name="orientado_cuidador" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.orientado_cuidador)} className="mr-2" /> Cuidador</label>
                <label><input name="orientado_outros" type="checkbox" disabled={!isEditable} defaultChecked={Boolean(selectedAlta?.orientado_outros)} className="mr-2" /> Outros</label>
                  <input 
                    name="orientado_outros_descricao" 
                    type="text" 
                    placeholder="Se outros, especifique" 
                    readOnly={!isEditable} // <-- ATUALIZADO
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