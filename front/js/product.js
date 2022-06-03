// Récupère ID dans l'URL

let params = new URLSearchParams(window.location.search);
let idProduct = params.get("id");

fetch(`http://localhost:3000/api/products/${idProduct}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    console.log(data);

    // Affichage des détails selon l'ID du produit

    const imgProduct = document.querySelector(".item__img");
    const img = document.createElement("img");
    img.src = data.imageUrl;
    imgProduct.appendChild(img);

    const title = document.querySelector("#title");
    title.textContent = data.name;

    const price = document.querySelector("#price");
    price.textContent = data.price;

    const description = document.querySelector("#description");
    description.textContent = data.description;

    for (let i = 0; i < data.colors.length; i++) {
      const color = document.querySelector("#colors");
      const option = document.createElement("option");
      color.appendChild(option);
      option.value = data.colors[i];
      option.textContent = data.colors[i];
    }
  })
  .catch(function (Error) {
    console.log(Error);
  });
