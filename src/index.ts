import express from 'express';
import './config/index';
import { PORT } from '@/config/index';
import { arcjetMiddleware } from '@/middleware/arcjet';
import routerEmployee from '@/routes/employee.routes';
import { pool } from './db';

const app = express();

app.use(express.json());
// Arcjet protection
app.use(arcjetMiddleware);

// Routes
app.use('/api', routerEmployee);

app.get('/api/setup', async (req, res) => {
	try {
		await pool.query(`CREATE TABLE IF NOT EXISTS employee ( 
			id INT(11) NOT NULL AUTO_INCREMENT,
			name VARCHAR(45) DEFAULT NULL,
			salary INT(5) DEFAULT NULL,
			PRIMARY KEY (id)
		)`);

		res.json({ success: true, message: 'Tabla creada exitosamente' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Error creando tabla' });
	}
});

app.get('/api/insert', async (req, res) => {
	try {
		await pool.query(`INSERT INTO employee (name, salary) VALUES 
				('John Doe', 50000),
				('Jane Smith', 60000),
				('Bob Johnson', 45000);
		)`);

		res.json({ success: true, message: 'Datos insertados en la Tabla  exitosamente' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Error creando tabla' });
	}
});

app.use((req, res, next) => {
	res.status(404).json({
		message: 'endpoint not found',
	});
	next();
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
