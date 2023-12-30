const form = document.querySelector('#RegisterForm')

form.addEventListener('submit', async (e)=>{
    e.preventDefault()
    const res = await fetch('/api/Register',{
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form))
    })


    if(res.status == 201){
        alert(` ¡BIENVENIDO!`)
        setTimeout(() => {
            window.location.href = '/'
        }, 1000);

    }
})