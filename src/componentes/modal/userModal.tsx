import ModalTemplate from "./ModalTemplate";
import { HeartPulse, Lock } from "lucide-react";

type UserModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function UsuariosModal({ isOpen, onClose }: UserModalProps) {
    return (
        <ModalTemplate
            isOpen={isOpen}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div>
                            <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Nome</label>
                            <input type="text" placeholder="Nome completo" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
                        </div>
                        <div>
                            <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Setor</label>
                            <select id="small" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                                <option >Escolha uma opção</option>
                                <option value="Psicologia">Psicologia</option>
                                <option value="Fisioterapia">Fisioterapia</option>
                                <option value="Enfermagem">Enfermagem</option>
                                <option value="Nutrição">Nutrição</option>
                                <option value="Assistente Social">Assistente Social</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">HD</label>
                            <input type="text" placeholder="HD" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
                        </div>
                        <div>
                            <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">CRM</label>
                            <input type="text" placeholder="CRM" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
                        </div>
                    </div>

                    {/* Dados de Acesso */}
                    <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4 mt-6">
                        <Lock className="text-blue-500" />
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Dados de Acesso</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div>
                            <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">E-mail</label>
                            <input type="email" placeholder="email@exemplo.com" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
                        </div>
                        <div>
                            <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Senha</label>
                            <input type="password" placeholder="Senha" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
                        </div>
                        <div>
                            <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Confirmar Senha</label>
                            <input type="password" placeholder="Senha" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
                        </div>
                        <div className="md:col-span-2 mb-8">
                            <div>
                                <label className="block mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-300">Perfil de acesso</label>
                                <select id="small" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
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
    );
}