import type { Request, Response } from 'express';
import { pool } from '../db';
import type { QueryResult, ResultSetHeader, RowDataPacket } from 'mysql2';

export const getEmployee = (req: Request, res: Response) => {
	res.send('Obteniendo empleados..');
};

export const createEmployee = async (req: Request, res: Response) => {
	const { name, salary } = req.body;

	const [rows] = await pool.query<ResultSetHeader>(
		'INSERT INTO employee (name, salary) VALUES (?, ?)',
		[name, salary]
	);

	console.log(rows.insertId);

	res.status(200).json({ sucsses: true, message: { id: rows?.insertId, name, salary } });
};

export const updateEmploye = (req: Request, res: Response) => {
	res.send('Actulaizar empleado..');
};

export const deleteEmployee = (req: Request, res: Response) => {
	res.send('Eliminando empleado..');
};
