// Récupère ID dans l'URL

let params = new URLSearchParams(window.location.search);
let id = params.get("id");

// Affichage du numéro de commande

let orderId = document.querySelector("#orderId");
orderId.textContent = id;
