const fs = require("fs");

class Contenedor {
	constructor(ruta) {
		this.ruta = ruta;
	}
	
	async readFileFunction(ruta) {
		let archivo = await fs.promises.readFile(ruta, "utf-8");
		let archivoParsed = await JSON.parse(archivo);
		return archivoParsed;
	}

	async save(obj) {
		try {
			let dataArchivo = await this.readFileFunction(this.ruta);
			if (dataArchivo.length) {// dataArchivo.length = 0 -> false
				
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify(
						[...dataArchivo, { ...obj, id: dataArchivo.length + 1 }],
						null,
						2
					)
				);
				// ... spread operator -> copia el array y lo agrega al final
			} else {
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify([{ ...obj, id: dataArchParse.length + 1 }], null, 2)
				);
				console.log(`El archivo tiene id: ${dataArchivo.length + 1}`);
			}
		} catch (error) {
			console.log("error de escritura", error);
		}
	}

	async updateById(obj) {
		try {
			let dataArch = await this.readFileFunction(this.ruta);
			const objIndex = dataArch.findIndex(prod => prod.id === obj.id);
			if (objIndex !== -1) {// existe
				dataArch[objIndex] = obj;
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify(dataArch, null, 2)
				);
				return { message: "Producto actualizado" };
			} else {
				return { error: "Producto no encontrado" };
			}
		} catch (error) {
			console.log("Error de lectura", error);
		}
	}

	async getById(id) {
		try {
			const dataArchivo = await this.readFileFunction(this.ruta);
			const producto = dataArchivo.find(producto => producto.id === id);
			if (producto) {
				return producto;
			} else {
				return { error: "Producto no encontrado" };
			}
		} catch (error) {
			console.log("No existe el id", error);
		}
	}

	async getAll() {
		try {
			const dataArchivo = await this.readFileFunction(this.ruta);
			if (dataArchivo.length) {// dataArchivo.length = 0 -> false
				return dataArchivo;
			} else {
				console.log("No hay productos");
			}
		} catch (error) {
			console.log("Error de lectura", error);
		}
	}

	async deleteById(id) {
		try {
			const dataArchivo = await this.readFileFunction(this.ruta);
			let producto = dataArchivo.find(producto => producto.id === id);
			if (producto) {
				const dataArchParseFiltrado = dataArchivo.filter(
					prod => prod.id !== id
				);
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify(dataArchParseFiltrado, null, 2),
					"utf-8"
				);
				console.log("Producto eliminado");
			} else {
				console.log("No se encontró producto");
			}
		} catch (error) {
			console.log("No existe el id", error);
		}
	}

	/* async deleteAll() {
		try {
			let dataArchivo = await fs.promises.readFile(this.ruta, "utf8");
			if (dataArchParse.length) {
				await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2));
			} else {
				console.log("No hay productos que borrar");
			}
		} catch (error) {
			console.log("error de lectura", error);
		}
	} */
}

module.exports = { Contenedor };

// el Contenedor pide el archivo y como parametro la ruta
/* const contenedor = new Contenedor("./products.txt");
 */
//creamos los objetos en formato json uno por uno
/* contenedor.save({
    title: "Plasticola",
    price: 150,
thumbnail: "https://th.bing.com/th/id/OIP.8DJhupIbRWMFwvlV33nAhgAAAA?pid=ImgDet&rs=1"
}); */

/* contenedor.save({
    title: "Lapicera",
    price: 80,
thumbnail: "https://th.bing.com/th/id/R.fd12350ed0e1a4cc5db4a5ba4c9c1f0b?rik=VWSWLjwnrfrqGA&riu=http%3a%2f%2fwww.amoblamaq.com.ar%2fwp-content%2fuploads%2f2018%2f02%2flapicera-bic-azul-450x450.jpg&ehk=kk3qzTOB97i8mhmsDLH7SCLdY7ggLUhF3UJs0qN71NA%3d&risl=&pid=ImgRaw&r=0"
}); */

/* contenedor.save({
    title: "Tijera",
    price: 200,
thumbnail: "https://th.bing.com/th/id/R.fd12350ed0e1a4cc5db4a5ba4c9c1f0b?rik=VWSWLjwnrfrqGA&riu=http%3a%2f%2fwww.amoblamaq.com.ar%2fwp-content%2fuploads%2f2018%2f02%2flapicera-bic-azul-450x450.jpg&ehk=kk3qzTOB97i8mhmsDLH7SCLdY7ggLUhF3UJs0qN71NA%3d&risl=&pid=ImgRaw&r=0"
}); */

/* contenedor.save({
    title: "Cartuchera",
    price: 350,
thumbnail: "https://th.bing.com/th/id/R.cbf11b53b14835d2cea9495836eb131b?rik=yTqo1sUwaxT5MA&pid=ImgRaw&r=0"
}); */

//filtramos por id
/* contenedor.getById(3).then(data => console.log("el producto es: ", data)); */

//obtenemos todos los datos
/* contenedor.getAll().then(data => console.log(data));
 */
//eliminamos un productos por id
/* contenedor.deleteById(4);
contenedor.deleteById(5); // no se encontró producto
 */

//elimina todos los productos
//contenedor.deleteAll();