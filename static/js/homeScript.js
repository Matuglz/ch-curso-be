const prodsContainer = document.querySelector("#Productos")

const socket = io({});

socket.emit('request-products')

socket.on('products',async (res) => {
  console.log(res.container);
 await showProducts(res.container,prodsContainer)
})




function showProducts(array,container){
  container.append(
    array.forEach((p) => {
      const card = document.createElement('div');
      card.className = 'card text-center';
  
      const img = document.createElement('img')
      img.src = p.thumbnail[0] ?? '../../static/img/default-product-img.png'
      img.className  = 'img-card'

      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';
  
      const title = document.createElement('h2');
      title.className = 'card-title fs-4';
      title.textContent = p.title;
  
      const cardText = document.createElement('div');
      cardText.className = 'card-text flex flex-column justify-content-around fs-6';
  
      const description = document.createElement('p');
      description.textContent = p.description;
  
      const price = document.createElement('p');
      price.textContent ="$" +  p.price;
      price.className = 'fw-bold'
  
      const cardFooter = document.createElement('div');
      cardFooter.className = 'card-footer d-flex justify-content-around align-center';
  
      const link = document.createElement('a');
      link.className = 'btn btn-success btn-small';
      link.textContent = 'Comprar';
  
      cardBody.appendChild(title);
      cardBody.appendChild(img)
      cardText.appendChild(description);
      cardFooter.appendChild(price);
      cardBody.appendChild(cardText);
      cardFooter.appendChild(link);
  
      card.appendChild(cardBody);
      card.appendChild(cardFooter);
  
      container.appendChild(card);
    }))
}