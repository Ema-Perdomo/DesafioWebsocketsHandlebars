import express from 'express';
import CartRouter from '../routes/CartRouter.js';
import productsRouter from '../routes/ProductsRouter.js';
import upload from './config/multer.js';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import { __dirname } from './path.js';


//Configuraciones.
const app = express()
const PORT = 8080

//Server
const server = app.listen(PORT, () => {    
    console.log(`Server on port: ${PORT}`)
})

const io = new Server(server) //En io declaro un nuevo servidor de socket.io

//Middlewares (comunicación)
app.use(express.json())//Permite poder ejecutar JSON
app.engine('handlebars', engine())//Implemento handlebars para utilizarlo en mi app
app.set('view engine', 'handlebars') //Voy a utilizar handlebars para las vistas(views) de mi app
app.set('views', __dirname + '/views') //Las views van a estar en dirname + /views

//socket es un cliente escuchando
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado con socket.io')

    //Escucho el mensaje llamado movimiento
    socket.on('movimiento', info => {
        //Cando el cliente me envia un mensaje lo capturo y lo muestro
        console.log(info)
    })

    socket.on('rendirse', info => {
        console.log(info)
        //Cliente que envió este mensaje
        socket.emit('mensaje-jugador', 'Te has rendido')
        //broadcast envia a todos los clientes con comunicacion establecida con el server
        io.emit('rendicion', 'El jugador se rindió') // Cambio de socket.broadcast.emit a io.emit

    })
})

//Router
app.use('/static', express.static(__dirname + '/public'))
app.use('/api/products', productsRouter,  express.static(__dirname + '/public'))
app.use('/api/cart', CartRouter)
//Carga de imagenes
app.post('/upload', upload.single('product'), (req, res) => {

    try {
        console.log(req.file)
        console.log(req.body)//?
        res.status(200).send('Imagen subida correctamente')
    } catch (error) {
        res.status(500).send('Error al cargar la imagen.')
    }
})
// app.get('/static', (req, res) => {

//     const prods = [
//         { id: 1, title: 'Celular', price: 100, image: 'https://f.fcdn.app/imgs/f746aa/www.zonatecno.com.uy/zoteuy/e5b4/original/catalogo/102804_102804_1/460x460/celular-xiaomi-redmi-note-12-128gb-4gb-ice-blue-ds-celular-xiaomi-redmi-note-12-128gb-4gb-ice-blue-ds.jpg'},
//         { id: 2, title: 'Tablet', price: 200, image: 'https://http2.mlstatic.com/D_NQ_NP_852777-MLA46868372802_072021-O.webp'},
//         { id: 3, title: 'Notebook', price: 300, image: 'https://http2.mlstatic.com/D_NQ_NP_966664-MLA74073227046_012024-O.webp'},
//         { id: 4, title: 'Monitor', price: 400, image: 'https://cdn.webshopapp.com/shops/256009/files/391758905/xiaomi-xiaomi-mi-desktop-monitor-27-inch.jpg'}
//     ]
    //Renderizo la vista home para la ruta /static
    // res.render('templates/products',{
    //     mostrarProductos: true,
    //     productos: prods,
    //     css: 'products.css'
    // })
// })


//---------------------------------------








