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
        nb = new Intl.NumberFormat().format(totalCart);

        //  Affichage des articles et des prix totaux

        const totalArticle = document.querySelector("#totalQuantity");
        totalArticle.textContent = item.length;
        const totalPrice = document.querySelector("#totalPrice");
        totalPrice.textContent = nb;

        //  Modification des quantités

        let changeQuantity = document.querySelectorAll(".itemQuantity");
        Array.from(changeQuantity);
        changeQuantity[i].addEventListener("change", function () {
          item[i].quantity = parseFloat(this.value);
          localStorage.setItem("orderProduct", JSON.stringify(item));
          window.location.reload();
        });

        //  Suppression d'articles

        let deleteButton = document.querySelectorAll(".deleteItem");
        Array.from(deleteButton);
        deleteButton[i].addEventListener("click", function () {
          item.splice(i, 1);
          localStorage.setItem("orderProduct", JSON.stringify(item));
          window.location.reload();
        });
      }) /* Fin function data */

      // Catch error

      .catch(function (Error) {
        console.log(Error);
      });
  } /* Fin de la boucle */
} /* Fin de la condition "else" (if = panier vide) */

/************************************************** Formulaires **************************************************/

// Prénom

let firstName = document.querySelector("#firstName");

firstName.addEventListener("input", function () {
  let firstNameRegExp = new RegExp("^[A-Z][A-Za-zéèê-]+$");

  let firstNameTest = firstNameRegExp.test(firstName.value);
  let firstNameMsg = document.querySelector("#firstNameErrorMsg");

  if (firstNameTest) {
    firstNameMsg.textContent = "";
    firstName.style.border = "solid";
    firstName.style.backgroundColor = "#9BE49B";
  } else {
    firstNameMsg.textContent = "champ non valide";
    firstName.style.border = "solid";
    firstName.style.backgroundColor = "#FF7A7A";
  }
});

// Nom

let lastName = document.querySelector("#lastName");

lastName.addEventListener("input", function () {
  let lastNameRegExp = new RegExp("^[A-Z][A-Za-zéèê-]+$");

  let lastNameTest = lastNameRegExp.test(lastName.value);
  let lastNameMsg = document.querySelector("#lastNameErrorMsg");

  if (lastNameTest) {
    lastNameMsg.textContent = "";
    lastName.style.border = "solid";
    lastName.style.backgroundColor = "#9BE49B";
  } else {
    lastNameMsg.textContent = "champ non valide";
    lastName.style.border = "solid";
    lastName.style.backgroundColor = "#FF7A7A";
  }
});

// Adresse

let address = document.querySelector("#address");

address.addEventListener("input", function () {
  let addressRegExp = new RegExp("([0-9] )([A-Za-zéèê-]+)");

  let addressTest = addressRegExp.test(address.value);
  let addressMsg = document.querySelector("#addressErrorMsg");

  if (addressTest) {
    addressMsg.textContent = "";
    address.style.border = "solid";
    address.style.backgroundColor = "#9BE49B";
  } else {
    addressMsg.textContent = "champ non valide";
    address.style.border = "solid";
    address.style.backgroundColor = "#FF7A7A";
  }
});

// Ville

let city = document.querySelector("#city");

city.addEventListener("input", function () {
  let cityRegExp = new RegExp("^[A-Z][A-Za-zéèê-]+$");

  let cityTest = cityRegExp.test(city.value);
  let cityMsg = document.querySelector("#cityErrorMsg");

  if (cityTest) {
    cityMsg.textContent = "";
    city.style.border = "solid";
    city.style.backgroundColor = "#9BE49B";
  } else {
    cityMsg.textContent = "champ non valide";
    city.style.border = "solid";
    city.style.backgroundColor = "#FF7A7A";
  }
});

// Email

let email = document.querySelector("#email");

email.addEventListener("input", function () {
  let emailRegExp = new RegExp("^[A-Za-z0-9.-_]+@+[A-Za-z]+[.]+[A-Za-z]+$");

  let emailTest = emailRegExp.test(email.value);
  let emailMsg = document.querySelector("#emailErrorMsg");

  if (emailTest) {
    emailMsg.textContent = "";
    email.style.border = "solid";
    email.style.backgroundColor = "#9BE49B";
  } else {
    emailMsg.textContent = "champ non valide";
    email.style.border = "solid";
    email.style.backgroundColor = "#FF7A7A";
  }
});
