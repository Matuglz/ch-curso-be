import fs from 'fs/promises'


class Product {
  constructor({ id, title, description, price, thumbnail, code, stock }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.status = true
  }
}

class ProductManager {
  ultimoID = 0;
  constructor(products = []) {
    this.products = products;
  }

  newID() {
    this.ultimoID++;
    return this.ultimoID;
  }
  async addProduct({ title, description, price, thumbnail, code, stock }) {
    if (this.products.find((e) => e.code === code)) {
      throw new Error("este producto ya existe");
    }

    const id = this.newID();

    const newProduct = new Product({
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
    this.products.push(newProduct);
    await this.saveProducts()
    return newProduct;
  }

  async saveProducts() {
    await fs.writeFile("db/products.json", `${JSON.stringify(this.products)}`)
  }

  async getProducts() {
    try {
      const data = await fs.readFile('db/products.json', 'utf-8');
      const db = JSON.parse(data);
      return db
    } catch (error) {
      throw new Error(`Error al leer el archivo`);
    }
  }

  async deleteProduct(id) {
    let data = await fs.readFile("db/products.json", "utf-8");
    let prod = JSON.parse(data)
    let sinProd = prod.filter(p => p.id !== id)
    await fs.writeFile("db/products.json", `${JSON.stringify(sinProd)}`)
    this.products = sinProd
    this.saveProducts()
  }

  async getProductById(id) {
    let prod = await this.getProducts()
    const productoBuscado = prod.filter(p => p.id == id)
    if (productoBuscado.length == 0) {
      throw new Error("este producto no existe");
    } else {
      console.log(productoBuscado);
      return productoBuscado;

    }
  }

  async updateProductById(prodId, title, description, price, thumbnail, code, stock) {
    let prod = this.products.find((p) => p.id === prodId)
    let prods = this.products.filter((p) => p.id !== prodId)
    prod.title = title
    prod.description = description
    prod.price = price
    prod.thumbnail = thumbnail
    prod.code = code
    prod.stock = stock
    let prodsActualizados = [...prods, prod]
    this.products = prodsActualizados
    this.saveProducts()
  }

  async updateProductQuantityById(prodId, quantity){
  let prod = this.products.find((p) => p.id === prodId)
  let prods = this.products.filter((p) => p.id !== prodId)
  prod.stock -= quantity
  let prodsActualizados = [...prods, prod]
  this.products = prodsActualizados
  this.saveProducts()
  }
}

const pm = new ProductManager();


// Producto 1
await pm.addProduct({
  title: "Jabón de ducha",
  description: "Jabón Rexona azul",
  price: 100,
  thumbnail: "Sin imagen",
  code: "a777",
  stock: 25,
});

// Producto 2
await pm.addProduct({
  title: "Champú fortificante",
  description: "Champú para cabello fuerte y saludable",
  price: 120,
  thumbnail: "URL de la imagen del segundo producto",
  code: "b888",
  stock: 30,
});

// Producto 3
await pm.addProduct({
  title: "Cepillo de dientes suave",
  description: "Cepillo de dientes con cerdas suaves para una limpieza delicada",
  price: 90,
  thumbnail: "URL de la imagen del tercer producto",
  code: "c999",
  stock: 15,
});

// Producto 4
await pm.addProduct({
  title: "Desodorante roll-on",
  description: "Desodorante roll-on de larga duración",
  price: 150,
  thumbnail: "URL de la imagen del cuarto producto",
  code: "t123",
  stock: 10,
});

// Producto 5
await pm.addProduct({
  title: "Pasta dental blanqueadora",
  description: "Pasta dental para una sonrisa más brillante",
  price: 80,
  thumbnail: "URL de la imagen del quinto producto",
  code: "d456",
  stock: 20,
});

// Producto 6
await pm.addProduct({
  title: "Esponja exfoliante",
  description: "Esponja para exfoliar la piel y dejarla suave",
  price: 110,
  thumbnail: "URL de la imagen del sexto producto",
  code: "e789",
  stock: 18,
});

// Continuar de manera similar para los productos restantes...
// Producto 7
await pm.addProduct({
  title: "Gel de baño relajante",
  description: "Gel de baño con aromas relajantes para una experiencia placentera",
  price: 130,
  thumbnail: "URL de la imagen del séptimo producto",
  code: "f101",
  stock: 22,
});

// Y así sucesivamente, hasta el producto 20
// Producto 8
await pm.addProduct({
  title: "Toallitas desmaquillantes",
  description: "Toallitas suaves para quitar el maquillaje fácilmente",
  price: 95,
  thumbnail: "URL de la imagen del octavo producto",
  code: "g202",
  stock: 15,
});

// Producto 9
await pm.addProduct({
  title: "Cuchillas de afeitar",
  description: "Cuchillas de afeitar de alta calidad para un afeitado suave",
  price: 75,
  thumbnail: "URL de la imagen del noveno producto",
  code: "h303",
  stock: 25,
});



export { pm }