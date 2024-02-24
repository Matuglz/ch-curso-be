
window.addEventListener('load', async () => {
  const response = await fetch('/api/Login/current')
  if (response.status === 401) {
    alert('debes loguearte para ver esta informacion!')
    return window.location.href = '/Login'
  }

  const data = await response.json()
  const user = data.user


  document.querySelector('#name').innerHTML = user.name
  document.querySelector('#email').innerHTML = user.email
  document.querySelector('#rol').innerHTML = user.rol
  if(user.auth === true){
    document.querySelector('#auth').innerHTML = 'Validado!'
  }else{
    document.querySelector('#auth').innerHTML = 'Sin validar!'
  }
  const cart = document.querySelector('#ACart')
  cart.addEventListener('click', ()=>{
    window.location.href = `/cart/${user.cart}`
  })
})



const form = document.querySelector('#FormLogOut')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const response = await fetch('/api/Login/Current', {
    method: 'DELETE'
  })

  if (response.status === 204) {
    window.location.href = '/Login'
  } else {
    const error = await response.json()
    alert(error.message)
  }
})