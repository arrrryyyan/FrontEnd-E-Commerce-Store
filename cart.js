const cartContainer = document.getElementById("cart-container");

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = "";
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(product => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>$${product.price.toFixed(2)}</p>
    `;
    cartContainer.appendChild(div);
  });
}

loadCart();
