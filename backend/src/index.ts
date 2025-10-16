import express from 'express';
import cors from 'cors';
import { pool } from './db';

const app = express();
app.use(express.json());
app.use(cors());

import usuarioRoutes from './routes/usuarioRoutes';

app.use('/usuarios', usuarioRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});