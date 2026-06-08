# Sistema de Blog en Tiempo Real - Frontend

Este repositorio contiene el sitio de consumo (Frontend) del sistema de Blog. Desarrollado con React y Vite.

## Instrucciones de Despliegue

### 1. Construccion
Navega a la carpeta del proyecto e instala las dependencias mediante npm:
```bash
npm install
```

Asegurate de que el backend este corriendo de forma local. La API base esta configurada para apuntar a `http://localhost:3000/api`.

### 2. Compilacion
Para generar el build de produccion (en caso de requerirse para despliegue final):
```bash
npm run build
```
Esto generara la carpeta `dist` con los assets optimizados y listos para produccion.

### 3. Ejecucion
Para correr la aplicacion en entorno de desarrollo local y realizar las pruebas de funcionalidad:
```bash
npm run dev
```
La aplicacion estara disponible en el puerto asignado por Vite (usualmente `http://localhost:5173`).

## Funcionalidades y Consumo de API

El frontend implementa y consume exitosamente todos los endpoints expuestos por la API, cumpliendo con los casos de prueba:
- Consumo de `/login`: Formulario de inicio de sesion con manejo de respuestas 200, 401 y 400. Almacenamiento seguro del access_token.
- Consumo de `/register`: Formulario con soporte `multipart/form-data` para envio de imagenes y redireccion en caso de exito (201). Manejo de errores de validacion (400).
- Consumo de `/me`: Proteccion de rutas internas y extraccion del perfil de usuario mediante cabeceras de autorizacion.
- Consumo de `/change-password`: Interfaz de actualizacion con verificacion visual de fuerza de contrasena.
- Consumo de `/feed` (GET y POST): Renderizado del muro de comentarios y formulario de publicacion en tiempo real.

## Metodologia de Inteligencia Artificial

Durante el proceso de desarrollo de este frontend, se utilizo Inteligencia Artificial bajo un modelo de programacion asistida para acelerar y mejorar la calidad del entregable:
1. Diseno UI/UX: Asistencia en la creacion de estilos modernos mediante CSS puro (Vanilla CSS), implementando interfaces limpias sin necesidad de frameworks de diseno externos.
2. Integracion de servicios: Generacion de la logica central de peticiones HTTP con Axios y configuracion de interceptores para la inyeccion automatica del token JWT.
3. Depuracion: Identificacion y correccion de errores de logica en validadores de contrasena y renderizado de componentes.
