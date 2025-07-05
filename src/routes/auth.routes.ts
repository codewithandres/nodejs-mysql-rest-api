// src/routes/auth.routes.ts
import { auth } from '@/config/better-auth.config';
import { Router } from 'express';
import { toNodeHandler } from 'better-auth/node';

const authRouter = Router();

authRouter.all('/auth/*splat', toNodeHandler(auth));

export default authRouter;
