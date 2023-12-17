const form = document.querySelector('#LoginForm')

form.addEventListener('submit', async (e)=>{
    e.preventDefault()
    const res = await fetch('/api/Login',{
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form))
    })


    if(res.status == 201){
        const {payload : user} = await res.json()
        alert(` ¡BIENVENIDO!`)
        setTimeout(() => {
            window.location.href = '/'
        }, 1000);

    }
})