import { createPtaServicoSocialRepository } from '../repositories/ptaServicoSocialRepository';
import { updateAltaStatusRepository, updateAltaDocumentoRepository, updateAltaDataAltaRepository } from '../repositories/altasRepository';
import { getPtaServicoSocialByIdRepository } from '../repositories/ptaServicoSocialRepository';

export const createPtaServicoSocialService = async (data: any) => {
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
  const created = await createPtaServicoSocialRepository(payload);

  if (altaNum !== null) {
    try {
      await updateAltaStatusRepository(altaNum, 'Finalizado');
      try {
        const newId = created?.id ?? null;
        if (newId) {
          await updateAltaDocumentoRepository(altaNum, 'PTA_SERVICO_SOCIAL', Number(newId));
        }
      } catch (errDoc) {
        console.error('Erro atualizando documento da alta (PTA Servico Social):', errDoc);
      }
        // update data_alta if provided
        if (data && (data as any).data_alta) {
          try {
            await updateAltaDataAltaRepository(altaNum, (data as any).data_alta);
          } catch (errData) {
            console.error('Erro atualizando data_alta da alta (PTA Servico Social):', errData);
          }
        }
    } catch (err) {
      console.error('Erro atualizando status da alta (PTA Servico Social):', err);
    }
  }

  return created;
};

export const getPtaServicoSocialByIdService = async (id: number) => {
  if (!id || Number.isNaN(Number(id)) || id <= 0) return null;
  const pta = await getPtaServicoSocialByIdRepository(Number(id));
  return pta;
};
