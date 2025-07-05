import { betterAuth } from 'better-auth';
import { createPool } from 'mysql2/promise';
import type { Request } from 'express';

export const auth = betterAuth({
	database: createPool({
		host: process.env.DB_HOST || 'localhost',
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_DATABASE || 'companydb',
		port: Number(process.env.DB_PORT) || 3306,
	}),

	emailAndPassword: {
		enabled: true,
	},

	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 días
	},

});
