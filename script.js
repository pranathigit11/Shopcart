const products = [
  { id: 1, name: "Wireless Earbuds", category: "Electronics", rating: 4.4, price: 39.99 },
  { id: 2, name: "Smart Watch", category: "Electronics", rating: 4.2, price: 89.00 },
  { id: 3, name: "Coffee Maker", category: "Home", rating: 4.1, price: 59.50 },
  { id: 4, name: "Air Fryer", category: "Home", rating: 4.6, price: 99.99 },
  { id: 5, name: "Denim Jacket", category: "Fashion", rating: 4.0, price: 49.00 },
  { id: 6, name: "Running Shoes", category: "Fashion", rating: 4.5, price: 64.99 }
];

const cart = [];
let activeCategory = "All";

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const subtotal = document.getElementById("subtotal");
const cartPanel = document.getElementById("cartPanel");

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = !query || product.name.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = filtered
    .map(
      (product) => `
        <article class="card">
          <h3>${product.name}</h3>
          <p class="muted">${product.category} • ★ ${product.rating}</p>
          <div class="card-footer">
            <strong>$${product.price.toFixed(2)}</strong>
            <button data-product-id="${product.id}" type="button">Add to cart</button>
          </div>
        </article>
      `
    )
    .join("");
}

function updateCart() {
  cartCount.textContent = String(cart.length);
  cartItems.innerHTML = cart
    .map((item) => `<li>${item.name} — $${item.price.toFixed(2)}</li>`)
    .join("");
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  subtotal.textContent = total.toFixed(2);
}

document.querySelector(".categories").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");
  if (!button) {
    return;
  }
  activeCategory = button.dataset.category;
  renderProducts();
});

searchInput.addEventListener("input", renderProducts);

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-product-id]");
  if (!button) {
    return;
  }
  const selected = products.find((product) => product.id === Number(button.dataset.productId));
  if (!selected) {
    return;
  }
  cart.push(selected);
  updateCart();
});

document.getElementById("cartButton").addEventListener("click", () => {
  cartPanel.classList.toggle("hidden");
});

document.getElementById("closeCart").addEventListener("click", () => {
  cartPanel.classList.add("hidden");
});

renderProducts();
updateCart();
