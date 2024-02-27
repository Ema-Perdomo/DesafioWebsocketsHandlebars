import {promises as fs} from 'fs';

export class CartManager {
    constructor(path) {
        this.products = path//this.products cambio a this.path
    }
    
    async getCart() {
        const cart = JSON.parse(await fs.readFile(this.products, 'utf-8'))
        return cart
    }

    async addProductToCart(idProducto, quantityParam) {
        const cart = JSON.parse(await fs.readFile(this.products, 'utf-8'))
        const indice = cart.findIndex(p => p.id == idProducto)

        if (indice != -1) {
            //Si ya existe el producto, le sumo la nueva cantidad agregada
            cart[indice].quantity += quantityParam 
        } else {
            //Si el prod no existe creo un objeto producto 
            const prod = { id: idProducto, quantity: quantityParam }
            cart.push(prod)
        }
        
        await fs.writeFile(this.products, JSON.stringify(cart))
        return "Producto agregado correctamente."
    }
}
