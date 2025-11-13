import express from 'express';
import cors from 'cors';
import { pool } from './db';
import { sessionMiddleware } from './middleware/sessionStore';

const app = express();
app.use(express.json());
// Allow credentials so the session cookie can be set across origin (assumes frontend at http://localhost:5173)
app.use(
  cors({
    origin: 'http://localhost:5173', // assumption: Vite dev server default
    credentials: true,
  })
);

// attach session info (reads sid cookie and populates req.sessionUser)
app.use(sessionMiddleware);

import usuarioRoutes from './routes/usuarioRoutes';
import pacientesRoutes from './routes/pacientesRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import ptsRoutes from './routes/ptsRoutes';
import altasRoutes from './routes/altasRoutes';
import ptaEnfermagemRoutes from './routes/ptaEnfermagemRoutes';
import ptaFisioterapiaRoutes from './routes/ptaFisioterapiaRoutes';
import ptaNutricaoRoutes from './routes/ptaNutricaoRoutes';
import ptaPsicologiaRoutes from './routes/ptaPsicologiaRoutes';
import ptaServicoSocialRoutes from './routes/ptaServicoSocialRoutes';


app.use('/pacientes', pacientesRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/altas', altasRoutes);
app.use('/pts', ptsRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/ptas/enfermagem', ptaEnfermagemRoutes);
app.use('/ptas/fisioterapia', ptaFisioterapiaRoutes);
app.use('/ptas/nutricao', ptaNutricaoRoutes);
app.use('/ptas/psicologia', ptaPsicologiaRoutes);
app.use('/ptas/servicosocial', ptaServicoSocialRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});