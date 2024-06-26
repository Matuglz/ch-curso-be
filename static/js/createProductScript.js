window.addEventListener('load', async ()=>{
    const res = await fetch('/createProduct/current')
    if(res.status === 401){
        const {message} = await res.json()
        alert(message)
        window.location.href = '/'
    }
})


document.querySelector('#formCreate').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", document.querySelector("#Titulo").value);
    formData.append("description", document.querySelector("#Descripcion").value);
    formData.append("price", document.querySelector("#Precio").value);
    formData.append("code", document.querySelector("#Code").value);
    formData.append("stock", document.querySelector("#Stock").value);
    formData.append("img", document.querySelector('#img').files[0]);

    await fetch('/createProduct', {
        method: 'POST',
        body: formData,
    });

    document.querySelector("#Titulo").value = ""
    document.querySelector("#Descripcion").value = ""
    document.querySelector("#Precio").value = ""
    document.querySelector("#Code").value = ""
    document.querySelector("#Stock").value = ""
    document.querySelector("#img").value = ""
})