import { Request, Response } from 'express';

export const createPaciente = async (req: Request, res: Response) => {
 try {
   res.status(201).json({ message: 'Paciente criado com sucesso' });
 } catch (error: any) {
   res.status(500).json({ error: error.message });
 }
};

export const getAllPacientes = async (req: Request, res: Response) => {
 try {
   
   res.status(200).json({ pacientes: [] });
 } catch (error: any) {
   res.status(500).json({ error: error.message });
 }
};  
