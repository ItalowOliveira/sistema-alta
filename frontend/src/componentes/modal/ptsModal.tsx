import { useState, useEffect, memo } from "react";
import { User, CalendarClock, Stethoscope, HeartPulse, ClipboardList, Clock, Activity } from "lucide-react";
import ModalTemplate from "./modalTemplate";
import { criarPTS } from "../../api/ptsApi";

type PtsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedAlta?: any | null;
  viewOnly?: boolean;
  initialData?: any | null;
  onSaved?: () => void;
};

type AvaliacaoProps = {
  pa: string;
  setPa: (v: string) => void;
  fc: string;
  setFc: (v: string) => void;
  fr: string;
  setFr: (v: string) => void;
  sato2: string;
  setSato2: (v: string) => void;
  inspecaoPalpacao: string;
  setInspecaoPalpacao: (v: string) => void;
  avaliacaoFisica: string;
  setAvaliacaoFisica: (v: string) => void;
  grauMobilidade: string;
  setGrauMobilidade: (v: string) => void;
  forcaSensibilidade: string;
  setForcaSensibilidade: (v: string) => void;
  nivelDependencia: string;
  setNivelDependencia: (v: string) => void;
};

type AvaliacaoPropsWithReadOnly = AvaliacaoProps & { readOnly?: boolean };

const AvaliacaoFisioterapeutica = memo(function AvaliacaoFisioterapeutica(props: AvaliacaoPropsWithReadOnly) {
  return (
    <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-gray-800/20">
      <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
        <Activity className="text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Avaliação Fisioterapêutica</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">PA</label>
          <input readOnly={props.readOnly} disabled={props.readOnly} value={props.pa} onChange={(e) => props.setPa(e.target.value)} type="text" placeholder="113/90 mmHg" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
        </div>
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">FC</label>
          <input readOnly={props.readOnly} disabled={props.readOnly} value={props.fc} onChange={(e) => props.setFc(e.target.value)} type="text" placeholder="100 bpm" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
        </div>
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">SatO2</label>
          <input readOnly={props.readOnly} disabled={props.readOnly} value={props.sato2} onChange={(e) => props.setSato2(e.target.value)} type="text" placeholder="97%" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Inspeção e palpação</label>
          <textarea readOnly={props.readOnly} value={props.inspecaoPalpacao} onChange={(e) => props.setInspecaoPalpacao(e.target.value)} rows={3} placeholder="Ao chegar no leito, paciente se..." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
        </div>
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Avaliação Física</label>
          <textarea readOnly={props.readOnly} value={props.avaliacaoFisica} onChange={(e) => props.setAvaliacaoFisica(e.target.value)} rows={3} placeholder="Descreva a avaliação física..." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
        </div>
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Grau de Mobilidade</label>
          <textarea readOnly={props.readOnly} value={props.grauMobilidade} onChange={(e) => props.setGrauMobilidade(e.target.value)} rows={3} placeholder="mobilidade de MMSS preservadas..." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
        </div>
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Força e sensibilidade</label>
          <textarea readOnly={props.readOnly} value={props.forcaSensibilidade} onChange={(e) => props.setForcaSensibilidade(e.target.value)} rows={3} placeholder="de MMSS preservadas." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
        </div>
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Nível de dependência</label>
          <textarea readOnly={props.readOnly} value={props.nivelDependencia} onChange={(e) => props.setNivelDependencia(e.target.value)} rows={3} placeholder="semi-dependente..." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
        </div>
      </div>
    </div>
  );
});


