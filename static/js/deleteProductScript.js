const form = document.querySelector('#formDelete')

                    window.addEventListener('load', async ()=>{
                        const res = await fetch('/deleteProduct/current')
                        if(res.status === 401){
                            const {message} = await res.json()
                            alert(message)
                            window.location.href = '/'
                        }
                    })


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const res = await fetch('/deleteProduct', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form))

    })

    console.log('send form');
})

