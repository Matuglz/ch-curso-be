document.querySelector('#formUpdate').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', document.querySelector('#Id').value)
    formData.append("title", document.querySelector("#Titulo").value);
    formData.append("description", document.querySelector("#Descripcion").value);
    formData.append("price", document.querySelector("#Precio").value);
    formData.append("code", document.querySelector("#Code").value);
    formData.append("stock", document.querySelector("#Stock").value);
    formData.append("img", document.querySelector('#Img').files[0]);

    await fetch('/updateProduct', {
        method: 'PUT',
        body: formData,
    });

    document.querySelector("#Titulo").value = ""
    document.querySelector("#Descripcion").value = ""
    document.querySelector("#Precio").value = ""
    document.querySelector("#Code").value = ""
    document.querySelector("#Stock").value = ""
    document.querySelector("#Img").value = ""
})

