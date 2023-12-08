const email = prompt('Introduce tu email!')
const form = document.querySelector('#formChat');
const messageContainer = document.querySelector('#Messages')

const socket = io({})

socket.emit('request-messages')

socket.on('messages', (res) => {
    showMesages(res.contenido, messageContainer)
})

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    socket.emit('send-message', { userEmail: email, mesageText: document.querySelector('#mesageText').value })
    document.querySelector('#mesageText').value = ""
});

function showMesages(array, container) {
    container.innerHTML = ""
    const newMesagges =
        array.map(msg => {
            if (msg.userEmail == undefined || msg.mesageText == undefined) {
                console.log('error');
                return null
            } else {
                const li = document.createElement('li')
                li.className = 'message'
                if (msg.userEmail == email) {
                    li.classList.add('right')
                }

                const pUser = document.createElement('p')
                pUser.className = 'user'
                pUser.textContent = `${msg.userEmail}:  `

                const pText = document.createElement('p')
                pText.className = 'text'
                pText.textContent = msg.mesageText

                li.appendChild(pUser)
                li.appendChild(pText)

                return li
            }
        }).filter(e => e !== null)
    container.append(...newMesagges)
}