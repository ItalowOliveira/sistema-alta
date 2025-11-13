import { Response, Request } from "express";
import { getPacientesQuantityService } from "../services/dashboardService";
import { getDashboardMetricsService } from "../services/dashboardService";

export const getPacientesQuantity = async (req: Request, res: Response) => {
    try {
        // sessionUser is attached by session middleware; if present, filter counts by user id
    const sessionUser = (req as any).sessionUser;
    const userId = sessionUser ? sessionUser.id : undefined;
    const quantity = await getPacientesQuantityService(userId);
    res.status(200).json({ quantity, sessionUserId: userId ?? null });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getDashboardMetrics = async (req: Request, res: Response) => {
    try {
        const sessionUser = (req as any).sessionUser;
            // support debug override via ?userId for testing without login
            const qsUserId = req.query.userId ? Number(req.query.userId) : undefined;
            const userId = qsUserId ?? (sessionUser ? sessionUser.id : undefined);
        const metrics = await getDashboardMetricsService(userId);
    res.status(200).json({ ...metrics, sessionUserId: userId ?? null });
    } catch (error: any) {
    // return safe defaults so frontend cards can render zeros instead of undefined
    const defaults = { pacientes: 0, medicos: 0, altas: { total: 0, pending: 0 }, error: String(error?.message ?? error), sessionUserId: null };
    res.status(200).json(defaults);
    }
}