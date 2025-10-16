import api from "./apiClient";

export interface Usuario {

    id: number;
    nome: string;
    email: string;
    senha: string;
    tipo_usuario: string;
    data_criacao: string;
}

export const getUsuarios = async (tipo_usuario?: string): Promise<Usuario[]> => {
  let url = "/usuarios";
  if (tipo_usuario) {
    url += `?tipo_usuario=${tipo_usuario}`;
  }
  const response = await api.get<Usuario[]>(url);
  return response.data;
}

export const criarUsuario = async (usuario: Omit<Usuario, 'id'>): Promise<Usuario> => {
    const response = await api.post<Usuario>("/usuarios", usuario);
    return response.data;
}

export const loginUsuario = async (email: string, senha: string): Promise<Usuario | null> => {
  try {
    const response = await api.post<Usuario>("/usuarios/login", { email, senha });
    return response.data;
  } catch {
    return null;
  }
};