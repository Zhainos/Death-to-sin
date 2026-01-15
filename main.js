const products = [
  { id: 1, name: "Pump Cover", price: 40 },
  { id: 2, name: "Pants", price: 65 }
];

// --- Menu functions ---
function openMenu() {
  document.getElementById("menu").style.width = "100%";
}

function closeMenu() {
  document.getElementById("menu").style.width = "0";
}

// --- Cart functions ---
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id, size) {
  const cart = getCart();
  cart.push({ id, size });
  saveCart(cart);
  alert("Added to cart!");
  displayCart(); // update cart view immediately
}

function clearCart() {
  localStorage.removeItem("cart");
  displayCart(); // clear cart view without full reload
}

// --- Display functions ---
function displayProducts() {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = ""; // clear before adding

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";

    // Create HTML content
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <select id="size-${product.id}">
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
      </select>
      <br>
      <button>Add to Cart</button>
    `;

    // Add event listener to button
    const button = div.querySelector("button");
    button.addEventListener("click", () => {
      const size = document.getElementById(`size-${product.id}`).value;
      addToCart(product.id, size);
    });

    container.appendChild(div);
  });
}

function displayCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  if (!container) return;

  const cart = getCart();
  let total = 0;
  container.innerHTML = "";

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      total += product.price;
      const p = document.createElement("p");
      p.textContent = `${product.name} (${item.size}) - $${product.price}`;
      container.appendChild(p);
    }
  });

  totalEl.textContent = `$${total}`;
}

// --- Initialize ---
document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  displayCart();
});
