import type { Request, Response } from 'express';

export const getEmployee = (req: Request, res: Response) => {
	res.send('Obteniendo empleados..');
};

export const createEmployee = (req: Request, res: Response) => {
	res.send('Creando empleados');
};

export const updateEmploye = (req: Request, res: Response) => {
	res.send('Actulaizar empleado..');
};

export const deleteEmployee = (req: Request, res: Response) => {
	res.send('Eliminando empleado..');
};
