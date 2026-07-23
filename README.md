# Cruza2 Staff Web

Página web independiente para formularios de staff.

No contiene archivos de MTA, Lua, `server`, `client` ni `config`.

## Novedades de esta versión

- Las preguntas seleccionables indican inmediatamente si la respuesta es correcta o incorrecta.
- El panel administrativo muestra el texto completo de la opción elegida, no solamente la letra.
- Cada respuesta automática aparece marcada como correcta o incorrecta.
- Las preguntas de desarrollo aparecen como revisión manual.
- Se agregó una pantalla de inicio de sesión.
- La sesión administrativa dura dos horas o hasta cerrar la pestaña/sesión del navegador.
- Se agregó el botón **Cerrar sesión**.

## Archivos

- `index.html`: formulario.
- `style.css`: diseño principal.
- `app.js`: preguntas, validación, corrección automática y guardado.
- `login.html`: inicio de sesión administrativo.
- `login.css`: diseño del login.
- `login.js`: validación local de credenciales.
- `admin.html`: panel de revisión.
- `admin.css`: diseño del panel.
- `admin.js`: lectura, filtrado, estados, exportación y borrado.
- `assets/`: logos del servidor.

## Cómo abrirla

Por compatibilidad con IndexedDB, abre el proyecto mediante un servidor web local.

### Visual Studio Code

1. Instala la extensión **Live Server**.
2. Abre esta carpeta.
3. Haz clic derecho en `index.html`.
4. Selecciona **Open with Live Server**.

El enlace **Acceso administrativo** abre `login.html`.

## Base de datos local

La página utiliza IndexedDB, integrada en el navegador.

Las solicitudes solo quedan guardadas en el mismo navegador, dispositivo y dominio donde fueron enviadas. El panel administrativo debe abrirse desde la misma dirección de Live Server.

## Advertencia de seguridad

Este login está hecho únicamente con HTML, CSS y JavaScript. Funciona como bloqueo visual/local, pero no es una protección real para una página pública: una persona con conocimientos puede inspeccionar o modificar el código del navegador.

Para publicar el formulario en Internet y proteger realmente el panel se necesita autenticación y base de datos del lado servidor, por ejemplo Supabase, Firebase o un backend propio.

## Control de un solo intento

Las preguntas de selección múltiple se bloquean en el primer clic:

- no se puede elegir otra opción después;
- volver a la pregunta no permite cambiarla;
- recargar la página conserva el intento activo;
- el borrador solo se elimina después de guardar correctamente la solicitud.

Al ser una página estática, alguien con conocimientos técnicos todavía podría borrar manualmente
el almacenamiento del navegador. La protección totalmente inviolable requiere un backend.

