import { createPtaPsicologiaRepository, getPtaPsicologiaByIdRepository } from '../repositories/ptaPsicologiaRepository';
import { updateAltaStatusRepository, updateAltaDocumentoRepository, updateAltaDataAltaRepository } from '../repositories/altasRepository';

export const createPtaPsicologiaService = async (data: any) => {
  console.debug('createPtaPsicologiaService payload:', data);
    // Accept multiple possible field names for compatibility with different clients
    const rawPaciente = (data as any).paciente_id ?? (data as any).id_paciente ?? (data as any).paciente ?? (data as any).idPaciente ?? null;
    const rawMedico = (data as any).medico_id ?? (data as any).medico ?? (data as any).id_medico_responsavel ?? (data as any).medico_responsavel_id ?? (data as any).idMedico ?? null;
    const rawAlta = (data as any).alta_id ?? (data as any).id_internacao ?? (data as any).id_alta ?? (data as any).idInternacao ?? null;

    const toNumberOrNull = (v: any) => (v === null || v === undefined || v === '' ? null : Number(v));
    const pacienteNum = toNumberOrNull(rawPaciente);
    const medicoNum = toNumberOrNull(rawMedico);
    const altaNum = toNumberOrNull(rawAlta);

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
  const created = await createPtaPsicologiaRepository(payload);
  console.debug('createPtaPsicologiaService created:', created);

  if (altaNum !== null) {
    try {
  console.debug('Updating alta status for alta_id:', altaNum);
  const statusResult = await updateAltaStatusRepository(altaNum, 'Finalizado');
  console.debug('updateAltaStatusRepository result:', statusResult);
      try {
        // some repositories return different id field names (id, id_pta_psicologia ...)
        const newId = created?.id ?? created?.id_pta_psicologia ?? null;
        console.debug('Determined new PTA id:', newId);
        if (newId) {
          const docResult = await updateAltaDocumentoRepository(altaNum, 'PTA_PSICOLOGIA', Number(newId));
          console.debug('updateAltaDocumentoRepository result:', docResult);
          console.debug('Updated alta documento for alta_id:', altaNum, 'documento_id:', newId);
        }
          // update data_alta if provided
          if (data && (data as any).data_alta) {
            try {
              await updateAltaDataAltaRepository(altaNum, (data as any).data_alta);
            } catch (errData) {
              console.error('Erro atualizando data_alta da alta (PTA Psicologia):', errData);
            }
          }
      } catch (errDoc) {
        console.error('Erro atualizando documento da alta (PTA Psicologia):', errDoc);
      }
    } catch (err) {
      console.error('Erro atualizando status da alta (PTA Psicologia):', err);
    }
  }

  return created;
};

export const getPtaPsicologiaByIdService = async (id: number) => {
  if (!id || Number.isNaN(Number(id)) || id <= 0) return null;
  const pta = await getPtaPsicologiaByIdRepository(Number(id));
  return pta;
};
