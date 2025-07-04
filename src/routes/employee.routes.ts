import { Router } from 'express';
import {
	createEmployee,
	deleteEmployee,
	getEmployee,
	getEmployees,
	updateEmploye,
} from '../controllers/employee.controllers';

//?importaciones de controladores
import { validate } from '../middleware/validation';
import { createEmployeeSchema, updateEmployeeSchema } from '../schemas/employee.schema';

const routerEmployee = Router();

// ? rutas y controladores
routerEmployee.get('/employees', getEmployees);

routerEmployee.get('/employee/:id', getEmployee);

routerEmployee.post('/employee', validate(createEmployeeSchema), createEmployee);

routerEmployee.patch('/employee/:id', validate(updateEmployeeSchema), updateEmploye);

routerEmployee.delete('/employee/:id', deleteEmployee);

export default routerEmployee;
