fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    console.log(data);

    // Affichage des produits dans la page accueil

    for (let i = 0; i < data.length; i++) {
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

      items.appendChild(card);
      card.appendChild(article);
      article.appendChild(productImage);
      article.appendChild(productName);
      article.appendChild(productDescription);
    }
  })
  .catch(function (Error) {
    console.log(Error);
  });
