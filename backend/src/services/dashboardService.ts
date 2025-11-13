import { getPacientesQuantity } from "../repositories/dashboardRepository";

export const getPacientesQuantityService = async (userId?: number) => {
    const quantity = await getPacientesQuantity(userId);
    return quantity;
}

import { getMedicosQuantity, getAltasCounts } from "../repositories/dashboardRepository";

export const getDashboardMetricsService = async (userId?: number) => {
    // pacientes and medicos are system totals; altas are user-scoped
    const pacientes = await getPacientesQuantity();
    const medicos = await getMedicosQuantity();
    const altas = await getAltasCounts(userId);
    return {
        pacientes,
        medicos,
        altas,
    };
}