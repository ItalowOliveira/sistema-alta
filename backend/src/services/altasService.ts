import { createAltaRepository, getAllAltasRepository } from "../repositories/altasRepository";

export const createAltaService = async (data: any) => {
    const alta = await createAltaRepository(data);
    return alta;
}

export const getAllAltaService = async () => {
    const altas = await getAllAltasRepository();
    return altas;
}
