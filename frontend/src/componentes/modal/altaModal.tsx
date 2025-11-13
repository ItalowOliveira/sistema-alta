import ModalTemplate from "./modalTemplate";
import { CalendarClock, Stethoscope, User } from "lucide-react";
import { useState, useEffect } from "react";
import { getUsuarios, meUsuario } from "../../api/usuarioApi";
import { getPacientes } from "../../api/pacientesApi";
import type { Pacientes } from "../../api/pacientesApi";
import { criarAlta, finalizeAlta } from "../../api/altasApi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  TituloModal: string;
  BtnText: string;
  selectedAlta?: any;
  viewOnly?: boolean;
  allowEditDateInView?: boolean;
}

export default function AltaModal({
  isOpen,
  onClose,
  onClick,
  BtnText,
  TituloModal,
  selectedAlta,
  viewOnly = false,
  allowEditDateInView = false,
}: ModalProps) {
  // helper to convert various datetime strings to YYYY-MM-DD for <input type="date" />
  const toDateInput = (v?: string | null) => {
    if (!v) return "";
    try {
      // if already in YYYY-MM-DD format, return as is
      if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
      // if ISO with time, take date part
      if (v.includes('T')) return v.split('T')[0];
      // if contains space before time
      if (v.includes(' ')) return v.split(' ')[0];
      // fallback: try Date parse and format
      const d = new Date(v);
      if (!isNaN(d.getTime())) {
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${d.getFullYear()}-${mm}-${dd}`;
      }
    } catch (err) {
      // ignore and return raw
    }
    return v;
  };
  const [medicoResponsavel, setMedicoResponsavel] = useState("");
  const [, setMedicos] = useState<{ id: number; nome: string }[]>([]);
  const [loggedUserName, setLoggedUserName] = useState("");
  const [pacientes, setPacientes] = useState<Pacientes[]>([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState("");
  // read-only patient fields populated from selected paciente
  const [pacienteDataNascimento, setPacienteDataNascimento] = useState<string>("");
  const [pacientePortadorDe, setPacientePortadorDe] = useState<string>("");
  const [pacienteEndereco, setPacienteEndereco] = useState<string>("");
  const [pacienteNumero, setPacienteNumero] = useState<string>("");
  const [pacienteCidade, setPacienteCidade] = useState<string>("");
  const [pacienteEsf, setPacienteEsf] = useState<string>("");
  const [setor, setSetor] = useState("");
  const [leito, setLeito] = useState("");
  const [dataInternacao, setDataInternacao] = useState("");
  const [dataAltaState, setDataAltaState] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  

  useEffect(() => {
    if (isOpen) {
      getUsuarios("Admin").then((usuarios) => {
        setMedicos(usuarios.map((u) => ({ id: u.id, nome: u.nome })));
      });
    }
  }, [isOpen]);

  // set current logged-in user as default médico responsável when opening modal (create mode)
  useEffect(() => {
    let mounted = true;
    if (!isOpen) return;
    (async () => {
      try {
        const user = await meUsuario();
        if (!mounted) return;
        // if selectedAlta has explicit medico, prefer it (view mode). Otherwise set logged user.
        if (selectedAlta && (selectedAlta.medico_id || selectedAlta.medico_responsavel_id || selectedAlta.medico)) {
          // handled by the other effect that fills fields from selectedAlta
        } else if (user && user.id) {
          setMedicoResponsavel(String(user.id));
          setLoggedUserName(user.nome ?? "");
        }
      } catch (err) {
        console.error('Erro fetching logged user for medicoResponsavel default', err);
      }
    })();
    return () => { mounted = false; };
  }, [isOpen, selectedAlta]);

  useEffect(() => {
    if (isOpen) {
      getPacientes().then((res) => {
        setPacientes(res);
      }).catch(err => console.error('Erro fetch pacientes:', err));
    }
  }, [isOpen]);

  // when opening in view mode, prefill fields from selectedAlta
  useEffect(() => {
    if (!isOpen || !selectedAlta) return;
    try {
      if (selectedAlta.paciente_id || selectedAlta.paciente) {
        setPacienteSelecionado(String(selectedAlta.paciente_id ?? selectedAlta.paciente_id ?? selectedAlta.paciente_id ?? selectedAlta.paciente?.id ?? selectedAlta.paciente ?? ""));
      }
      if (selectedAlta.medico_id || selectedAlta.medico) {
        setMedicoResponsavel(String(selectedAlta.medico_id ?? selectedAlta.medico_responsavel_id ?? selectedAlta.medico?.id ?? ""));
        // try to set a readable name for the medico from the selectedAlta
        const medicoNome = selectedAlta.medico_nome ?? selectedAlta.medico?.nome ?? selectedAlta.medico ?? "";
        setLoggedUserName(String(medicoNome));
      }
  setSetor(selectedAlta.setor ?? "");
  setLeito(selectedAlta.leito ?? "");
  setDataInternacao(toDateInput(selectedAlta.data_internacao ?? selectedAlta.data_internacao_br ?? selectedAlta.dataInternacao ?? null));
  setDataAltaState(toDateInput(selectedAlta.data_alta ?? selectedAlta.data_alta_br ?? selectedAlta.dataAlta ?? null));
    } catch (err) {
      console.error('Erro preenchendo modal de visualização:', err);
    }
  }, [isOpen, selectedAlta]);

  useEffect(() => {
    if (!pacienteSelecionado) {
      setPacienteDataNascimento("");
      setPacientePortadorDe("");
      setPacienteEndereco("");
      setPacienteNumero("");
      setPacienteCidade("");
      setPacienteEsf("");
      return;
    }
    const p = pacientes.find(p => String(p.id) === String(pacienteSelecionado));
    if (p) {
      setPacienteDataNascimento(toDateInput(p.data_nascimento ?? null));
      setPacientePortadorDe(p.portador_de ?? "");
      setPacienteEndereco(p.endereco ?? "");
      setPacienteNumero(p.numero !== undefined && p.numero !== null ? String(p.numero) : "");
      setPacienteCidade(p.cidade ?? "");
      setPacienteEsf(p.setor ?? "");
    } else {
      setPacienteDataNascimento("");
      setPacientePortadorDe("");
      setPacienteEndereco("");
      setPacienteNumero("");
      setPacienteCidade("");
      setPacienteEsf("");
    }
  }, [pacienteSelecionado, pacientes]);

  

  const handleAction = async () => {
    if (viewOnly) {
      if (allowEditDateInView) {
        // finalize flow: reuse primary button to call finalize
        if (!selectedAlta) {
          onClose();
          return;
        }
        setIsSubmitting(true);
        try {
          // Validação: data_alta não pode ser anterior à data_internacao
          try {
            const provided = dataAltaState ? new Date(String(dataAltaState)) : null;
            const internacaoDate = dataInternacao ? new Date(String(dataInternacao)) : (selectedAlta?.data_internacao ? new Date(String(selectedAlta.data_internacao)) : null);
            if (provided && internacaoDate && provided < internacaoDate) {
              setError('Data da alta não pode ser anterior à data de internação.');
              setIsSubmitting(false);
              return;
            }
          } catch (e) {
            // parsing error - let backend handle if malformed
          }
          const altaId = selectedAlta.id ?? selectedAlta.id_internacao ?? selectedAlta.id_alta ?? null;
          if (!altaId) {
            setError('ID da alta inválido.');
            setIsSubmitting(false);
            return;
          }
          await finalizeAlta(Number(altaId), dataAltaState || null);
          // optionally call parent refresh
          try { await onClick(); } catch (_) {}
          onClose();
        } catch (err) {
          console.error('Erro ao finalizar alta', err);
          setError('Erro ao finalizar alta.');
        } finally {
          setIsSubmitting(false);
        }
        return;
      }
      onClose();
      return;
    }
    // submit local form
    setError("");
    // validate before submit
    const missing: string[] = [];
    if (!pacienteSelecionado) missing.push('Paciente');
    if (!medicoResponsavel) missing.push('Médico responsável');
    if (!setor) missing.push('Setor');
    if (!leito) missing.push('Leito');
  if (!dataInternacao) missing.push('Data da internação');
    if (missing.length > 0) {
      setFieldErrors(missing);
      setError('Preencha todos os campos obrigatórios.');
      return;
    }
    setFieldErrors([]);
    setIsSubmitting(true);
    try {
      const payload = {
        paciente_id: Number(pacienteSelecionado),
        medico_responsavel_id: Number(medicoResponsavel),
        setor,
        leito,
        data_internacao: dataInternacao || null,
        data_alta: dataAltaState || null,
        status: 'Pendente',
      };
      // Validação: não permitir data_alta anterior à data_internacao
      try {
        if (payload.data_alta && payload.data_internacao) {
          const provided = new Date(String(payload.data_alta));
          const internacaoDate = new Date(String(payload.data_internacao));
          if (!isNaN(provided.getTime()) && !isNaN(internacaoDate.getTime()) && provided < internacaoDate) {
            setFieldErrors([]);
            setError('Data da alta não pode ser anterior à data de internação.');
            setIsSubmitting(false);
            return;
          }
        }
      } catch (e) {
        // ignore parsing errors here
      }
      await criarAlta(payload as any);
      // call parent refresh
      await onClick();
      onClose();
    } catch (err) {
      console.error('Erro ao criar alta', err);
      setError('Erro ao salvar alta.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // form validity derived value
  const isFormValid = (() => {
    if (viewOnly) return true;
  return !!(pacienteSelecionado && medicoResponsavel && setor && leito && dataInternacao);
  })();

  

  return (
    <ModalTemplate
      isOpen={isOpen}
      onClose={onClose}
  onClick={handleAction}
  isDisabled={!isFormValid}
      TituloModal={TituloModal ?? "Cadastro de Altas"}
      BtnText={BtnText}
      Conteudo={
        <>

          <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <User className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Paciente</h3>
            </div>
            <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Paciente</label>
            <select
              id="small"
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              value={pacienteSelecionado}
              onChange={e => setPacienteSelecionado(e.target.value)}
              disabled={viewOnly}
            >
              <option value="">Escolha uma opção</option>
              {pacientes.map(p => (
              <option key={p.id} value={String(p.id)}>{p.nome_paciente}</option>
              ))}
            </select>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Data de Nascimento</label>
                <input
                  type="date"
                  readOnly
                  value={pacienteDataNascimento || ''}
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Portador de:</label>
                <input
                  type="text"
                  readOnly
                  value={pacientePortadorDe}
                  placeholder="Usuário não selecionado"
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg p-2.5"
                />
              </div>
                       <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Endereço</label>
                  <input
                    type="text"
                    readOnly
                    value={pacienteEndereco}
                    placeholder="Endereço"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  />
                </div>
                <div className="w-32">
                  <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Número</label>
                  <input
                    type="text"
                    readOnly
                    value={pacienteNumero}
                    placeholder="Nº"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Cidade</label>
                  <input
                    type="text"
                    readOnly
                    value={pacienteCidade}
                    placeholder="Cidade"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  />
                </div>
              </div>
              <div className="w-full">
                  <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">ESF</label>
                  <input
                    type="text"
                    readOnly
                    value={pacienteEsf}
                    placeholder="ESF"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  />
                </div>
              </div>
        

        </div>
          <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <Stethoscope className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Médico Responsável</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Médico</label>
                  {/* show logged-in user (or selectedAlta.medico) as a fixed, non-editable field */}
                  <input
                    type="text"
                    readOnly
                    value={loggedUserName}
                    placeholder="Médico responsável"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg p-2.5"
                  />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <CalendarClock className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Internação</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Setor</label>
                <input
                  type="text"
                  placeholder="Setor"
                  value={setor}
                  onChange={e => setSetor(e.target.value)}
                  readOnly={viewOnly}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Leito</label>
                <input
                  type="text"
                  placeholder="Leito"
                  value={leito}
                  onChange={e => setLeito(e.target.value)}
                  readOnly={viewOnly}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Data da internação</label>
                <input
                  type="date"
                  value={dataInternacao}
                  onChange={e => setDataInternacao(e.target.value)}
                  readOnly={viewOnly}
                  disabled={viewOnly}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Data da Alta</label>
                <input
                  type="date"
      value={dataAltaState}
  onChange={e => setDataAltaState(e.target.value)}
  // make readonly during creation (when not viewOnly);
  // in view mode keep existing behavior (editable only if allowEditDateInView)
  readOnly={!viewOnly || (viewOnly && !allowEditDateInView)}
  disabled={viewOnly && !allowEditDateInView}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                />
              </div>
            </div>
          </div>
          {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
    {isSubmitting && <p className="text-sm text-gray-500 mb-2">Enviando...</p>}
    {fieldErrors && fieldErrors.length > 0 && (
      <div className="mb-2 text-sm text-red-500">
        <p>Campos faltando:</p>
        <ul className="list-disc ml-5">
          {fieldErrors.map(f => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
    )}
          
        </>
      }
    />
  );
}