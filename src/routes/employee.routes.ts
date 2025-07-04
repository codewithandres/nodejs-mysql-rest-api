import { Router } from 'express';

//?impottaciones de controladores
import {
	createEmployee,
	deleteEmployee,
	getEmployee,
	getEmployees,
	updateEmploye,
} from '../controllers/employee.controllers';

const router = Router();

// ? rutas y controladores
router.get('/employees', getEmployees);

router.get('/employee/:id', getEmployee);

router.post('/employee', createEmployee);

router.patch('/employee/:id', updateEmploye);

router.delete('/employee/:id', deleteEmployee);

export default router;
