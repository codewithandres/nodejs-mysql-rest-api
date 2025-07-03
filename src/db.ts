import { createPool } from 'mysql2/promise';

// ? connectarse ha mysql
export const pool = createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	port: 3306,
	database: 'companydb',
});
