import fs from 'fs'


class ProductManager {
    constructor(path = './products.json') {
        this.path = path;
        this.products = this.loadProducts();
        this.id=1
    }

    loadProducts = async() =>{
        let data= await fs.promises.readFile(this.path, 'utf-8')
        try {
            const products = JSON.parse(data)
            return products;
        } catch (e) {
            return [];
        }
    }

    saveProducts = async ()=> {
        return await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    }



    addProduct = async (title, description, price, thumbnail, code, stock) => {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
          console.log("Por favor, ingresar todos los datos");
        }
    
        const products = await this.getProducts();
    
        if (products.some((product) => product.code === code)) {
          console.log("El código ya existe");
          return;
        }
    
        const newProduct = {
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          id: this.id++,
        };
        products.push(newProduct);
        await fs.promises.writeFile(
          this.PATH,
          JSON.stringify(products, null, "\t")
        );
        return newProduct;
    };
    
    getProducts= async()=> {
        await this.products;
    }

    arrayByID = async (id) => {
        return await this.getProducts().then((products) => {
            return products.find((product) => product.id === id);
        });
    };

    getProductbyId = async (id) => {
        await this.arrayPorID(id)
            .then((product) => {
                if (product) {
                    console.log(product);
                } else {
                    console.log("Producto no encontrado");
                }
            })
          .catch((err) => {
            console.log(err);
        });
    };


    deleteProduct = async(productId) =>{
        await this.products.filter(product => product.id !== productId);
        this.saveProducts();
    }

    updateProduct =async (productId, updatedData) =>{
        const productIndex = await this.products.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
            this.products[productIndex] = await { ...this.products[productIndex], ...updatedData };
            await this.saveProducts();
            return true;
        }
        return false;
    }


}


const productManager = new ProductManager();

// Add Products
await productManager.addProduct({
    title: 'Producto1',
    description: 'Descripción del Producto1',
    price: 10.99,
    thumbnail: 'path/to/image1.jpg',
    code: '0001',
    stock: 50
});

await productManager.addProduct({
    title: 'Producto2',
    description: 'Descripción del Producto2',
    price: 19.99,
    thumbnail: 'path/to/image2.jpg',
    code: '0002',
    stock: 30
});

await productManager.addProduct({
    title: 'Producto3',
    description: 'Descripción del Producto3',
    price: 29.99,
    thumbnail: 'path/to/image3.jpg',
    code: '0003',
    stock: 40
});

// Obtener los productos
const allProducts = await productManager.getProducts();
console.log("Todos los productos:");
console.log(allProducts);

// Buscar producto por ID
const productIdToFind = 1;
const foundProduct = await productManager.getProductById(productIdToFind);
if (foundProduct) {
    console.log(`Producto encontrado por ID ${productIdToFind}:`, foundProduct);
} else {
    console.log(`Producto con ID ${productIdToFind} no encontrado.`);
}

// Actualizar producto
const productIdToUpdate = 2;
const updatedData = { price: 24.99, stock: 40 };
if (await productManager.updateProduct(productIdToUpdate, updatedData)) {
    console.log(`Producto con ID ${productIdToUpdate} actualizado correctamente.`);
} else {
    console.log(`Producto con ID ${productIdToUpdate} no encontrado.`);
}

// Eliminar producto
const productIdToDelete = 1;
await productManager.deleteProduct(productIdToDelete);
console.log(`Producto con ID ${productIdToDelete} eliminado correctamente.`);

// Mostrar productos actualizados
const updatedProducts = await productManager.getProducts();
console.log("Productos actualizados:");
console.log(updatedProducts);