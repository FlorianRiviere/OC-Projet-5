import { _apiUrl } from "../js/module.js";

const fetchGet = fetch(_apiUrl);

fetchGet.then(async function (res) {
  try {
    if (res.ok) {
      let data = await res.json();

      // Affichage des produits dans la page accueil

      function getProducts() {
        for (let i = 0; i < data.length; i++) {
          // Paramétrage des balises HTML à créer

          const items = document.querySelector("#items");

          const card = document.createElement("a");
          card.href = `../html/product.html?id=${data[i]._id}`;

          const article = document.createElement("article");

          const productImage = document.createElement("img");
          productImage.src = data[i].imageUrl;
          productImage.alt = data[i].altTxt;

          const productName = document.createElement("h3");
          productName.textContent = data[i].name;

          const productDescription = document.createElement("p");
          productDescription.textContent = data[i].description;

          // Création des balises HTML

          items.appendChild(card);
          card.appendChild(article);
          article.appendChild(productImage);
          article.appendChild(productName);
          article.appendChild(productDescription);
        }
      }

      getProducts();
    }
  } catch (error) {
    console.log(error);
  }
});
