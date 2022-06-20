import { _apiUrl } from "../js/module.js";

//  Tableau pour récupérer le localStorage

const cart = [];
const item = JSON.parse(localStorage.getItem("orderProduct"));
cart.push(item);

//  Tableau pour récupérer les prix totaux de chaque article

let arrayPrice = [];

// Tableau des id à envoyer à l'API

let products = [];

/************************************************************ Panier ************************************************************/

if (item == null || item == "") {
  const cartItem = document.querySelector("#cart__items");
  cartItem.textContent = "Panier vide";
} else {
  // Création du tableau récapitulatif du panier (html)

  for (let i = 0; i < item.length; i++) {
    const fetchGet = fetch(`${_apiUrl}/${item[i].id}`);

    fetchGet.then(async function (res) {
      try {
        if (res.ok) {
          let data = await res.json();

          // Paramétrage et création du panier

          function setCart() {
            // Affichage des produits

            function getProducts() {
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
              const nb = new Intl.NumberFormat().format(data.price);
              price.textContent = nb + " €";

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
            }
            getProducts();

            // Calcul des prix totaux
            let totalCart = 0;
            function getTotalPrice() {
              let totalPriceArticle = data.price * item[i].quantity;
              arrayPrice.push(totalPriceArticle);

              for (let i = 0; i < arrayPrice.length; i++) {
                totalCart += arrayPrice[i];
              }
            }
            getTotalPrice();
            const nb1 = new Intl.NumberFormat().format(totalCart);

            //  Affichage des articles et des prix totaux
            function summaryCart() {
              const totalArticle = document.querySelector("#totalQuantity");
              totalArticle.textContent = item.length;
              const totalPrice = document.querySelector("#totalPrice");
              totalPrice.textContent = nb1;
            }
            summaryCart();

            //  Modification des quantités
            function modifyQuantity() {
              let changeQuantity = document.querySelectorAll(".itemQuantity");
              Array.from(changeQuantity);
              changeQuantity[i].addEventListener("change", function () {
                item[i].quantity = parseFloat(this.value);
                if (this.value > 100) {
                  item[i].quantity = 100;
                } else if (this.value < 1) {
                  item[i].quantity = 1;
                }
                localStorage.setItem("orderProduct", JSON.stringify(item));
                window.location.reload();
              });
            }
            modifyQuantity();

            //  Suppression d'articles
            function suppressItem() {
              let deleteButton = document.querySelectorAll(".deleteItem");
              Array.from(deleteButton);
              deleteButton[i].addEventListener("click", function () {
                item.splice(i, 1);
                localStorage.setItem("orderProduct", JSON.stringify(item));
                window.location.reload();
              });
            }
            suppressItem();
          }
          setCart();

          // Configuration du tableau à envoyer à l'API lors de la confirmation de la commande

          products.push(item[i].id);
        } /* Fin de la réponse */
      } catch (Error) {
        console.log(Error);
      }
    }); /* Fin du fetch */
  } /* Fin de la boucle */
} /* Fin de la condition "else" (if = panier vide) */

/************************************************************ Formulaires ************************************************************/

// Déclarations des regex

let textRegExp = new RegExp("^[A-Z][A-Za-zéèê-]+$");
let addressRegExp = new RegExp("([0-9] )([A-Za-zéèê-]+)");
let cityRegExp = new RegExp("^[A-Z][A-Za-zéèê' -]+$");
let emailRegExp = new RegExp("^[A-Za-z0-9.-_]+@[A-Za-z0-9.-_]+[.][A-Za-z]+$");

// Récupération des éléments html

let firstName = document.querySelector("#firstName");
let firstNameMsg = document.querySelector("#firstNameErrorMsg");

let lastName = document.querySelector("#lastName");
let lastNameMsg = document.querySelector("#lastNameErrorMsg");

let address = document.querySelector("#address");
let addressMsg = document.querySelector("#addressErrorMsg");

let city = document.querySelector("#city");
let cityMsg = document.querySelector("#cityErrorMsg");

