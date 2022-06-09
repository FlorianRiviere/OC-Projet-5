const cart = []; /* Tableau pour récupérer le localStorage */
const item = JSON.parse(localStorage.getItem("orderProduct"));

let arrayPrice = []; /* Tableau pour récupérer les prix totaux */

if (localStorage.length == 0) {
  const cartItem = document.querySelector("#cart__items");
  cartItem.textContent = "Panier vide";
} else {
  for (let i = 0; i < item.length; i++) {
    cart.push(item);

    // Création du tableau récapitulatif du panier (html)
    fetch(`http://localhost:3000/api/products/${item[i].id}`)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (data) {
        console.log(data);

        // Paramétrage des balises HTML à créer

        const cartItem = document.querySelector("#cart__items");

        const article = document.createElement("article");
        article.className = "cart__item";
        article.dataset.id = item[i].id;
        article.dataset.color = item[i].color;

        const divImage = document.createElement("div");
        divImage.className = "cart__item__img";

        const image = document.createElement("img");
        image.src = data.imageUrl;
        image.alt = data.altTxt;

        const divItemContent = document.createElement("div");
        divItemContent.className = "cart__item__content";

        const description = document.createElement("div");
        description.className = "cart__item__content__description";

        const name = document.createElement("h2");
        name.textContent = data.name;

        const color = document.createElement("p");
        color.textContent = item[i].color;

        const price = document.createElement("p");
        price.textContent = data.price + " €";

        const settings = document.createElement("div");
        settings.className = "cart__item__content__settings";

        const divQuantity = document.createElement("div");
        divQuantity.className = "cart__item__content__settings__quantity";

        const quantity = document.createElement("p");
        quantity.textContent = "Qté :";

        const inputQuantity = document.createElement("input");
        inputQuantity.type = "number";
        inputQuantity.className = "itemQuantity";
        inputQuantity.name = "itemQuantity";
        inputQuantity.min = "1";
        inputQuantity.max = "100";
        inputQuantity.value = item[i].quantity;
        inputQuantity.textContent = item[i].quantity;

        const settingsItem = document.createElement("div");
        settingsItem.className = "cart__item__content__settings__delete";

        const deleteItem = document.createElement("p");
        deleteItem.className = "deleteItem";
        deleteItem.textContent = "Supprimer";

        // Création des balises HTML

        cartItem.appendChild(article);
        article.appendChild(divImage);
        article.appendChild(divItemContent);
        divImage.appendChild(image);
        divItemContent.appendChild(description);
        divItemContent.appendChild(settings);
        description.appendChild(name);
        description.appendChild(color);
        description.appendChild(price);
        settings.appendChild(divQuantity);
        settings.appendChild(settingsItem);
        divQuantity.appendChild(quantity);
        divQuantity.appendChild(inputQuantity);
        settingsItem.appendChild(deleteItem);

        // Calcul des prix totaux

        let totalPriceArticle = data.price * item[i].quantity;
        arrayPrice.push(totalPriceArticle);

        let totalCart = 0;
        for (let i = 0; i < arrayPrice.length; i++) {
          totalCart += arrayPrice[i];
        }

        //  Affichage des articles et des prix totaux

        const totalArticle = document.querySelector("#totalQuantity");
        totalArticle.textContent = item.length;
        const totalPrice = document.querySelector("#totalPrice");
        totalPrice.textContent = totalCart;

        //Modification et suppression d'articles

        const changeQuantity = document.querySelector(".itemQuantity");

        changeQuantity.addEventListener("change", (e) => {
          item[i].quantity = changeQuantity.value;
          return localStorage.setItem("orderProduct", JSON.stringify(item));
        });

        const deleteButton = document.querySelector(".deleteItem");
        const productSelected = deleteButton.closest("article");
        deleteButton.addEventListener("click", (e) => {
          localStorage.removeItem("orderProduct", productSelected);
          return localStorage.setItem("orderProduct", JSON.stringify(item));
        });
      }) /* Fin function data */

      // Catch error

      .catch(function (Error) {
        console.log(Error);
      });
  } /* Fin de la boucle */
} /* Fin de la condition */
