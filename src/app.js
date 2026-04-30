/* Toggle Menu Bar */
const ulList = document.getElementById("ulList");
function toggleMenu() {
  ulList.classList.toggle("hidden");
}

/* Toogle Cart */
const cartIcon = document.getElementById("carts");
const sideCartbtn = document.getElementById("sideCart");
const cartPage = document.getElementById("cartPage");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartQuantity = document.querySelector(".cartQuantity");
const sideCartQty = document.querySelector("#sideCart h4");

cartIcon.addEventListener("click", () => {
  cartPage.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
sideCartbtn.addEventListener("click", () => {
  cartPage.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
overlay.addEventListener("click", () => {
  cartPage.classList.add("hidden");
  overlay.classList.add("hidden");
  document.body.style.overflow = "auto";
});
closeCart.addEventListener("click", () => {
  cartPage.classList.add("hidden");
  overlay.classList.add("hidden");
  document.body.style.overflow = "auto";
});

// Add to Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const carticon = document.querySelectorAll(".cart");

carticon.forEach((btns) => {
  btns.addEventListener("click", (e) => {
    const card = e.target.closest(".card");

    const img = card.querySelector("img").src;
    const name = card.querySelector("h3").innerText;
    const price = Number(card.querySelector("h4").innerText.replace("$", ""));

    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        img,
        name,
        price,
        quantity: 1,
      });
    }
    renderCart();
  });
});

function renderCart() {
  // Remove Old Item
  cartPage.querySelectorAll(".box .item, .box .empty-msg")
    .forEach(el => el.remove());

  let total = 0;
  let totalQty = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    totalQty += item.quantity;

    const div = document.createElement("div");
    div.className =
      "item mt-3 flex items-center justify-between bg-slate-300 p-1 rounded-md ";

    div.innerHTML = `
                  <img class="w-12 rounded-md" src="${item.img}">
                <h3 class="font-semibold text-[#007085]">${item.name}</h3>
                <h4 class="font-semibold text-[#007085]">$${item.price}</h4>
                <div class="buttons bg-slate-300 flex gap-3 items-center p-[2px] ">
                    <button class="plus bg-[#007085]  px-2 font-bold text-white">+</button>
                    <span class=" font-semibold">${item.quantity}</span>
                    <button class="minus bg-[#007085]  px-2 font-bold text-white">-</button>
                    <button class=" remove bg-[#007085]  px-2 font-bold text-white">x</button>
                </div>
  `;
    cartPage.querySelector('.box').appendChild(div)
    // Add button Events
    div.querySelector(".plus").addEventListener("click", () => {
      item.quantity++;
      renderCart();
    });
    div.querySelector(".minus").addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart.splice(index, 1);
      }
      renderCart();
    });
    div.querySelector(".remove").addEventListener("click", () => {
      cart.splice(index, 1);
      renderCart();
    });
  });
  if (cart.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.innerText = "Your Cart is empty";
    emptyMsg.className = "empty-msg text-white text-center mt-5";
    cartPage.querySelector('.box').appendChild(emptyMsg);
  }
  // Total Update
  const totalText = cartPage.querySelector(".total h1");
  totalText.innerText = `
Total :   $${total}`;

  if (cartQuantity) cartQuantity.innerText = totalQty;
  if (sideCartQty) sideCartQty.innerText = totalQty;

  localStorage.setItem("cart", JSON.stringify(cart));
}
renderCart();
