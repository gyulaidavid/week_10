const form = document.querySelector('#add-category');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const product = {
        name: document.querySelector('#name').value,
        category: document.querySelector('#category').value,
        price: parseInt(document.querySelector('#price').value)
    }
    fetch("/product", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product) //mindenképpen string legyen, mint itt
      });
});