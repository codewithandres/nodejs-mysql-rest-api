import { betterAuth } from 'better-auth';
import { createPool } from 'mysql2/promise';

export const auth = betterAuth({
	database: createPool({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'companydb',
	}),

	emailAndPassword: {
		enabled: true,
	},

	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 días
	},
});
