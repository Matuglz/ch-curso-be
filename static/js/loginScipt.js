const form = document.querySelector('#LoginForm')

form.addEventListener('submit', async (e)=>{
    e.preventDefault()
    const res = await fetch('/api/Login',{
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form))
    })


    if(res.status == 204){
        setTimeout(() => {
            window.location.href = '/Profile'
        }, 1000);
    }else if(res.status == 401){
        const {message : error}  = await res.json()
        alert(error)
    }
})