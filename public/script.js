/*JS berichten versturen*/
let socket = ioServer()
let messages = document.querySelector('section ul')
let input = document.querySelector('#message')
let handle = document.querySelector('#handle')
let feedback =  document.querySelector('#feedback');
let count =  document.querySelector('#count');

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault()
    socket.emit('chat', {
      input: input.value,
      handle: handle.value,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) /*tijd bij de bericht*/
  })
  input.value = ''
})
/*tbericht verstuurd met gebruiksnaam en tijd*/
socket.on('chat', data => {
  feedback.innerHTML = ''
  messages.innerHTML += `
  <div class="message-background">
    <p class="time">${data.time}</p>
    <p>${data.input}</p>
  </div>
  <h3 class="message-handle">${data.handle}</h3>
  `
  messages.scrollTop = messages.scrollHeight
})
/*waneer gebruiker typt*/
input.addEventListener('keypress', function(){
  socket.emit('typing', handle.value)
})
/*melding waneer andere gebruiker typt*/
socket.on('typing', data => {
  feedback.innerHTML = `<p><em> ${data} typ een bericht...</em></p>`
})
socket.on('usercount', data => {
  count.innerHTML = data;
})
