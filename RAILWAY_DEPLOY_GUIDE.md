# Guía de Despliegue en Railway

## Preparación Completada ✅

- ✅ Script de producción configurado
- ✅ Puerto dinámico configurado
- ✅ Configuración de Railway creada

## Pasos para Desplegar

### 1. Crear cuenta en Railway
- Ir a [railway.app](https://railway.app)
- Registrarse con GitHub

### 2. Subir código a GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

### 3. Crear proyecto en Railway
1. Click "New Project"
2. Seleccionar "Deploy from GitHub repo"
3. Elegir tu repositorio
4. Railway detectará automáticamente Bun

### 4. Configurar Variables de Entorno
En Railway Dashboard → Variables:

```env
PORT=3000
DB_HOST=tu_host_mysql
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_DATABASE=companydb
ARCJET_KEY=tu_arcjet_key
```

### 5. Configurar Base de Datos

#### Opción A: MySQL en Railway
1. Click "New" → "Database" → "MySQL"
2. Copiar credenciales a variables de entorno

#### Opción B: Base de datos externa
- Usar PlanetScale, AWS RDS, etc.
- Configurar variables de entorno

### 6. Deploy
- Railway desplegará automáticamente
- URL disponible en el dashboard

## Comandos Útiles

```bash
# Desarrollo local
bun run dev

# Producción local
bun run start

# Build
bun run build
```

## Verificar Despliegue

```bash
curl https://tu-app.railway.app/api/employees
```

## Troubleshooting

### Error de conexión DB
- Verificar variables de entorno
- Comprobar whitelist de IPs

### Error de Arcjet
- Verificar ARCJET_KEY
- Comprobar límites de plan

### Error de puerto
- Railway asigna puerto automáticamente
- No cambiar PORT en variables