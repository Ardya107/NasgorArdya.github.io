// Import data produk
import products from "./products.js";

// Fungsi untuk menampilkan produk di elemen HTML dengan id "menu"
function renderMenuCards() {
  const menuContainer = document.querySelector(".menu .row");
  menuContainer.innerHTML = "";

  products.forEach((product) => {
    const menuCard = document.createElement("div");
    menuCard.classList.add("menu-card");
    menuCard.setAttribute("data-id", product.id);

    menuCard.innerHTML = `
      <div class="menu-icons">
        <a href="javascript:void(0)" class="add-to-cart"><i data-feather="shopping-cart"></i></a>
        <a href="javascript:void(0);" class="view-details" data-id="${product.id}">
          <i data-feather="eye"></i>
        </a>
      </div>
      <img src="${product.image}" alt="${product.name}" />
      <h3 class="menu-card-title">-${product.name}-</h3>
      <p class="menu-card-price">Rp ${product.price.toLocaleString("id-ID")}</p>
    `;

    menuCard
      .querySelector(".view-details")
      .addEventListener("click", () => showModal(product));
    menuCard
      .querySelector(".add-to-cart")
      .addEventListener("click", () => addToCart(product));

    menuContainer.appendChild(menuCard);
  });

  feather.replace();
}

// Fungsi untuk menampilkan modal produk
function showModal(product) {
  const existingModal = document.querySelector(".modal-box");
  if (existingModal) existingModal.remove();

  const modalBox = document.createElement("div");
  modalBox.classList.add("modal-box");
  modalBox.style.display = "block";

  modalBox.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-content">
        <h2>${product.name}</h2>
        <p><span>Deskripsi:</span> ${product.description}</p>
        <div class="product-stars">${"★".repeat(product.rating)}${"☆".repeat(
    5 - product.rating
  )}</div>
        <div class="product-price">Rp ${product.price.toLocaleString(
          "id-ID"
        )}</div>
        <a href="javascript:void(0)" class="add-to-cart-modal"><i data-feather="shopping-cart"></i><span>add to cart</span></a>
      </div>
    </div>
  `;

  document.body.appendChild(modalBox);
  feather.replace();

  modalBox
    .querySelector(".add-to-cart-modal")
    .addEventListener("click", () => addToCart(product));
  modalBox.querySelector(".close").addEventListener("click", closeModal);
  modalBox.addEventListener("click", (e) => {
    if (e.target === modalBox) {
      closeModal();
    }
  });
}

// Fungsi untuk menutup modal
function closeModal() {
  const modalBox = document.querySelector(".modal-box");
  if (modalBox) {
    modalBox.remove();
  }
}

// Fungsi untuk menambahkan produk ke dalam keranjang belanja
function addToCart(product) {
  const cartContainer = document.querySelector(".shopping-cart .cart");
  const existingCartItem = cartContainer.querySelector(
    `.cart-item[data-id="${product.id}"]`
  );

  if (existingCartItem) {
    const quantityElement = existingCartItem.querySelector(".item-quantity");
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;

    updateItemTotal(existingCartItem, product.price, quantity);
  } else {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.setAttribute("data-id", product.id);

    cartItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="item-detail">
        <h3>${product.name}</h3>
        <div class="item-price">Rp ${product.price.toLocaleString(
          "id-ID"
        )}</div>
        <div class="item-quantity-container">
          <button class="quantity-decrease">-</button>
          <span class="item-quantity">1</span>
          <button class="quantity-increase">+</button>
        </div>
        <div class="item-total-price">Rp ${product.price.toLocaleString(
          "id-ID"
        )}</div>
      </div>
      <i data-feather="trash-2" class="remove-item"></i>
    `;

    cartContainer.appendChild(cartItem);
    feather.replace();

    cartItem
      .querySelector(".quantity-increase")
      .addEventListener("click", () =>
        changeQuantity(cartItem, product.price, 1)
      );
    cartItem
      .querySelector(".quantity-decrease")
      .addEventListener("click", () =>
        changeQuantity(cartItem, product.price, -1)
      );
    cartItem
      .querySelector(".remove-item")
      .addEventListener("click", () => removeFromCart(cartItem));
  }

  updateCartDisplay();
}

// Fungsi untuk mengubah quantity item di keranjang
function changeQuantity(cartItem, price, change) {
  const quantityElement = cartItem.querySelector(".item-quantity");
  let quantity = parseInt(quantityElement.textContent);
  quantity += change;

  if (quantity <= 0) {
    removeFromCart(cartItem);
  } else {
    quantityElement.textContent = quantity;
    updateItemTotal(cartItem, price, quantity);
  }

  updateCartDisplay();
}

// Fungsi untuk memperbarui total harga item berdasarkan quantity
function updateItemTotal(cartItem, price, quantity) {
  const totalPriceElement = cartItem.querySelector(".item-total-price");
  const totalPrice = price * quantity;
  totalPriceElement.textContent = `Rp ${totalPrice.toLocaleString("id-ID")}`;
}

// Fungsi untuk menghapus produk dari keranjang belanja
function removeFromCart(cartItem) {
  cartItem.remove();
  updateCartDisplay();

  const shoppingCart = document.querySelector(".shopping-cart");
  if (shoppingCart && !shoppingCart.classList.contains("active")) {
    shoppingCart.classList.add("active");
  }
}

// Fungsi untuk memperbarui tampilan keranjang
function updateCartDisplay() {
  const cartContainer = document.querySelector(".shopping-cart .cart");
  const cartItems = cartContainer.querySelectorAll(".cart-item");
  const quantityIcon = document.querySelector("#shopping-cart .qty-icon");
  const totalPriceElement = document.querySelector(".total-price");
  const subBar = document.querySelector(".sub-bar"); // Elemen yang akan disembunyikan atau ditampilkan
  const checkoutForm = document.querySelector("#checkout-form"); // Elemen checkout form

  let totalQuantity = 0;
  let totalCartPrice = 0;

  cartItems.forEach((item) => {
    const quantity = parseInt(item.querySelector(".item-quantity").textContent);
    const itemPrice = parseInt(
      item.querySelector(".item-price").textContent.replace(/[^0-9]/g, "")
    );
    totalQuantity += quantity;
    totalCartPrice += itemPrice * quantity;
  });

  if (totalQuantity === 0) {
    if (!cartContainer.querySelector(".empty-cart-message")) {
      const emptyMessage = document.createElement("div");
      emptyMessage.classList.add("empty-cart-message");
      emptyMessage.textContent = "Cart Kosong";
      cartContainer.appendChild(emptyMessage);
    }
    if (subBar) subBar.style.display = "none"; // Sembunyikan sub-bar jika keranjang kosong
    if (checkoutForm) checkoutForm.style.display = "none"; // Sembunyikan form jika keranjang kosong
  } else {
    const emptyMessage = cartContainer.querySelector(".empty-cart-message");
    if (emptyMessage) emptyMessage.remove();
    if (subBar) subBar.style.display = "block"; // Tampilkan sub-bar jika keranjang tidak kosong
    if (checkoutForm) checkoutForm.style.display = "block"; // Tampilkan form jika keranjang tidak kosong
  }

  // Update quantity icon
  quantityIcon.textContent = totalQuantity > 0 ? totalQuantity : "";

  // Update total cart price
  totalPriceElement.textContent = `Rp ${totalCartPrice.toLocaleString(
    "id-ID"
  )}`;
}

// Event listener untuk memastikan fungsi dijalankan setelah konten halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  renderMenuCards();
  updateCartDisplay();
});
