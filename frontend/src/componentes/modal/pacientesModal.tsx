import { useEffect, useState } from "react";
import ModalTemplate from "./modalTemplate";
import { getUsuarios } from "../../api/usuarioApi";
import { criarPaciente } from "../../api/pacientesApi";
import { User, CalendarClock, Stethoscope } from "lucide-react";

type PacientesModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PacientesModal({ isOpen, onClose }: PacientesModalProps) {
  const [medicos, setMedicos] = useState<{ id: number; nome: string }[]>([]);
  const [doenca, setDoenca] = useState("");
  const [motivoOutro, setMotivoOutro] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [nomePaciente, setNomePaciente] = useState("");
  const [idade, setIdade] = useState("");
  const [setor, setSetor] = useState("");
  const [leito, setLeito] = useState("");
  const [dataInternacao, setDataInternacao] = useState("");
  const [dataAlta, setDataAlta] = useState("");
  const [medicoResponsavel, setMedicoResponsavel] = useState("");

  useEffect(() => {
    if (isOpen) {
      getUsuarios("Admin").then(usuarios => {
        setMedicos(usuarios.map(u => ({ id: u.id, nome: u.nome })));
      });
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      const paciente = {
        nome_paciente: nomePaciente,
        idade: Number(idade),
        portador_de: doenca,
        motivo: doenca === "Outro" ? motivoOutro : "",
        endereco,
        numero: Number(numero),
        cidade,
        setor,
        leito,
        data_internacao: dataInternacao,
        data_alta: dataAlta,
        medico_responsavel: medicoResponsavel,
      };
      await criarPaciente(paciente);
      alert("Paciente cadastrado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      alert("Erro ao cadastrar paciente.");
    }
  };
  return (
    <ModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      onClick={handleSubmit}
      TituloModal="Cadastro de Paciente"
      BtnText="Salvar Paciente"
      Conteudo={
        <div>
          {/* Seção Dados do Paciente */}
            <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <User className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Dados do Paciente</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Paciente</label>
                <input type="text" placeholder="Nome completo do paciente" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" value={nomePaciente} onChange={e => setNomePaciente(e.target.value)} />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Idade</label>
                <input type="number" placeholder="Idade" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" value={idade} onChange={e => setIdade(e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Paciente Portador de:</label>
                <select
                  id="small"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  value={doenca}
                  onChange={e => setDoenca(e.target.value)}
                >
                  <option value="">Escolha uma opção</option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="Has">Has</option>
                  <option value="Clinico">Clinico</option>
                  <option value="Cirurgico">Cirurgico</option>
                  <option value="Outro">Outros</option>
                </select>
                {doenca === "Outro" && (
                  <input
                    type="text"
                    placeholder="Informe o motivo"
                    className="mt-2 w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    value={motivoOutro}
                    onChange={e => setMotivoOutro(e.target.value)}
                  />
                )}
              </div>
              <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Endereço</label>
                  <input
                    type="text"
                    placeholder="Endereço"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    value={endereco}
                    onChange={e => setEndereco(e.target.value)}
                  />
                </div>
                <div className="w-32">
                  <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Número</label>
                  <input
                    type="text"
                    placeholder="Nº"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    value={numero}
                    onChange={e => setNumero(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Cidade</label>
                  <input
                    type="text"
                    placeholder="Cidade"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    value={cidade}
                    onChange={e => setCidade(e.target.value)}
                  />
                </div>
              </div>
            </div>
            </div>

          {/* Seção Internação */}
          <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <CalendarClock className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Internação</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Setor</label>
                <input type="text" placeholder="Setor" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" value={setor} onChange={e => setSetor(e.target.value)} />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Leito</label>
                <input type="text" placeholder="Leito" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" value={leito} onChange={e => setLeito(e.target.value)} />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Data da internação</label>
                <input type="date" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" value={dataInternacao} onChange={e => setDataInternacao(e.target.value)} />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Data da Alta</label>
                <input type="date" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" value={dataAlta} onChange={e => setDataAlta(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Seção Médico Responsável */}
          <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              <Stethoscope className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Médico Responsável</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Médico</label>
                <select className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" value={medicoResponsavel} onChange={e => setMedicoResponsavel(e.target.value)}>
                  <option value="">Escolha o Médico</option>
                  {medicos.map(medico => (
                    <option key={medico.id} value={medico.nome}>{medico.nome}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        }

    />
  );
}