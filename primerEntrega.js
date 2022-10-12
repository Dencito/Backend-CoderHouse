class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this._nombre = nombre;
        this._apellido = apellido;
        this._libros = libros;
        this._mascotas = mascotas;;
    }

    getFullName() {
        return `${this._nombre} ${this._apellido}`;
    }

    addMascota(nombreMascota) {
        this._mascotas.push(nombreMascota);
    }

    countMascotas() {
        return this._mascotas.length;
    }

    addBook(titulo, nombreAutor) {
        this._libros.push({nombre: titulo, autor: nombreAutor})
    }

    getBookNames() {
        return this._libros.map( (libro) => libro.nombre)
    }
}

const libros = [
    {
        nombre: "Cien años de soledad",
        autor: "Gabriel Garcia Marquez"
    },
    {
        nombre: "Dracula",
        autor: "Bram Stroke"
    }

]

const user1 = new Usuario("Denar", "Padilla", libros ,["Perro", "Gato"])

console.log(user1.getFullName());

console.log('Contador de libros:',user1.getBookNames().length, user1.getBookNames());
user1.addBook("Agujeros negros y universos bebés y otros ensayos", "Stephen Hawking")
console.log('Contador de libros al agregar:',user1.getBookNames().length, user1.getBookNames());

console.log('Contador de mascotas:',user1.countMascotas()); // 2
user1.addMascota('Jirafa');
console.log('Contador de mascotas al agregar:',user1.countMascotas()); // 3