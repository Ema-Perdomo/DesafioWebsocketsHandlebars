import { Router } from 'express';
import { CartManager } from '../src/config/CartManager.js';


const cartManager = new CartManager('../src/data/cart.json')
const cartRouter = Router()


// //No tiene sentido al haber un solo carrito
// cartRouter.post('/', async (req, res) => {
//     try {
//         const id = crypto.randomBytes(10).toString('hex')
//         const cartManager = new CartManager('./src/data/cart.json', id)
//         return res.status(200).send(`Carrito creado correctamente con el id: ${id}`)

//     } catch (error) {
//         res.status(500).send(`Error al crear carrito: ${error}`)
//     }
// })

cartRouter.get('/', async (req, res) => {

    try {
        const cart = await cartManager.getCart()
        res.status(200).send(cart)

    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carrito: ${error}`)
    }
})

cartRouter.post('/', async (req, res) => {

    try {
        const productId = req.params.pid
        const { quantity } = req.body
        const mensaje = await cartManager.addProductToCart(productId, quantity)
        res.status(200).send(mensaje)

    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear producto: ${error}`)
    }
})

export default cartRouter 