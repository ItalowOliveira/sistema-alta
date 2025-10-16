import { Request, Response } from 'express';
import { createPacienteService } from '../services/pacientesServices';
import { getAllPacientesService } from '../services/pacientesServices';


export const createPaciente = async (req: Request, res: Response) => {
 try {
   const paciente = await createPacienteService(req.body);
   res.status(201).json({ paciente });
 } catch (error: any) {
   res.status(500).json({ error: error.message });
 }
};

export const getAllPacientes = async (req: Request, res: Response) => {
  try {
    const pacientes = await getAllPacientesService();
    res.status(200).json(pacientes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};