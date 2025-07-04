import express, { type Application } from 'express';
import employeeRoutes from './routes/employee.routes';

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

app.listen(3000);

console.log('Server is running on port 3000');
