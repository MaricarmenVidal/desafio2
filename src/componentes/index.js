import fs from 'fs/promises'

 export default class ProductManager {
    constructor(path = './products.json') {
        this.path = path;
        this.products = []
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data) || [];
        } catch (e) {
            return [];
        }
    }

    async saveProducts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error('Error al guardar productos:', error);
        }
    }

    addProduct(productData) {
        productData.id = this.generarId();
        this.products.push(productData);
        this.saveProducts();
    }

    generarId() {
        let id = 0;
      
        if (this.products.length === 0) {
            id = 1;
        } else {
            const lastProduct = this.products[this.products.length - 1];
    const lastProductId = lastProduct ? lastProduct.id : 0;
    return lastProductId + 1;
        }
      
        return id;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const findId=this.products.find((product)=>product.id===id)
        if (findId){
                return findId
        }else{
            console.log("Resultado de búsqueda: Producto no encontrado")
        }
    }

    updateProduct(productId, updatedData) {
        const productIndex = this.products.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updatedData };
            this.saveProducts();
            return true;
        }
        return false;
    }

    deleteProduct(productId) {
        this.products = this.products.filter(product => product.id !== productId);
        this.saveProducts();
    }
}

(async ()=> {
   //const productManager = new ProductManager();

/* // Add Products
productManager.addProduct({
    title: 'Producto1',
    description: 'Descripción del Producto1',
    price: 10.99,
    thumbnail: 'path/to/image1.jpg',
    code: '0001',
    stock: 50
});

productManager.addProduct({
    title: 'Producto2',
    description: 'Descripción del Producto2',
    price: 19.99,
    thumbnail: 'path/to/image2.jpg',
    code: '0002',
    stock: 30
});

productManager.addProduct({
    title: 'Producto3',
    description: 'Descripción del Producto3',
    price: 29.99,
    thumbnail: 'path/to/image3.jpg',
    code: '0003',
    stock: 40
});
productManager.addProduct({
    title: 'Producto4',
    description: 'Descripción del Producto4',
    price: 29.99,
    thumbnail: 'path/to/image4.jpg',
    code: '0004',
    stock: 30
});
productManager.addProduct({
    title: 'Producto5',
    description: 'Descripción del Producto5',
    price: 39.99,
    thumbnail: 'path/to/image5.jpg',
    code: '0005',
    stock: 50
});
productManager.addProduct({
    title: 'Producto6',
    description: 'Descripción del Producto6',
    price: 39.99,
    thumbnail: 'path/to/image6.jpg',
    code: '0006',
    stock: 20
});
productManager.addProduct({
    title: 'Producto7',
    description: 'Descripción del Producto7',
    price: 49.99,
    thumbnail: 'path/to/image7.jpg',
    code: '0007',
    stock: 23
});
productManager.addProduct({
    title: 'Producto8',
    description: 'Descripción del Producto8',
    price: 59.99,
    thumbnail: 'path/to/image8.jpg',
    code: '0008',
    stock: 26
});
productManager.addProduct({
    title: 'Producto9',
    description: 'Descripción del Producto9',
    price: 39.99,
    thumbnail: 'path/to/image9.jpg',
    code: '0009',
    stock: 40
});
productManager.addProduct({
    title: 'Producto10',
    description: 'Descripción del Producto10',
    price: 29.99,
    thumbnail: 'path/to/image10.jpg',
    code: '0010',
    stock: 30
}); */

// Obtener los productos
/* const allProducts = productManager.getProducts();
console.log("Todos los productos:");
console.log(allProducts);  */
/* 
// Buscar producto por ID
const productIdToFind = 1;
const foundProduct = productManager.getProductById(productIdToFind);
if (foundProduct) {
    console.log(`Producto encontrado por ID ${productIdToFind}:`, foundProduct);
} else {
    console.log(`Producto con ID ${productIdToFind} no encontrado.`);
}

// Actualizar producto
const productIdToUpdate = 2;
const updatedData = { price: 24.99, stock: 40 };
if (productManager.updateProduct(productIdToUpdate, updatedData)) {
    console.log(`Producto con ID ${productIdToUpdate} actualizado correctamente.`);
} else {
    console.log(`Producto con ID ${productIdToUpdate} no encontrado.`);
}

// Eliminar producto
const productIdToDelete = 1;
productManager.deleteProduct(productIdToDelete);
console.log(`Producto con ID ${productIdToDelete} eliminado correctamente.`);
 */
/* // Mostrar productos actualizados
const updatedProducts = productManager.getProducts();
console.log("Productos actualizados:");
console.log(updatedProducts); */
})()


