import express, { type Application } from 'express';
import employeeRoutes from './routes/employee.routes';
import './config/index';
import { PORT } from './config/index';
import { arcjetMiddleware } from './middleware/arcjet';
import routerEmployee from './routes/employee.routes';

const app = express();

app.use(express.json());
// Arcjet protection
app.use(arcjetMiddleware);

// Routes
app.use('/api', routerEmployee);

app.use((req, res, next) => {
	res.status(404).json({
		message: 'endpoint not found',
	});
	next();
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
