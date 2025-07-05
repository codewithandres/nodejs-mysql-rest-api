import express from 'express';
import './config/index';
import { PORT } from '@/config/index';

import { arcjetMiddleware } from '@/middleware/arcjet';

import routerEmployee from '@/routes/employee.routes';
import authRouter from './routes/auth.routes';

const app = express();

// Configuración básica
app.set('trust proxy', true);
app.use(express.json());

// Arcjet protection (opcional)
// app.use(arcjetMiddleware);

// Routes
app.use('/api', authRouter);
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
