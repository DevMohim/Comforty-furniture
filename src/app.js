const list = document.getElementById("ulList");
const menuBtn = document.getElementById("menuBtn");
function toogle() {
  list.classList.toggle("hidden");
}

const cartbox = document.getElementById("cartBox");
const carts = document.getElementById("carts");
function toogleCarts() {
  cartbox.classList.toggle("hidden");
}
/* ======================================================
Add to Cart a item
====================================================== */

let cart = [];

const cartBox = document.getElementById("cartBox");
const cartBtns = document.querySelectorAll(".cart");
const cartList = document.getElementById("cartList");
const totalPriceEl = document.getElementById("totalPrice");

cartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.getAttribute("data-name");
    const price = Number(btn.getAttribute("data-price"));

    addToCart(name, price);

    cartBox.classList.remove("hidden");
  });
});

function addToCart(name, price) {
  // check product already exists
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1; // 🔥 quantity বাড়বে
  } else {
    cart.push({
      id: Date.now(),
      name,
      price,
      quantity: 1,
    });
  }

  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center gap-2 mb-2";

    li.innerHTML = `<div>
        📦 ${item.name} - $${item.price} x ${item.quantity}
      </div>

      <div class="flex gap-4">
        <button class="px-2 bg-green-500 text-white rounded" onclick="changeQty(${item.id}, 1)">+</button>
        <button class="px-2 bg-yellow-500 text-white rounded" onclick="changeQty(${item.id}, -1)">-</button>
        <button class="px-2 bg-red-500 text-white rounded" onclick="removeItem(${item.id})">x</button>
      </div>
  `;

    cartList.appendChild(li);
    total += item.price * item.quantity;
  });
  totalPriceEl.textContent = total;
}
function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);

  if (!item) return;
  item.quantity += delta;

  if (item.quantity <= 0) {
    removeItem(id);
  }
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const data = localStorage.getItem("cart");

  if (data) {
    cart = JSON.parse(data);
  }
}

loadCart();
renderCart();
// function addToCart(name, price) {
//   /*add to cart array */
//   cart.push({ name, price });

//   /* update total price */
//   total += price;

//   /* update ui */
//   renderCart();
// }

// function renderCart() {
//   const cartList = document.getElementById("cartList");
//   const totalPrice = document.getElementById("totalPrice");

//   /*clear previous item */
//   cartList.innerHTML = "";

//   /* Show item */
//   cart.forEach((item) => {
//     const li = document.createElement("li");
//     li.textContent = `${item.name} --- ${item.price}`;

//     cartList.appendChild(li);
//   });

//   textContent.textContent = total;
// }
