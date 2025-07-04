//? Variables de entorno

declare module 'bun' {
	interface Env {
		PORT: string;
		DB_HOST: string;
		DB_PORT: number;
		DB_USER: string;
		DB_PASSWORD: string;
		DB_DATABASE: string;
	}
}

// Import dotenv for environment variable management
// @ts-ignore

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || '5432';
export const DB_USER = process.env.DB_USER || 'default_user';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_DATABASE = process.env.DB_DATABASE || 'default_db';
