import { Router } from 'express';

//?impottaciones de controladores
import {
	createEmployee,
	deleteEmployee,
	getEmployee,
	updateEmploye,
} from '../controllers/employee.controllers';

const router = Router();

// ? rutas y controladores
router.get('/employes', getEmployee);

router.post('/employes', createEmployee);

router.put('/employes', updateEmploye);

router.delete('/employes', deleteEmployee);

export default router;
