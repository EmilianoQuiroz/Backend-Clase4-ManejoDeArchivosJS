const fs = require('fs')

/** Muestra el contenido de un archivo por consola */
const contenido = fs.readFileSync('./ejemplosClase/fs-sync.js', 'utf-8')
console.log(contenido)

//Crea un nuevo archivo en la ruta indicada
fs.writeFileSync('./prueba.txt', 'Esto es un texto de prueba')

//Para eliminar un archivo
fs.rmSync('./prueba.txt')
