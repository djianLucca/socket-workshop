$(function(){
    const socket = io.connect('http://localhost:3000')

    const textMessage = $('#txt-message')
    const textUsername = $('#txt-username')
    const btnSendMessage = $('#btn-send-message')
    const btnSetUsername = $('#btn-set-username')

    const chatRoom = $('#box-message')
    const isTyping = $('#feedback-typing')

    const clear = () => {
        textMessage.val('')
        isTyping.html('')
    }

    btnSendMessage.on('click', () => {
        socket.emit('SEND_MESSAGE', {
            message: textMessage.val()
        })
    })

    btnSetUsername.on('click', () => {
        socket.emit('SET_USERNAME', {
            username: textUsername.val()
        })
    })

    textMessage.on('keypress', () => {
        socket.emit('IS_TYPING')
    })

    socket.on('SEND_MESSAGE', data => {
        const tmpl = `<p class="message">${data.username} - ${data.message}</p>`
        chatRoom.append(tmpl)
        clear()
    })

    socket.on('IS_TYPING', data => {
        let tmlp = `<p>${data.username} está escrevendo...</p>`

        isTyping.html(tmlp)
    })
})