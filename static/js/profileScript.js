

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