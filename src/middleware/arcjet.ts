import arcjet, { fixedWindow, shield } from '@arcjet/node';
import type { Request, Response, NextFunction } from 'express';

const aj = arcjet({
	key: process.env.ARCJET_KEY!,
	rules: [
		// Rate limiting: 100 requests per 15 minutes
		fixedWindow({
			mode: 'LIVE',
			characteristics: ['ip'],
			window: '15m',
			max: 100,
		}),
		// Shield against XSS and other attacks
		shield({
			mode: 'LIVE',
		}),
	],
});

export const arcjetMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const decision = await aj.protect(req, { ip: req.ip! });

	if (decision.isDenied()) {
		if (decision.reason.isRateLimit()) {
			res.status(429).json({
				success: false,
				message: 'Too many requests',
				retryAfter: decision.reason.resetTime,
			});
		}

		if (decision.reason.isShield()) {
			res.status(403).json({
				success: false,
				message: 'Request blocked for security reasons',
			});
		}

		res.status(403).json({
			success: false,
			message: 'Request denied',
		});
	}

	next();
};
