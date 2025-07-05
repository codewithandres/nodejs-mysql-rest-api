import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '@/config/better-auth.config';
import type { User } from 'better-auth';
import type { NextFunction, Request, Response } from 'express';

export const requireAuth = async (
	req: Request & { user?: User },
	res: Response,
	next: NextFunction
) => {
	const session = await auth.api.getSession({
		headers: fromNodeHeaders(req.headers),
	});

	if (!session) {
		res.status(401).json({ error: 'No Autorizado' });
		return;
	}

	res.json(session);
	next();
};
