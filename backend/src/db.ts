import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sistema_saude',
    password: 'Teste@2025',
    port: 5432
});