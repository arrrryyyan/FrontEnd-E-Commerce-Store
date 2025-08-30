const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

let products = [];

async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  products = await res.json();
  displayProducts(products);
}

function displayProducts(productList) {
  productsContainer.innerHTML = "";
  productList.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    `;
    productsContainer.appendChild(div);
  });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(query)
  );
  displayProducts(filtered);
});

sortSelect.addEventListener("change", () => {
  const value = sortSelect.value;
  let sorted = [...products];
  if (value === "asc") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (value === "desc") {
    sorted.sort((a, b) => b.price - a.price);
  }
  displayProducts(sorted);
});

fetchProducts();
