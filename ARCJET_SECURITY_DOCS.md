# Protección de API con Arcjet

## Instalación

```bash
bun add @arcjet/node
```

## Configuración

### 1. Variables de entorno

Agregar en `.env`:
```env
ARCJET_KEY=your_arcjet_key_here
```

### 2. Middleware de Arcjet

**Archivo:** `src/middleware/arcjet.ts`

```typescript
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

export const arcjetMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const decision = await aj.protect(req);

	if (decision.isDenied()) {
		if (decision.reason.isRateLimit()) {
			return res.status(429).json({
				success: false,
				message: 'Too many requests',
				retryAfter: decision.reason.resetTime
			});
		}

		if (decision.reason.isShield()) {
			return res.status(403).json({
				success: false,
				message: 'Request blocked for security reasons'
			});
		}

		return res.status(403).json({
			success: false,
			message: 'Request denied'
		});
	}

	next();
};
```

### 3. Implementación en servidor

```typescript
import { arcjetMiddleware } from './middleware/arcjet';

app.use(express.json());
app.use(arcjetMiddleware); // Aplicar antes de las rutas
app.use('/api', routes);
```

## Configuraciones Disponibles

### Rate Limiting

```typescript
fixedWindow({
	mode: 'LIVE', // 'DRY_RUN' para testing
	characteristics: ['ip'], // También: ['userId', 'sessionId']
	window: '15m', // '1h', '1d', '1w'
	max: 100, // Máximo requests por ventana
})
```

### Shield (Protección XSS/Ataques)

```typescript
shield({
	mode: 'LIVE', // 'DRY_RUN' para testing
})
```

### Bot Detection

```typescript
import { detectBot } from '@arcjet/node';

detectBot({
	mode: 'LIVE',
	allow: [], // IPs permitidas
	deny: [], // IPs bloqueadas
})
```

## Obtener Clave de Arcjet

1. Registrarse en [arcjet.com](https://arcjet.com)
2. Crear nuevo proyecto
3. Copiar la clave API
4. Agregar a `.env`

## Respuestas de Error

### Rate Limit (429)
```json
{
	"success": false,
	"message": "Too many requests",
	"retryAfter": "2024-01-01T12:00:00Z"
}
```

### Shield/XSS (403)
```json
{
	"success": false,
	"message": "Request blocked for security reasons"
}
```

## Protecciones Incluidas

- **Rate Limiting**: Previene spam y ataques DDoS
- **XSS Protection**: Bloquea scripts maliciosos
- **SQL Injection**: Detecta patrones de inyección
- **Bot Detection**: Identifica tráfico automatizado
- **IP Blocking**: Bloquea IPs maliciosas conocidas