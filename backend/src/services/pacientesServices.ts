import { createPacienteRepository, getAllPacientesRepository } from '../repositories/pacientesRepository';

export const createPacienteService = async (data: any) => {
    return await createPacienteRepository(data);
}

export const getAllPacientesService = async () => {
    return await getAllPacientesRepository();
}