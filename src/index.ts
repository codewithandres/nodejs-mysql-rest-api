import express from 'express';
import employeeRoute from './routes/employee.routes';

const app = express();

// Routes
app.use('/api', employeeRoute);

app.listen(3000);

console.log('Server is running on port 3000');
