import { _apiUrl } from "../js/module.js";

// Récupère ID dans l'URL

let params = new URLSearchParams(window.location.search);
let idProduct = params.get("id");

const fetchGet = fetch(`${_apiUrl}/${idProduct}`);

fetchGet.then(async function (res) {
  try {
    if (res.ok) {
      let data = await res.json();
      // Affichage des détails selon l'ID du produit

      function getProduct() {
        // Création et paramétrage des balises HTML

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
      }
      getProduct();
    }
  } catch (Error) {
    console.log(Error);
  }
});

// Envoi du produit dans le local storage

function setLocalStorage() {
  const button = document.querySelector("#addToCart");
  if (button != null) {
    button.addEventListener("click", function () {
      const color = document.querySelector("#colors").value;
      const quantity = document.querySelector("#quantity").value;

      if (color === "" || quantity === "") {
        alert(
          "S'il vous plait, veuillez choisir une couleur et une quantité !"
        );
        return;
      }

      // Déclaration des variables et constantes

      const addProduct = {
        id: idProduct,
        color: color,
        quantity: Number(quantity),
      };

      let item = JSON.parse(localStorage.getItem("orderProduct"));

      let alertAddToCart = "Produit ajouté au panier";

      // Panier vide

      if (item == null) {
        item = [];
        item.push(addProduct);
        localStorage.setItem("orderProduct", JSON.stringify(item));
        alert(alertAddToCart);
      }

      // Si le produit de la même couleur est déjà dans le panier
      else {
        let foundProduct = item.find(
          (p) => p.id == addProduct.id && p.color == addProduct.color
        );
        if (foundProduct != undefined) {
          foundProduct.quantity =
            parseFloat(foundProduct.quantity) + addProduct.quantity;
          localStorage.setItem("orderProduct", JSON.stringify(item));
          alert(alertAddToCart);
        }

        // Si panier non vide et produit de la même couleur n'est pas dans le panier
        else {
          item.push(addProduct);
          localStorage.setItem("orderProduct", JSON.stringify(item));
          alert(alertAddToCart);
        }
      }
    });
  }
}
setLocalStorage();
