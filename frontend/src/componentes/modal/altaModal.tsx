import ModalTemplate from "./modalTemplate";
import { CalendarClock, Stethoscope, User } from "lucide-react";
import { useState, useEffect } from "react";
import { getUsuarios } from "../../api/usuarioApi";
import { getPacientes } from "../../api/pacientesApi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  TituloModal: string;
  BtnText: string;
}

export default function AltaModal({
  isOpen,
  onClose,
  onClick,
  TituloModal,
  BtnText,
}: ModalProps) {
  const [medicoResponsavel, setMedicoResponsavel] = useState("");
  const [medicos, setMedicos] = useState<{ id: number; nome: string }[]>([]);
  const [pacientes, setPacientes] = useState<{ id: number; nome_paciente: string }[]>([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState("");

  useEffect(() => {
    if (isOpen) {
      getUsuarios("Admin").then((usuarios) => {
        setMedicos(usuarios.map((u) => ({ id: u.id, nome: u.nome })));
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      getPacientes().then((res) => {
        setPacientes(res.map((p) => ({ id: p.id, nome_paciente: p.nome_paciente })));
      }).catch(err => console.error('Erro fetch pacientes:', err));
    }
  }, [isOpen]);

  return (
    <ModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      onClick={onClick}
      TituloModal={"Cadastro de Altas"}
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
            >
              <option value="">Escolha uma opção</option>
              {pacientes.map(p => (
                <option key={p.id} value={p.id}>{p.nome_paciente}</option>
              ))}
            </select>
        </div>
          <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <Stethoscope className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Médico Responsável</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Médico</label>
                <select
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  value={medicoResponsavel}
                  onChange={(e) => setMedicoResponsavel(e.target.value)}
                >
                  <option value="">Escolha o Médico</option>
                  {medicos.map((medico) => (
                    <option key={medico.id} value={medico.nome}>
                      {medico.nome}
                    </option>
                  ))}
                </select>
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
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Leito</label>
                <input
                  type="text"
                  placeholder="Leito"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Data da internação</label>
                <input
                  type="date"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Data da Alta</label>
                <input
                  type="date"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                />
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}