let email = document.querySelector("#email");
let emailMsg = document.querySelector("#emailErrorMsg");

// Paramétrage des formulaires

let border = "solid";

let errorForm = "champ non valide";
let errorBackground = "#FF7A7A";

let validForm = "";
let validBackground = "#9BE49B";

function setForm() {
  // Prénom

  function setFirstName() {
    firstName.addEventListener("input", function () {
      let firstNameTest = textRegExp.test(firstName.value);
      if (firstNameTest) {
        firstNameMsg.textContent = validForm;
        firstName.style.border = border;
        firstName.style.backgroundColor = validBackground;
      } else {
        firstNameMsg.textContent = errorForm;
        firstName.style.border = border;
        firstName.style.backgroundColor = errorBackground;
      }
    });
  }
  setFirstName();

  // Nom

  function setLastName() {
    lastName.addEventListener("input", function () {
      let lastNameTest = textRegExp.test(lastName.value);
      if (lastNameTest) {
        lastNameMsg.textContent = validForm;
        lastName.style.border = border;
        lastName.style.backgroundColor = validBackground;
      } else {
        lastNameMsg.textContent = errorForm;
        lastName.style.border = border;
        lastName.style.backgroundColor = errorBackground;
      }
    });
  }
  setLastName();

  // Adresse

  function setAdress() {
    address.addEventListener("input", function () {
      let addressTest = addressRegExp.test(address.value);
      if (addressTest) {
        addressMsg.textContent = validForm;
        address.style.border = border;
        address.style.backgroundColor = validBackground;
      } else {
        addressMsg.textContent = errorForm;
        address.style.border = border;
        address.style.backgroundColor = errorBackground;
      }
    });
  }
  setAdress();

  // Ville

  function setCity() {
    city.addEventListener("input", function () {
      let cityTest = cityRegExp.test(city.value);
      if (cityTest) {
        cityMsg.textContent = validForm;
        city.style.border = border;
        city.style.backgroundColor = validBackground;
      } else {
        cityMsg.textContent = errorForm;
        city.style.border = border;
        city.style.backgroundColor = errorBackground;
      }
    });
  }
  setCity();

  // Email

  function setEmail() {
    email.addEventListener("input", function () {
      let emailTest = emailRegExp.test(email.value);
      if (emailTest) {
        emailMsg.textContent = validForm;
        email.style.border = border;
        email.style.backgroundColor = validBackground;
      } else {
        emailMsg.textContent = errorForm;
        email.style.border = border;
        email.style.backgroundColor = errorBackground;
      }
    });
  }
  setEmail();
}
setForm();

/********************************************* Validation des commandes *********************************************/

let emptyCart = "panier vide";
let formError = "Au moins 1 champ est non valide";

function orderCart() {
  const orderButton = document.querySelector("#order");

  orderButton.addEventListener("click", function (click) {
    // En cas de problèmes

    if (cart == null || cart == "") {
      click.preventDefault();
      alert(emptyCart);
      return;
    } else if (
      firstName.value == "" ||
      lastName.value == "" ||
      address.value == "" ||
      city.value == "" ||
      email.value == ""
    ) {
      return;
    } else if (
      textRegExp.test(firstName.value) == false ||
      textRegExp.test(lastName.value) == false ||
      addressRegExp.test(address.value) == false ||
      textRegExp.test(city.value) == false ||
      emailRegExp.test(email.value) == false
    ) {
      click.preventDefault();
      alert(formError);
      return;
    } else {
      // Envoi de la commande

      click.preventDefault();

      const contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      };

      const fetchPost = fetch(`${_apiUrl}/order`, {
        method: "POST",
        body: JSON.stringify({ contact, products }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      fetchPost.then(async function (response) {
        try {
          const content = await response.json();
          localStorage.clear("orderProduct");
          window.location = `../html/confirmation.html?id=${content.orderId}`;
        } catch (error) {
          console.log(error);
        }
      });
    }
  });
}

orderCart();
