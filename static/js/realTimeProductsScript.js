const prodsContainer = document.querySelector("#Productos")

const socket = io({})

socket.emit('solicitar-archivo', 'db/products.json')

socket.on('archivo',(res)=>{
  cargarProductos(res.contenido,prodsContainer)
})
socket.on('realTimeProducts',(res) => {
  prodsContainer.innerHTML=""
 cargarProductos(res,prodsContainer)
})

function cargarProductos(array,container){
  container.append(
    array.forEach((p) => {
      const card = document.createElement('div')
      card.className = 'card text-center'
  
      const cardBody = document.createElement('div')
      cardBody.className = 'card-body'
  
      const title = document.createElement('h2')
      title.className = 'card-title fs-4'
      title.textContent = p.title
  
      const cardText = document.createElement('div')
      cardText.className = 'card-text flex flex-column justify-content-around fs-6'
  
      const description = document.createElement('p')
      description.textContent = p.description
  
      const price = document.createElement('p')
      price.textContent ="$" +  p.price
      price.className = 'fw-bold'
  
      const cardFooter = document.createElement('div')
      cardFooter.className = 'card-footer d-flex justify-content-around align-center'
  
      const link = document.createElement('a')
      link.className = 'btn btn-success btn-small'
      link.textContent = 'Comprar'
  
      cardBody.appendChild(title)
      cardText.appendChild(description)
      cardFooter.appendChild(price)
      cardBody.appendChild(cardText)
      cardFooter.appendChild(link)
  
      card.appendChild(cardBody)
      card.appendChild(cardFooter)
  
      container.appendChild(card)
    }))
}