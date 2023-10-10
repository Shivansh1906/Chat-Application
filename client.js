const socket = io()

let Username;
let textArea = document.querySelector("#textarea")
let MessageArea = document.querySelector('.message-area');

do {
    Username = prompt('Please enter your name: ')
} while (!Username)

//message should be sent when clicked on enter

textArea.addEventListener('keyup', (e) => {

    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }

})

function sendMessage(message) {
    let msg = {
        user: Username,
        message: message.trim()
    }

    appendMessage(msg, 'outgoing')
    textArea.value = ''
    scrollToBottom()


    //send to server
    //event ko emit kar rhe hain server par
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type

    mainDiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
   
   `
    mainDiv.innerHTML = markup;


    MessageArea.appendChild(mainDiv);
}

//Receive the messages

socket.on('message', (msg) => {
    //    console.log(msg);       //Client ka code hai which runs on browser and not on server

    appendMessage(msg, 'incoming')
    scrollToBottom()

})


//Automatic scroll when new messages are added to it

function scrollToBottom() {
    MessageArea.scrollTop = MessageArea.scrollHeight
}