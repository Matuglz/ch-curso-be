
window.addEventListener('load', async () => {
  const response = await fetch('/api/Login/current')
  if (response.status === 403) {
    alert('debes loguearte para ver esta informacion!')
    return window.location.href = '/Login'
  }

  const user = await response.json()

  document.querySelector('#name').innerHTML = user.name
  document.querySelector('#email').innerHTML = user.email
  document.querySelector('#rol').innerHTML = user.rol
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