export default (io) => {
    io.sockets.on('connection', socket => {
        console.log('User connected ;)')
        socket.username = 'Anon'

        socket.on('SEND_MESSAGE', data => {
            io.sockets.emit('SEND_MESSAGE', {
                message: data && data.message,
                username: socket.username
            })
        })

        socket.on('SET_USERNAME', data => {
            socket.username = data && data.username
        })

        socket.on('IS_TYPING', data => {
            socket.broadcast.emit('IS_TYPING', {
                username: socket.username
            })
        })
    })
}