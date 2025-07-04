import { z } from 'zod';

export const createEmployeeSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	salary: z.number().positive('Salary must be positive')
});

export const updateEmployeeSchema = z.object({
	name: z.string().min(1).optional(),
	salary: z.number().positive().optional()
});