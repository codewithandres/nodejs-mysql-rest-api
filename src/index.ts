import express, { type Application } from 'express';
import employeeRoutes from './routes/employee.routes';
import './config/index';
import { PORT } from './config/index';

const app: Application = express();

app.use(express.json());
// Routes
app.use('/api', employeeRoutes);

app.use((req, res, nex) => {
	res.status(404).json({
		message: 'endpoint not found',
	});
	nex();
});

app.listen(PORT);
