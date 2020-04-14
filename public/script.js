var socket = io(window.origin)

socket.on('receivedNewMessage', function(data) {
    console.log('exec receivedNewMessage')
    renderMessages(data)
    makeBeep()
})

socket.on('previousMessages', function(messages) {
    console.log('exec previousMessages')
    document.querySelector('.messages').innerHTML = ''
    for (message of messages){
        renderMessages(message)
    }
})




function renderMessages(message){
    const messages = document.querySelector('.messages')

    const msg = `
        <div class="message">
            <strong>${message.author}</strong>
            <div>${message.message}</div>      
        </div>`

    messages.innerHTML += msg

}


function handleSendMessage(event){

    event.preventDefault()

    const authorObj = document.querySelector('#username')
    const messageObj = document.querySelector('#message')


    if (authorObj.value && messageObj.value) {

        const msgObj = {
                author: authorObj.value,
                message: messageObj.value
            }

        renderMessages(msgObj)
        socket.emit('sendMessage', msgObj)

        messageObj.value = ''
        messageObj.focus()

    }
}


function makeBeep(){
    console.log('exec makeBeep')
    let context
    let oscillator
    let contextGain
    let x = 2

    context = new AudioContext()
    oscillator = context.createOscillator()
    contextGain = context.createGain()
    oscillator.frequency.value = 440.0
    oscillator.type = 'sine'
    oscillator.connect(contextGain)
    contextGain.connect(context.destination)
    oscillator.start(0)

    contextGain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + x)
}
