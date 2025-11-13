import { createAltaRepository, getAllAltasRepository, getAltasByMedicoRepository } from "../repositories/altasRepository";
import { updateAltaStatusRepository, updateAltaDocumentoRepository, updateAltaDataAltaRepository } from "../repositories/altasRepository";

export const createAltaService = async (data: any) => {
    const alta = await createAltaRepository(data);
    return alta;
}

export const getAllAltaService = async (medicoId?: number, page?: number, pageSize?: number, q?: string) => {
    const result = await getAltasByMedicoRepository(medicoId, page, pageSize, q);
    return result;
}

export const finalizeAltaService = async (altaId: number, data_alta: string | null) => {
    // mark as finalized, clear documento reference and set tipo_documento = 'ALTA'
    await updateAltaStatusRepository(altaId, 'Finalizado');
    await updateAltaDocumentoRepository(altaId, 'ALTA', null as any);
    if (data_alta) {
        await updateAltaDataAltaRepository(altaId, data_alta);
    }
    return { success: true };
}
