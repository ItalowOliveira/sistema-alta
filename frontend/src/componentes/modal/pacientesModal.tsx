import { useState } from "react";
import ModalTemplate from "./modalTemplate";
import ModalPopUp from "./modalPopUp";
import { criarPaciente } from "../../api/pacientesApi";
import { User } from "lucide-react";

type PacientesModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PacientesModal({ isOpen, onClose }: PacientesModalProps) {
  const [doenca, setDoenca] = useState("");
  const [motivoOutro, setMotivoOutro] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [nomePaciente, setNomePaciente] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [esf, setEsf] = useState("");
  const [hd, setHd] = useState("");
  const [showSavedModal, setShowSavedModal] = useState(false);

  const resetForm = () => {
    setDoenca("");
    setMotivoOutro("");
    setEndereco("");
    setNumero("");
    setCidade("");
    setNomePaciente("");
    setDataNascimento("");
    setEsf("");
    setHd("");
  }


  const handleSubmit = async () => {
    try {
      const paciente = {
        nome_paciente: nomePaciente,
        data_nascimento: dataNascimento || null,
        portador_de: doenca,
        motivo: doenca === "Outro" ? motivoOutro : "",
  endereco,
  numero: Number(numero),
  cidade,
  esf,
  hd,
      };
  await criarPaciente(paciente);
  setShowSavedModal(true);
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      alert("Erro ao cadastrar paciente.");
    }
  };
  const isFormValid = String(nomePaciente).trim().length > 0 && String(doenca).trim().length > 0;

  return (
    <>
    <ModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      onClick={handleSubmit}
      isDisabled={!isFormValid}
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
                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Data de Nascimento</label>
                <input type="date" placeholder="Data de nascimento" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} />
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
                <div className="w-full">
                  <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">ESF</label>
                  <input
                    type="text"
                    placeholder="ESF"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    value={esf}
                    onChange={e => setEsf(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">HD</label>
                  <input
                    type="text"
                    placeholder="HD"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    value={hd}
                    onChange={e => setHd(e.target.value)}
                  />
                </div>

            </div>
            </div>
        </div>

        }

    />
    <ModalPopUp
      isOpen={showSavedModal}
      onClose={() => setShowSavedModal(false)}
      onClick={() => {
        resetForm();
        setShowSavedModal(false);
        onClose();
      }}
      title="Paciente cadastrado!"
      message="O paciente foi criado com sucesso!"
    />
    </>
  );
}