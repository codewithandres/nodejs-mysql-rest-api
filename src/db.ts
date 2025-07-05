import { createPool } from 'mysql2/promise';

export const pool = createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	port: 3306,
	database: 'companydb',
});

// export const pool = createPool({
// 	host: DB_HOST!,
// 	user: DB_USER!,
// 	password: DB_PASSWORD!,
// 	port: DB_PORT!,
// 	database: DB_DATABASE!,
// });
