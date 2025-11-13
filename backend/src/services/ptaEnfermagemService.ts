import { createPtaEnfermagemRepository} from '../repositories/ptaEnfermagemRepository';
import { updateAltaStatusRepository, updateAltaDocumentoRepository, updateAltaDataAltaRepository } from '../repositories/altasRepository';
import { getPtaEnfermagemByIdRepository } from '../repositories/ptaEnfermagemRepository';

export const createPtaEnfermagemService = async (data: any) => {
  console.debug('createPtaEnfermagemService payload:', data);
  const { paciente_id, medico_id, alta_id } = data as any;

  const toNumberOrNull = (v: any) => (v === null || v === undefined ? null : Number(v));
  const pacienteNum = toNumberOrNull(paciente_id);
  const medicoNum = toNumberOrNull(medico_id);
  const altaNum = toNumberOrNull(alta_id);

  // Validate glasgow if provided to avoid out-of-range DB errors
  const rawGlasgow = (data as any).glasgow;
  let glasgowNum: number | null = null;
  if (rawGlasgow !== undefined && rawGlasgow !== null && rawGlasgow !== '') {
    const g = Number(rawGlasgow);
    if (Number.isNaN(g)) {
      throw new Error('Invalid glasgow');
    }
    // clinical valid Glasgow is between 3 and 15; also ensure fits smallint
    if (g < 3 || g > 15 || g < -32768 || g > 32767) {
      throw new Error('Invalid glasgow');
    }
    glasgowNum = Math.trunc(g);
  }

  if (pacienteNum !== null && Number.isNaN(pacienteNum)) {
    throw new Error('Invalid paciente_id');
  }
  if (medicoNum !== null && Number.isNaN(medicoNum)) {
    throw new Error('Invalid medico_id');
  }
  if (altaNum !== null && Number.isNaN(altaNum)) {
    throw new Error('Invalid alta_id');
  }

  const payload = { ...data, paciente_id: pacienteNum, medico_id: medicoNum, alta_id: altaNum, glasgow: glasgowNum };
  const created = await createPtaEnfermagemRepository(payload);


  if (altaNum !== null) {
    try {
      await updateAltaStatusRepository(altaNum, 'Finalizado');
      try {
        const newId = created?.id ?? created?.id_pta_enfermagem ?? null;
        if (newId) {
          await updateAltaDocumentoRepository(altaNum, 'PTA_ENFERMAGEM', Number(newId));
        }
        // update data_alta on alta if provided
        if (data && (data as any).data_alta) {
          try {
            await updateAltaDataAltaRepository(altaNum, (data as any).data_alta);
          } catch (errData) {
            console.error('Erro atualizando data_alta da alta (PTA Enfermagem):', errData);
          }
        }
      } catch (errDoc) {
        console.error('Erro atualizando documento da alta (PTA Enfermagem):', errDoc);
      }
    } catch (err) {
      console.error('Erro atualizando status da alta (PTA Enfermagem):', err);
    }
  }

  return created;
};

export const getPtaEnfermagemByIdService = async (id: number) => {
    if (!id || Number.isNaN(Number(id)) || id <= 0) return null;
    const pta = await getPtaEnfermagemByIdRepository(Number(id));
    return pta;
};
