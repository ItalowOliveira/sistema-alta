import api from "./apiClient";

export const getUserQuantity = async (): Promise<number> => {
    const response = await api.get<{ quantity: number }>("/dashboard");
    return response.data.quantity;
}

export const getDashboardMetrics = async (): Promise<{ pacientes: number; medicos: number; altas: { total: number; pending: number } }> => {
    const response = await api.get<{ pacientes: number; medicos: number; altas: { total: number; pending: number } }>("/dashboard/metrics");
    return response.data;
}