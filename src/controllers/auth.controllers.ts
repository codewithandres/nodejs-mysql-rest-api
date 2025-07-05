import { auth } from '@/config/better-auth.config';
import { fromNodeHeaders } from 'better-auth/node';
import type { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
	try {
		const { email, password, name } = req.body;

		const user = await auth.api.signUpEmail({
			body: { email, password, name },
			headers: fromNodeHeaders(req.headers),
		});

		res.status(201).json({
			success: true,
			message: 'Usuario registrado exitosamente',
			user: user.user,
		});
	} catch (error: any) {
		console.log(error);

		return res.status(400).json({
			success: false,
			message: error.message || 'Error al registrar usuario',
		});
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const session = await auth.api.signInEmail({
			body: { email, password },
			headers: fromNodeHeaders(req.headers),
		});

		res.status(200).json({
			success: true,
			message: 'Login exitoso',
			user: session.user,
		});
		
	} catch (error: any) {
		return res.status(401).json({
			success: false,
			message: error.message || 'Credenciales inválidas',
		});
	}
};

export const logout = async (req: Request, res: Response) => {
	try {
		await auth.api.signOut({
			headers: fromNodeHeaders(req.headers),
		});

		res.status(200).json({
			success: true,
			message: 'Logout exitoso',
		});
	} catch (error: any) {
		return res.status(400).json({
			success: false,
			message: error.message || 'Error al cerrar sesión',
		});
	}
};

export const getProfile = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;

  res.status(200).json({
    success: true,
    user,
  });
};
