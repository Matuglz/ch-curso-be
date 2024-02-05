const form = document.querySelector('#RegisterForm')

window.addEventListener('load', async()=>{
    const res = await fetch('/api/Register')
    if(res.status === 401){
        alert('ya estas logeado')
        return window.location.href = '/'
    }
})

form.addEventListener('submit', async (e)=>{
    e.preventDefault()
    const res = await fetch('/api/Register',{
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form))
    })


    if(res.status == 201){
        alert(` ¡BIENVENIDO! /n Se envio un correo a tu email para verificarlo!`)
        setTimeout(() => {
            window.location.href = '/Login'
        }, 1000);

    }
})