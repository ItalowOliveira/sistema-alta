import { createPTSRepository } from "../repositories/ptsRepository";
import { updateAltaStatusRepository, updateAltaDocumentoRepository, updateAltaDataAltaRepository } from "../repositories/altasRepository";
import { getPTSByIdRepository } from "../repositories/ptsRepository";

export const createPtsService = async (data: any) => {
    console.debug('createPtsService payload:', data);
    const { paciente_id, medico_id, alta_id } = data as any;

    const toNumberOrNull = (v: any) => (v === null || v === undefined ? null : Number(v));
    const pacienteNum = toNumberOrNull(paciente_id);
    const medicoNum = toNumberOrNull(medico_id);
    const altaNum = toNumberOrNull(alta_id);

    if (pacienteNum !== null && Number.isNaN(pacienteNum)) {
        throw new Error('Invalid paciente_id');
    }
    if (medicoNum !== null && Number.isNaN(medicoNum)) {
        throw new Error('Invalid medico_id');
    }
    if (altaNum !== null && Number.isNaN(altaNum)) {
        throw new Error('Invalid alta_id');
    }

    const payload = { ...data, paciente_id: pacienteNum, medico_id: medicoNum, alta_id: altaNum };
    const created = await createPTSRepository(payload);
    // se alta vinculada, atualizar status para Finalizado
    if (altaNum !== null) {
        try {
            await updateAltaStatusRepository(altaNum, 'Finalizado');
            // Also record the documento type/id on the alta row
            try {
                const newPtsId = created?.id ?? created?.id_pts ?? null;
                if (newPtsId) {
                    await updateAltaDocumentoRepository(altaNum, 'PTS', Number(newPtsId));
                }
            } catch (errDoc) {
                console.error('Erro atualizando documento da alta:', errDoc);
            }
            // update data_alta if provided
            if (data && (data as any).data_alta) {
                try {
                    await updateAltaDataAltaRepository(altaNum, (data as any).data_alta);
                } catch (errData) {
                    console.error('Erro atualizando data_alta da alta (PTS):', errData);
                }
            }
        } catch (err) {
            console.error('Erro atualizando status da alta:', err);
            // não impedir criação do PTS se a atualização falhar, apenas log
        }
    }
    return created;
};

export const getPtsByIdService = async (id: number) => {
    if (!id || Number.isNaN(Number(id)) || id <= 0) return null;
    const pts = await getPTSByIdRepository(Number(id));
    return pts;
};
