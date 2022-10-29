const express = require("express");
const { Contenedor } = require("./contenedor");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ express: true }));
app.use(express.json());
app.use(express.static("public"));

const { Router } = express;
const routerProductos = Router();

routerProductos.get("/", async (req, res) => {
	const contenedor = new Contenedor("./productos.txt");
	console.log(contenedor);
	const productos = await contenedor.getAll();
	res.json({ productos });
});

routerProductos.get("/:id", async (req, res) => {
	const { id } = req.params;
	const contenedor = new Contenedor("./productos.txt");

	const producto = await contenedor.getById(parseInt(id));
	console.log(producto);
	res.json({ producto });
});

routerProductos.post("/", async (req, res) => {
	const objProducto = req.body;
	const contenedor = new Contenedor("./productos.txt");
	contenedor.save(objProducto);
	res.json({ message: "Producto guardado", objProducto });
});

routerProductos.put("/:id", async (req, res) => {
	const { id } = req.params;
	const objProducto = req.body;

	const contenedor = new Contenedor("./productos.txt");
	contenedor.updateById({ id: parseInt(id), ...objProducto });
	res.json({ message: "Producto actualizado" });
});

routerProductos.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const contenedor = new Contenedor("./productos.txt");
	contenedor.deleteById(parseInt(id));
	res.json({ message: "Producto eliminado" });
});


app.use("/api/productos", routerProductos);

app.listen(PORT, err => {
	if (err) throw err;
	console.log(`Server running on port ${PORT}`);
});
