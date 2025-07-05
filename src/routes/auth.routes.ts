import { Router } from 'express';
import { register, login, logout, getProfile } from '@/controllers/auth.controllers';
import { validate } from '@/middleware/validation';
import { protect } from '@/middleware/auth.middleware'; // Importar el middleware
import { z } from 'zod';

const authRouter = Router();

// Schemas de validación
const registerSchema = z.object({
	email: z.string().email('Email inválido'),
	password: z.string().min(6, 'Password debe tener al menos 6 caracteres'),
	name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
});

const loginSchema = z.object({
	email: z.string().email('Email inválido'),
	password: z.string().min(1, 'Password requerido'),
});

// Rutas públicas
authRouter.post('/register', validate(registerSchema), register);
authRouter.post('/login', validate(loginSchema), login);

// Rutas protegidas
authRouter.post('/logout', protect, logout); // Proteger ruta
authRouter.get('/profile', protect, getProfile); // Proteger ruta

export default authRouter;
