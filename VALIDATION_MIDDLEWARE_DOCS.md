# Middleware de Validación con Zod

## Instalación

```bash
bun add zod
```

## Estructura de archivos

```
src/
├── middleware/
│   └── validation.ts
├── schemas/
│   └── [entity].schema.ts
└── routes/
    └── [entity].routes.ts
```

## 1. Middleware de Validación

**Archivo:** `src/middleware/validation.ts`

```typescript
import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate = (schema: z.ZodSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof z.ZodError) {
				return res.status(400).json({
					success: false,
					message: 'Validation error',
					errors: error.errors
				});
			}
			return res.status(500).json({ success: false, message: 'Internal Server Error' });
		}
	};
};
```

## 2. Esquemas de Validación

**Archivo:** `src/schemas/[entity].schema.ts`

```typescript
import { z } from 'zod';

// Para crear
export const createEntitySchema = z.object({
	field1: z.string().min(1, 'Field1 is required'),
	field2: z.number().positive('Field2 must be positive'),
	field3: z.string().email('Invalid email format').optional()
});

// Para actualizar
export const updateEntitySchema = z.object({
	field1: z.string().min(1).optional(),
	field2: z.number().positive().optional(),
	field3: z.string().email().optional()
});
```

## 3. Uso en Rutas

**Archivo:** `src/routes/[entity].routes.ts`

```typescript
import { Router } from 'express';
import { validate } from '../middleware/validation';
import { createEntitySchema, updateEntitySchema } from '../schemas/entity.schema';
import { createEntity, updateEntity } from '../controllers/entity.controllers';

const router = Router();

router.post('/entity', validate(createEntitySchema), createEntity);
router.patch('/entity/:id', validate(updateEntitySchema), updateEntity);

export default router;
```

## Tipos de Validación Comunes

```typescript
// Strings
z.string()                    // String básico
z.string().min(1)            // No vacío
z.string().max(100)          // Máximo 100 caracteres
z.string().email()           // Email válido
z.string().url()             // URL válida

// Números
z.number()                   // Número básico
z.number().positive()        // Positivo
z.number().min(0)           // Mínimo 0
z.number().max(100)         // Máximo 100
z.number().int()            // Entero

// Opcionales
z.string().optional()        // Campo opcional
z.number().nullable()        // Puede ser null

// Arrays
z.array(z.string())         // Array de strings
z.array(z.number()).min(1)  // Array no vacío

// Objetos anidados
z.object({
	nested: z.object({
		field: z.string()
	})
})
```

## Respuesta de Error

```json
{
	"success": false,
	"message": "Validation error",
	"errors": [
		{
			"code": "too_small",
			"minimum": 1,
			"type": "string",
			"inclusive": true,
			"exact": false,
			"message": "Name is required",
			"path": ["name"]
		}
	]
}
```

## Ejemplo Completo

```typescript
// Schema
export const userSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email'),
	age: z.number().min(18, 'Must be 18+')
});

// Ruta
router.post('/user', validate(userSchema), createUser);

// Request válido
{
	"name": "John",
	"email": "john@example.com",
	"age": 25
}
```