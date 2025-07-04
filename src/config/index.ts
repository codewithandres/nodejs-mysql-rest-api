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
export const { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
