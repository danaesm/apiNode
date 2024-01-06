# README
 
## Instrucciones para iniciar el proyecto

* Clonar el repositorio.
* Bajar los archivos.
* Correr el comando npm install
* Correr el comando npm run start
* El proyecto estará corriendo en el puerto 3000, por lo que las URL de la API tendrán este puerto.
* El archivo sql se encuentra en este mismo directorio.

## URLs

### Usuarios
* http://localhost:3000/auth/login
  * Iniciar sesión
  * POST
    * Recibe email y contraseña
* http://localhost:3000/auth/register
  * Registrar
  * POST
    * Recibe email, nombre y contraseña
* http://localhost:3000/books
  * GET
  * Muestra los libros existentes
* http://localhost:3000/books/id
  * GET
  * Muestra el libro con ese id
* http://localhost:3000/books
  * POST
  * Insertar un libro
  * recibe todos los campos del libro, excepto el id o un json con la sig. estructura:

```json
{
"nombre": "Ejemplo",
"edad": 25,
"ubicacion": {
"ciudad": "Ciudad de Ejemplo",
"pais": "País de Ejemplo"
},
"intereses": ["Programación", "Viajes", "Deportes"]
}
```

* http://localhost:3000/books/id
  * DELETE
  * Eliminar el libro con ese id
* http://localhost:3000/books/id
  * PUT
  * Actualizar el libro con ese id
