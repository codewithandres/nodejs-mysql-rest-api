import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate = (schema: z.ZodSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof z.ZodError) {
				res.status(400).json({
					success: false,
					message: 'Validation error',
					errors: error.errors,
				});
			}
			res.status(500).json({ success: false, message: 'Internal Server Error' });
		}
	};
};
