/**
MANEJO DE ARCHIVOS
Archivos

Introducción
- En todo sistema, es posible que nos topemos con la necesidad de que algunos datos persistan más allá de la ejecución del programa.
- Una de las opciones con las que contamos es el uso de archivos.
- Según el caso, existen ventajas y desventajas en utilizar el sistema de archivos como medio de almacenamiento de información.

Ventajas del uso de archivos
- Son fáciles de usar.
- No requieren el uso de programas externos para su creación, lectura o edición.
- En ocasiones, pueden ser abiertos y editados desde programas de edición de texto simples como un bloc de notas (¡siempre que se trate de texto!).
- Son fáciles de compartir o enviar a otros usuarios/programas.

Desventajas del uso de archivos
- Consultas sobre algún dato puntual entre todos los datos almacenados (y no podamos guardar todo el lote de datos en memoria).
- Ediciones de datos puntuales (que no requieren sobreescribir el archivo por completo).
- Lecturas que combinen datos obtenidos de varios archivos (nuevamente, suponiendo que no podemos guardar todos los datos en memoria).
- Probablemente sea mejor considerar el uso de un motor de base de datos.

Módulo nativo file system: fs
- fs es la abreviatura en inglés para file system o sistema de archivos y es, además, uno de los módulos más básicos y útiles de Node.js.
- En Node.js es posible manipular archivos a través de fs (crear, leer, modificar, etc.). 
- La mayoría de las funciones que contiene este módulo pueden usarse tanto de manera sincrónica como asincrónica.

ACLARACION: Hay que tener en cuenta que esto sólo aplica a Node.js, desde el navegador no es posible manipular archivos dado que sería muy inseguro.

Uso de fs en nuestro código
Para poder usar este módulo solo debemos importarlo con la función require al comienzo de nuestro archivo fuente:

const fs = require('fs')

FS: modo sincrónico
Operaciones Sincrónicas

- Las funciones sincrónicas terminan con “Sync”
- Son operaciones bloqueantes que devuelven un resultado

Podemos listar algunas de ellas:
- readFileSync: lectura de un archivo en forma sincrónica
- writeFileSync: escritura de un archivo en forma sincrónica
- appendFileSync: actualización de un archivo en forma sincrónica
- unlinkSync: borrado de un archivo en forma sincrónica
- mkdirSync: creación de una carpeta

Leer un archivo
- fs.readFileSync(path, encoding)

const data = fs.readFileSync('./test-input-sybc.txt', 'utf-8')
console.log(data)

- El primer parámetro es un string con la ruta del archivo que queremos leer
- El segundo parámetro indica el formato de codificación de caracteres con que fue escrito el dato que estamos leyendo
- El formato que utilizaremos con más frecuencia será 'utf-8' (inglés: 8-bit Unicode Transformation Format, español: Formato de Codificación de caracteres Unicode).

Acerca de las rutas...
- Si la ruta comienza con un '' o './' se trata de una ruta relativa. 
        - Supongamos que el programa se está ejecutando en la      carpeta '/user/documents/workspace/proyecto/' 
        - Si llamamos a alguna función con la ruta: './mi-archivo.txt' o 'mi-archivo.txt', estaremos en realidad leyendo la ruta: '/user/documents/workspace/proyecto/mi-archivo.txt'. 
- Si la ruta, en cambio, comienza con '/', estaremos leyendo exactamente esa ruta.

Sobreescribir un archivo
- fs.writeFileSync(ruta, datos)  //sobreescribe archivo

fs.whriteFileSync(...)

- El primer parámetro es un string con la ruta del archivo en el que queremos escribir 
- El segundo parámetro indica lo que queremos escribir. 
- La función admite un tercer parámetro opcional para indicar el formato de codificación de caracteres con que queremos escribir el texto: por defecto 'utf-8'.
- Si la ruta provista fuera válida, pero el nombre de archivo no existiera, la función creará un nuevo archivo con el nombre provisto.

Agregar contenidos a un archivo
- fs.appendFileSync(ruta, datos)  //agregar contenido a archivo

fs.appendFileSync(ruta, datos)

- El primer parámetro es un string con la ruta del archivo al que le queremos agregar contenidos
- El segundo parámetro indica lo que queremos agregar. 
- La función admite un tercer parámetro opcional para indicar el formato de codificación de caracteres con que queremos escribir el texto: por defecto 'utf-8'.
- Si la ruta provista fuera válida, pero el nombre de archivo no existiera, la función creará un nuevo archivo con el nombre provisto

Borrar un archivo
- fs.unlinkSync(ruta)
- El único parámetro es un string con la ruta del archivo que queremos borrar.

Manejo de errores
try {
  const data = fs.readFileSync('/ruta/que/no/existe')
} catch (err) {
  console.log(err)
}
Ante una situación de error, las excepciones se lanzan inmediatamente y se pueden manejar usando try… catch.
Esta forma de capturar errores se puede utilizar en todas las funciones sincrónicas de acceso al sistema de archivos.

FS: modo asincrónico vía Callbacks
Introducción: fs con Callbacks
- Las funciones asincrónicas tiene el mismo nombre que sus versiones sincrónicas, pero sin la palabra “Sync” al final
- Son operaciones no bloqueantes
- Reciben un nuevo último parámetro: un callback. 
- Los callbacks pueden recibir un primer parámetro destinado al error (si lo hubiere) para saber cómo manejarlo y un segundo parámetro, en caso de que la función en cuestión devuelva algún resultado, para indicar qué hacer con el mismo. 
- Para manejar los errores que pueden surgir de su ejecución, no será necesario ejecutarlas utilizando try / catch.

Operaciones Asincrónicas
Podemos listar algunas de ellas:
- readFile: lectura de un archivo en forma asincrónica
- writeFile: escritura de un archivo en forma asincrónica
- appendFile: actualización de un archivo en forma asincrónica
- unlink: borrado de un archivo en forma asincrónica
- mkdir: creación de una carpeta

Leer un archivo
- fs.readFile(ruta, encoding, callback)
- Recibe los mismos parámetros que su versión sincrónica, más el callback. La función se encarga internamente de abrir y cerrar el archivo una vez finalizado su uso.

Sobreescribir un archivo
- fs.writeFile(ruta, datos, callback)  //sobreescribe archivo
- Recibe los mismos parámetros que su versión sincrónica, más el callback con un parámetro para manejar algún eventual error. La función se encarga internamente de abrir y cerrar el archivo una vez finalizado su uso.

Agregar contenidos a un archivo
- fs.appendFile(ruta, datos, callback)  //agregar contenido a archivo
- Recibe los mismos parámetros que su versión sincrónica, más el callback con un parámetro para manejar algún eventual error. La función se encarga internamente de abrir y cerrar el archivo una vez finalizado su uso.

Borrar un archivo
- fs.unlink(ruta, callback)
- Recibe los mismos parámetros que su versión sincrónica, más el callback con un parámetro para manejar algún eventual error. La función se encarga internamente de abrir y cerrar el archivo una vez finalizado su uso.

Otras funciones útiles

Crear una carpeta
- fs.mkdir(ruta, callback)
- Recibe los mismos parámetros que su versión sincrónica, más el callback con un parámetro para manejar algún eventual error.
Esta función también se encuentra en su versión sincrónica (mkdirSync).

Leer el contenido de una carpeta
- fs.readdir(ruta, callback)
- Recibe los mismos parámetros que su versión sincrónica, más el callback con un parámetro para manejar algún eventual error.
Esta función también se encuentra en su versión sincrónica (readdirSync).

*/