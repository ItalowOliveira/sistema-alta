import ModalTemplate from "./modalTemplate";
import ModalPopUp from "./modalPopUp";
import { criarUsuario } from "../../api/usuarioApi";
import { HeartPulse, Lock, Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";

type UserModalProps = {
    isOpen: boolean;
    onClose: () => void;
};


type StrongPasswordInputProps = {
    value: string;
    onChange: (v: string) => void;
};

function StrongPasswordInput({ value, onChange }: StrongPasswordInputProps) {
    const [show, setShow] = useState(false);

    const strength = (pw: string) => {
        let score = 0;
        if (pw.length >= 8) score++;
        if (/[A-Z]/.test(pw)) score++;
        if (/[0-9]/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        return score;
    };

    const score = strength(value);
    const strengthLabel = ["Muito fraca", "Fraca", "Média", "Forte", "Muito forte"][score] || "Muito fraca";
    const strengthColor = ["bg-red-500", "bg-red-400", "bg-yellow-400", "bg-green-400", "bg-green-600"][score] || "bg-red-500";

    return (
        <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Senha</label>
            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    placeholder="Senha"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-2 top-2 text-sm text-gray-600 dark:text-gray-300"
                    aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
                >
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
            <div className="mt-2">
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded">
                    <div className={`h-2 rounded ${strengthColor}`} style={{ width: `${(score / 4) * 100}%` }} />
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{strengthLabel}</p>
            </div>
        </div>
    );
}

export default function UsuariosModal({ isOpen, onClose }: UserModalProps) {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [tipo_usuario, setTipo_usuario] = useState('');
    const [setor, setSetor] = useState('');
    const [showSavedModal, setShowSavedModal] = useState(false);

    const handleSubmit = async () => {
        try {
            const novoUsuario = {
                nome,
                email,
                senha,
                tipo_usuario,
                setor,
                data_criacao: new Date().toISOString()
            };
            await criarUsuario(novoUsuario);
            // show confirmation modal instead of alert
            setShowSavedModal(true);
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao cadastrar usuário.');
        }
    };

    const resetForm = () => {
        setNome('');
        setEmail('');
        setSenha('');
        setConfirmSenha('');
        setTipo_usuario('');
        setSetor('');
    }


    return (
        <>
        <ModalTemplate
            isOpen={isOpen}
            onClick={handleSubmit}
            onClose={onClose}
            TituloModal="Cadastro de Usuário"
            BtnText="Cadastrar"
            Conteudo={
                <>
                    {/* Dados do Médico */}
                    <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
                        <HeartPulse className="text-blue-500" />
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Dados do Médico</h3>
                    </div>

                    <div className="flex justify-center mb-4">
                        <div className="relative w-40 h-40 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 flex items-center justify-center">
                            <User className="w-20 h-20 text-gray-300 dark:text-gray-500" />
                        </div>
                        </div>
                   
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div>
                            <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Nome</label>
                            <input type="text" placeholder="Nome completo" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div>
                            <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Setor</label>
                            <select id="small" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                value={setor} onChange={(e) => setSetor(e.target.value)}>
                                <option >Escolha uma opção</option>
                                <option value="Psicologia">Psicologia</option>
                                <option value="Fisioterapia">Fisioterapia</option>
                                <option value="Enfermagem">Enfermagem</option>
                                <option value="Nutrição">Nutrição</option>
                                <option value="Assistente Social">Assistente Social</option>
                            </select>
                        </div>
                    </div>

                    {/* Dados de Acesso */}
                    <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4 mt-10">
                        <Lock className="text-blue-500" />
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Dados de Acesso</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4">
                        <div>
                            <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">E-mail</label>
                            <input type="email" placeholder="email@exemplo.com" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 items-start">
                            <div>
                                <StrongPasswordInput value={senha} onChange={setSenha} />
                            </div>
                            <div>
                                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Confirmar Senha</label>
                                <div className="relative">
                                    <input type={showConfirm ? 'text' : 'password'} placeholder="Confirme a senha" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                        value={confirmSenha} onChange={(e) => setConfirmSenha(e.target.value)} />
                                    <button type="button" onClick={() => setShowConfirm(s => !s)} className="absolute right-2 top-2 text-sm text-gray-600 dark:text-gray-300" aria-label={showConfirm ? 'Ocultar confirmação' : 'Mostrar confirmação'}>
                                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {confirmSenha && confirmSenha !== senha && (
                                    <p className="mt-1 text-sm text-red-500">As senhas não coincidem.</p>
                                )}
                            </div>
                        </div>

                        <div className="mb-8">
                            <div>
                                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Perfil de acesso</label>
                                <select id="small" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                    value={tipo_usuario} onChange={(e) => setTipo_usuario(e.target.value)}>
                                    <option >Escolha uma opção</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Usuário">Usuário Enfermagem</option>
                                    <option value="Usuário">Usuário Médico</option>
                                    <option value="Usuário">Usuário Fisioterapia</option>
                                    <option value="Usuário">Usuário Nutrição</option>
                                    <option value="Usuário">Usuário Psicologia</option>
                                    <option value="Usuário">Usuário Assistente Social</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </>
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
            title="Usuário cadastrado!"
            message="O usuário foi criado com sucesso!"
        />
    </>
    );
}
