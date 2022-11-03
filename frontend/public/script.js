const form = document.querySelector('#add-category');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const product = {
        name: document.querySelector('#name').value,
        category: document.querySelector('#category').value,
        price: parseInt(document.querySelector('#price').value)
    }
// képküldéshez ideális a fomData, a többi JSON.
    const formData = new FormData()
    formData.append('fileName', document.querySelector('#file-name').value)
    formData.append('file', document.querySelector ('#file').files[0]) //files array-t ad vissza, még ha egy elem is van benne
    //append => adattal tölti fel a formData-t, bármilyennnel, kulcs-érték párokat fűz hozzá

    fetch("/upload", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product) //mindenképpen string legyen, mint itt
      });

    fetch('/upload-image', {
      method: 'POST', 
      body: formData
    });
});