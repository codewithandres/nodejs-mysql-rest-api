import type { Request, Response } from 'express';
import { pool } from '../db';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

export const getEmployees = async (req: Request, res: Response) => {
	const rows = await pool.query<RowDataPacket[]>('SELECT * FROM employee');
	res.status(200).json({ sucsses: true, message: rows.at(0) });
};

export const getEmployee = async (req: Request, res: Response) => {
	const { id } = req.params;
	const [rows] = await pool.query<RowDataPacket[]>(
		'SELECT id, name, salary FROM employee WHERE id = ? ',
		[id]
	);

	if (rows.length <= 0)
		return res.status(404).json({ sucsses: false, message: 'Employee not found' });

	res.status(200).json({ sucsses: true, message: rows.at(0) });
};

export const createEmployee = async (req: Request, res: Response) => {
	const { name, salary } = req.body;
	const [rows] = await pool.query<ResultSetHeader>(
		'INSERT INTO employee (name, salary) VALUES (?, ?)',
		[name, salary]
	);

	res.status(200).json({ sucsses: true, message: { id: rows?.insertId, name, salary } });
};

export const updateEmploye = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, salary } = req.body;

	const [rows] = await pool.query<ResultSetHeader>(
		'UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?',
		[name, salary, id]
	);

	if (rows.affectedRows <= 0)
		return res.status(404).json({ success: false, message: 'Employee not found' });
	// ? BUSCAR EL EMPLEADO ACTUALIZADO MEDIANTE EL ID DEL EMPLEADO
	const [result] = await pool.query<RowDataPacket[]>(
		'SELECT id, name, salary  FROM  employee WHERE id = ?',
		[id]
	);
	console.log(result);

	res.status(200).json({ success: true, message: result.at(0) });
};

export const deleteEmployee = async (req: Request, res: Response) => {
	const { id } = req.params;
	// ? consulta para actualizar un empleado
	const [rows] = await pool.query<ResultSetHeader>('DELETE FROM employee WHERE id = ?', [
		id,
	]);

	if (rows.affectedRows <= 0)
		res.status(404).json({ success: false, message: 'Employee not found' });

	res.status(200).json({ success: true, message: 'delete employee' });
};
