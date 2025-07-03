import express, { type Request, type Response } from 'express';
import { pool } from './db';
import type { RowDataPacket } from 'mysql2';

const app = express();

// Routes
app.get('/ping', async (req, res) => {
	const [rows] = await pool.query<RowDataPacket[]>('SELECT 1 + 1 AS TEST;');
	res.json({ message: 'resultado', result: rows });
});

app.get('/employes', (req: Request, res: Response) => {
	res.send('Obteniendo empleados..');
});

app.post('/employes', (req: Request, res: Response) => {
	res.send('Creando empleados');
});

app.put('/employes', (req, res) => {
	res.send('Actulaizar empleado..');
});

app.delete('/employes', (req, res) => {
	res.send('Eliminando empleado..');
});

app.listen(3000);

console.log('Server is running on port 3000');
