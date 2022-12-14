const fs = require("fs");

class Contenedor {
	constructor(ruta) {
		this.ruta = ruta;
	}

	async save(obj) {
		try {
			let dataArchivo = await fs.promises.readFile(this.ruta, "utf8");
			let dataArchParse = JSON.parse(dataArchivo); 
			if (dataArchParse.length) { // [].length = 0  false
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify(
						[...dataArchParse, { ...obj, id: dataArchParse.length + 1 }],
						null,
						2
					)
				);

			} else {
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify([{ ...obj, id: dataArchParse.length + 1 }], null, 2)
				);
				console.log(`El archivo tiene id: ${dataArchParse.length + 1}`);
			}
		} catch (error) {
			console.log("error de escritura", error);
		}
	}

	async getById(id) {
		try {
			let dataArchivo = await fs.promises.readFile(this.ruta, "utf-8");
			let dataArchParse = JSON.parse(dataArchivo);
			let producto = dataArchParse.find(producto => producto.id === id);
			if (producto) {
				return producto;
			} else {
				console.log("No se encontrĂ³ producto");
				return null;
			}
		} catch (error) {
			console.log("no existe el id", error);
		}
	}

	async getAll() {
		try {
			let dataArchivo = await fs.promises.readFile(this.ruta, "utf-8");
			let dataArchParse = JSON.parse(dataArchivo);
			if (dataArchParse.length) {// [].length = 0  false
				return dataArchParse;
			} else {
				console.log("No hay productos");
			}
		} catch (error) {
			console.log("error de lectura", error);
		}
	}

	async deleteById(id) {
		try {
			let dataArchivo = await fs.promises.readFile(this.ruta, "utf-8");
			let dataArchParse = JSON.parse(dataArchivo);
			let producto = dataArchParse.find(producto => producto.id === id);
			if (producto) {
				const dataArchPaseFiltrado = dataArchParse.filter(
					producto => producto.id !== id
				);
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify(dataArchPaseFiltrado, null, 2)
				);
				console.log("Producto eliminado");
			} else {
				console.log("No se encontrĂ³ producto");
				return null;
			}
		} catch (error) {
			console.log("no existe el id", error);
		}
	}

	async deleteAll() {
		try {
			let dataArchivo = await fs.promises.readFile(this.ruta, "utf8");
			let dataArchParse = JSON.parse(dataArchivo);
			if (dataArchParse.length) {
				await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2));
			} else {
				console.log("No hay productos que borrar");
			}
		} catch (error) {
			console.log("error de lectura", error);
		}
	}
}

// el Contenedor pide el archivo y como parametro la ruta
const contenedor = new Contenedor("./products.txt");

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
contenedor.getById(3).then(data => console.log("el producto es: ", data));

//obtenemos todos los datos
contenedor.getAll().then(data => console.log(data));

//eliminamos un productos por id
contenedor.deleteById(4);
contenedor.deleteById(5); // no se encontrĂ³ producto


//elimina todos los productos
//contenedor.deleteAll();