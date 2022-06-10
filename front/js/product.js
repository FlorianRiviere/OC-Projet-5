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

    let imgProduct = document.querySelector(".item__img");
    let img = document.createElement("img");
    img.src = data.imageUrl;
    img.alt = data.altTxt;
    imgProduct.appendChild(img);

    let title = document.querySelector("#title");
    title.textContent = data.name;

    let price = document.querySelector("#price");
    price.textContent = data.price;

    let description = document.querySelector("#description");
    description.textContent = data.description;

    // Affichage des couleurs selon l'ID du produit

    for (let i = 0; i < data.colors.length; i++) {
      let color = document.querySelector("#colors");
      let option = document.createElement("option");
      color.appendChild(option);
      option.value = data.colors[i];
      option.textContent = data.colors[i];
    }
  })

  // Catch error

  .catch(function (Error) {
    console.log(Error);
  });

// localStorage
// Bouton
const button = document.querySelector("#addToCart");
if (button != null) {
  button.addEventListener("click", (e) => {
    const color = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;

    if (color == null || color === "" || quantity == null || quantity === "") {
      alert("S'il vous plait, veuillez choisir une couleur et une quantité !");
      return;
    }

    const addProduct = {
      id: idProduct,
      color: color,
      quantity: Number(quantity),
    };

    let item = JSON.parse(localStorage.getItem("orderProduct"));

    if (item == null) {
      item = [];
      item.push(addProduct);
      localStorage.setItem("orderProduct", JSON.stringify(item));
    } else {
      let foundProduct = item.find((p) => p.id == addProduct.id);
      let foundColor = item.find((p) => p.color == addProduct.color);
      if (foundProduct != undefined && foundColor != undefined) {
        foundProduct.quantity =
          parseFloat(foundProduct.quantity) + addProduct.quantity;
        localStorage.setItem("orderProduct", JSON.stringify(item));
      } else {
        item.push(addProduct);
        localStorage.setItem("orderProduct", JSON.stringify(item));
      }
    }
  });
}
