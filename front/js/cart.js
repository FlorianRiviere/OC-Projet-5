const cart = []; /* Tableau pour récupérer le localStorage */
const item = JSON.parse(localStorage.getItem("orderProduct"));
cart.push(item);

/* Tableau pour récupérer les prix totaux */

let arrayPrice = [];

/* Tableau pour envoyer à l'API */

let products = [];

if (localStorage.length == 0) {
  const cartItem = document.querySelector("#cart__items");
  cartItem.textContent = "Panier vide";
} else {
  for (let i = 0; i < item.length; i++) {
    // Création du tableau récapitulatif du panier (html)

    const fetchGet = fetch(`http://localhost:3000/api/products/${item[i].id}`);

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
              nb = new Intl.NumberFormat().format(data.price);
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
            function getTotalPrice() {
              let totalPriceArticle = data.price * item[i].quantity;
              arrayPrice.push(totalPriceArticle);

              let totalCart = 0;
              for (let i = 0; i < arrayPrice.length; i++) {
                totalCart += arrayPrice[i];
              }
              nb1 = new Intl.NumberFormat().format(totalCart);
            }
            getTotalPrice();

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

function setForm() {
  // Prénom
  function setFirstName() {
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
        this.style.backgroundColor = "#FF7A7A";
      }
    });
  }
  setFirstName();

  // Nom
  function setLastName() {
    let lastName = document.querySelector("#lastName");

    lastName.addEventListener("input", function () {
      let lastNameRegExp = new RegExp("([A-Z])([A-Za-zéèê-]+)");

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
  }
  setLastName();

  // Adresse
  function setAdress() {
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
  }
  setAdress();

  // Ville
  function setCity() {
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
  }
  setCity();

  // Email
  function setEmail() {
    let email = document.querySelector("#email");

    email.addEventListener("input", function () {
      let emailRegExp = new RegExp(
        "^[A-Za-z0-9.-_]+[@]{1}[A-Za-z0-9.-_]+[.][A-Za-z]+$"
      );

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
  }
  setEmail();
}
setForm();

/********************************************* Validation des commandes *********************************************/

function orderCart() {
  const orderButton = document.querySelector("#order");

  orderButton.addEventListener("click", function (click) {
    if (cart == null || cart == "") {
      click.preventDefault();
      alert("Panier vide");
      return;
    } else if (
      firstName.value == "" ||
      lastName.value == "" ||
      address.value == "" ||
      city.value == "" ||
      email.value == ""
    ) {
      return;
    } else {
      click.preventDefault();

      const contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      };

      const fetchPost = fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify({ contact, products }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      fetchPost.then(async function (response) {
        try {
          const content = await response.json();
          localStorage.clear();
          window.location = `../html/confirmation.html?id=${content.orderId}`;
        } catch (error) {
          console.log(error);
        }
      });
    }
  });
}

orderCart();