export default function ModalPtsTemplate({ isOpen, onClose, selectedAlta, viewOnly, initialData, onSaved }: PtsModalProps) {
  const [professional, setProfessional] = useState('');
  const [pacienteSelecionado, setPacienteSelecionado] = useState("");
  const [pacienteNome, setPacienteNome] = useState("");
  const [medicoSelecionado, setMedicoSelecionado] = useState("");
  const [medicoNome, setMedicoNome] = useState("");
  const [pa, setPa] = useState("");
  const [fc, setFc] = useState("");
  const [fr, setFr] = useState("");
  const [sato2, setSato2] = useState("");
  const [inspecaoPalpacao, setInspecaoPalpacao] = useState("");
  const [avaliacaoFisica, setAvaliacaoFisica] = useState("");
  const [grauMobilidade, setGrauMobilidade] = useState("");
  const [forcaSensibilidade, setForcaSensibilidade] = useState("");
  const [nivelDependencia, setNivelDependencia] = useState("");
  const [medicamentosUsoContinuo, setMedicamentosUsoContinuo] = useState("");
  const [historiaPregressa, setHistoriaPregressa] = useState("");
  const [avaliacaoGeral, setAvaliacaoGeral] = useState("");
  const [acoesCurtoPrazo, setAcoesCurtoPrazo] = useState("");
  const [acoesMedioPrazo, setAcoesMedioPrazo] = useState("");
  const [acoesLongoPrazo, setAcoesLongoPrazo] = useState("");
  const [dataAlta, setDataAlta] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    if (!isOpen) {
  setPacienteSelecionado("");
  setPacienteNome("");
      return;
    }

    if (selectedAlta) {
  const id = selectedAlta.paciente_id ?? selectedAlta.paciente ?? selectedAlta.id ?? null;
  const nome = selectedAlta.paciente_nome ?? selectedAlta.pacienteNome ?? selectedAlta.paciente ?? selectedAlta.nome_paciente ?? selectedAlta.nome ?? '';
  setPacienteSelecionado(id ? String(id) : "");
  setPacienteNome(String(nome));
  const mid = selectedAlta.medico_responsavel_id ?? selectedAlta.id_medico_responsavel ?? selectedAlta.medico_responsavel ?? selectedAlta.medico_id ?? selectedAlta.medico ?? null;
  const mnome = selectedAlta.medico ?? selectedAlta.medico_nome ?? selectedAlta.medicoNome ?? selectedAlta.medico_nome ?? '';
  setMedicoSelecionado(mid ? String(mid) : "");
  setMedicoNome(String(mnome));
  // initialize dataAlta from selectedAlta
  setDataAlta(selectedAlta.data_alta ? String(selectedAlta.data_alta).slice(0,10) : '');
    }
  }, [isOpen, selectedAlta]);

  // populate fields when parent provides initial data via selectedAlta.initialData or when viewOnly
  useEffect(() => {
    if (!isOpen) return;
    const initial = initialData ?? null;
    if (initial) {
      setPa(initial.pa ?? '');
      setFc(initial.fc ?? '');
      setFr(initial.fr ?? '');
      setSato2(initial.sato2 ?? initial.sato2 ?? '');
      setInspecaoPalpacao(initial.inspecao_palpacao ?? '');
      setAvaliacaoFisica(initial.avaliacao_fisica ?? '');
      setGrauMobilidade(initial.grau_mobilidade ?? '');
      setForcaSensibilidade(initial.forca_sensibilidade ?? '');
      setNivelDependencia(initial.nivel_dependencia ?? '');
      setMedicamentosUsoContinuo(initial.medicamentos_uso_continuo ?? '');
      setHistoriaPregressa(initial.historia_pregressa ?? '');
      setAvaliacaoGeral(initial.avaliacao_geral ?? '');
      setAcoesCurtoPrazo(initial.acoes_curto_prazo ?? '');
      setAcoesMedioPrazo(initial.acoes_medio_prazo ?? '');
      setAcoesLongoPrazo(initial.acoes_longo_prazo ?? '');
      if (!professional && (initial.professional || initial.tipo === 'fisioterapia')) {
        setProfessional(initial.professional ?? 'fisioterapia');
      }
    }
  }, [isOpen, initialData]);

  // when opened with initialData (view), populate all fields
  useEffect(() => {
    // noop placeholder (kept for future initialData handling)
  }, [isOpen, selectedAlta]);

  return (
    <ModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      isSubmitting={isSubmitting}
  onClick={viewOnly ? onClose : async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
          setError("");
          const altaIdCandidate = selectedAlta?.id ?? selectedAlta?.alta_id ?? selectedAlta?.id_alta ?? selectedAlta?.alta ?? null;
          const resolvedPacienteId = pacienteSelecionado
            ? Number(pacienteSelecionado)
            : (selectedAlta?.paciente_id ?? selectedAlta?.paciente ?? selectedAlta?.id ?? null);
          const resolvedMedicoId = medicoSelecionado
            ? Number(medicoSelecionado)
            : (selectedAlta?.medico_responsavel_id ?? selectedAlta?.medico_id ?? selectedAlta?.medico ?? null);

          const payload = {
            paciente_id: resolvedPacienteId ?? null,
            medico_id: resolvedMedicoId ?? null,
            alta_id: altaIdCandidate ? Number(altaIdCandidate) : null,
            data_criacao: new Date().toISOString(),
            tipo: 'individual',
            pa: pa || '',
            fc: fc || '',
            fr: fr || '',
            nivel_dependencia: nivelDependencia || '',
            sato2: sato2 || '',
            inspecao_palpacao: inspecaoPalpacao || '',
            avaliacao_fisica: avaliacaoFisica || '',
            grau_mobilidade: grauMobilidade || '',
            forca_sensibilidade: forcaSensibilidade || '',
            medicamentos_uso_continuo: medicamentosUsoContinuo || '',
            historia_pregressa: historiaPregressa || '',
            avaliacao_geral: avaliacaoGeral || '',
            acoes_curto_prazo: acoesCurtoPrazo || '',
            acoes_medio_prazo: acoesMedioPrazo || '',
            acoes_longo_prazo: acoesLongoPrazo || '',
            data_alta: dataAlta || (selectedAlta?.data_alta ?? null),
          };
          // basic client-side validation to avoid DB constraint errors
          if (payload.paciente_id == null) {
            setError('Paciente não definido. Abra o modal a partir de uma alta válida.');
            setIsSubmitting(false);
            return;
          }
          if (payload.medico_id == null) {
            setError('Médico não definido. Verifique a alta ou selecione um médico.');
            setIsSubmitting(false);
            return;
          }

          // Validação: data_alta não pode ser anterior à data_internacao
          try {
            const provided = payload.data_alta ? new Date(String(payload.data_alta)) : null;
            const internacao = selectedAlta?.data_internacao ? new Date(String(selectedAlta.data_internacao)) : null;
            if (provided && internacao && provided < internacao) {
              setError('Data da alta não pode ser anterior à data de internação.');
              setIsSubmitting(false);
              return;
            }
          } catch (e) {
            // se parsing falhar, deixamos o backend validar, mas não bloqueamos aqui
          }

          console.debug('PTS payload', payload);
          await criarPTS(payload as any);
          onClose();
          if (typeof onSaved === 'function') onSaved();
        } catch (err) {
          console.error('Erro ao criar PTS', err);
          setError(String(err));
        } finally {
          setIsSubmitting(false);
        }
      }}
      TituloModal="Projeto Terapêutico Singular"
  BtnText={viewOnly ? 'Fechar' : 'Salvar PTS'}
      Conteudo={
        <>
          <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <User className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Dados do Paciente</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="md:col-span-2">
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Paciente</label>
                <input
                  type="text"
                  readOnly={true}
                  value={pacienteNome}
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg p-2.5"
                />
                {/* hidden input to hold patient id for submission */}
                <input type="hidden" value={pacienteSelecionado} />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Médico</label>
                <input
                  type="text"
                  readOnly={true}
                  value={medicoNome}
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg p-2.5"
                />
                <input type="hidden" value={medicoSelecionado} />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Data da Alta</label>
                <input
                  type="date"
                  value={dataAlta}
                  onChange={(e) => setDataAlta(e.target.value)}
                  readOnly={viewOnly}
                  disabled={viewOnly}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg p-2.5"
                />
              </div>
              <div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <Stethoscope className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Equipe Multiprofissional</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="md:col-span-2">
                <select
                  value={professional}
                  onChange={(e) => setProfessional(e.target.value)}
                  disabled={viewOnly}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                >
                  <option value="" disabled>
                    Selecione o profissional
                  </option>
                  <option value="enfermagem">Enfermagem</option>
                  <option value="nutricionista">Nutricionista</option>
                  <option value="fisioterapia">Fisioterapia</option>
                </select>
              </div>
            </div>
          </div>

      {/* --- PASSO 2: Usar o componente e controlar a visibilidade com CSS --- */}
      {/* Mostrar avaliação fisioterapêutica somente quando profissional for fisioterapia
        ou quando os dados iniciais indicam que o PTS é de fisioterapia. */}
      <div className={`mb-8 ${((professional === 'fisioterapia') || (initialData && (initialData.professional === 'fisioterapia' || initialData.tipo === 'fisioterapia'))) ? 'block' : 'hidden'}`}>
            <AvaliacaoFisioterapeutica
              readOnly={viewOnly}
              pa={pa}
              setPa={setPa}
              fc={fc}
              setFc={setFc}
              fr={fr}
              setFr={setFr}
              sato2={sato2}
              setSato2={setSato2}
              inspecaoPalpacao={inspecaoPalpacao}
              setInspecaoPalpacao={setInspecaoPalpacao}
              avaliacaoFisica={avaliacaoFisica}
              setAvaliacaoFisica={setAvaliacaoFisica}
              grauMobilidade={grauMobilidade}
              setGrauMobilidade={setGrauMobilidade}
                forcaSensibilidade={forcaSensibilidade}
                setForcaSensibilidade={setForcaSensibilidade}
                nivelDependencia={nivelDependencia}
                setNivelDependencia={setNivelDependencia}
            />
          </div>

          {/* --- O RESTO DO SEU FORMULÁRIO (sem alterações) --- */}

          <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <HeartPulse className="text-red-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Histórico Clínico</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Medicamentos de Uso Contínuo</label>
              <textarea readOnly={viewOnly} value={medicamentosUsoContinuo} onChange={(e) => setMedicamentosUsoContinuo(e.target.value)} rows={4} placeholder="Liste os medicamentos e dosagens." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">História Pregressa</label>
                <textarea readOnly={viewOnly} value={historiaPregressa} onChange={(e) => setHistoriaPregressa(e.target.value)} rows={4} placeholder="Descreva o histórico do paciente, como a lesão medular e outras condições pré-existentes." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <ClipboardList className="text-green-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Avaliação</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Avaliação Geral</label>
                <textarea readOnly={viewOnly} value={avaliacaoGeral} onChange={(e) => setAvaliacaoGeral(e.target.value)} rows={6} placeholder="Estado geral do paciente, descrição detalhada das lesões por pressão (local, grau, profundidade, tecido, etc.)." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <CalendarClock className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Proposta de Tratamento</h3>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 pb-2 mb-2">
              <Clock className="text-red-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Ações de Curto Prazo (Início Imediato)</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Proposta de Tratamento</label>
                <textarea readOnly={viewOnly} value={acoesCurtoPrazo} onChange={(e) => setAcoesCurtoPrazo(e.target.value)} rows={3} placeholder="Ex: Avaliação da LPP, realizar curativo com..." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 pb-2 mb-2">
              <Clock className="text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Ações de Médio Prazo</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Proposta de Tratamento</label>
                  <textarea readOnly={viewOnly} value={acoesMedioPrazo} onChange={(e) => setAcoesMedioPrazo(e.target.value)} rows={3} placeholder="Ex: Avaliação da LPP, realizar curativo com..." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 pb-2 mb-2">
              <Clock className="text-green-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Ações de Longo Prazo</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Proposta de Tratamento</label>
                  <textarea readOnly={viewOnly} value={acoesLongoPrazo} onChange={(e) => setAcoesLongoPrazo(e.target.value)} rows={3} placeholder="Ex: Avaliação da LPP, realizar curativo com..." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
              </div>
            </div>
          </div>
          {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
        </>
      }
    />
  );


}