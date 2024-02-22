const socket = io() //En socket declaro un nuevo cliente de socket.io



socket.emit('movimiento', 'Ca7') //Envio un mensaje al servidor (Ca7 caballo a 7)

socket.emit('rendirse', "Me he rendido") //RENDIRSE O RENDICION??


//Espero recibir desde el servidor los mensajes
socket.on('mensaje-jugador', info => {  
    console.log(info)
})

socket.on('rendicion', info => {  
    console.log(info)
})