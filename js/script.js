// Ambil elemen yang diperlukan
const hamburgerMenu = document.getElementById("hamburger-menu");
const navbarNav = document.querySelector(".navbar-nav");
const searchForm = document.querySelector(".search-form");
const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const cartItem = document.querySelector(".Cart-item");
const shoppingCart = document.querySelector(".shopping-cart");
const scb = document.getElementById("shopping-cart");

// Fungsi untuk toggle sidebar
hamburgerMenu.addEventListener("click", function (e) {
  navbarNav.classList.toggle("active");

  // Pastikan search form tertutup saat menu dibuka
  searchForm.classList.remove("active");
  shoppingCart.classList.remove("active");

  e.stopPropagation(); // Mencegah event klik dari meluas ke document
  e.preventDefault();
});

// Fungsi untuk toggle search form
searchButton.addEventListener("click", function (e) {
  searchForm.classList.toggle("active");
  searchBox.focus();

  // Pastikan elemen lain tertutup
  navbarNav.classList.remove("active");
  shoppingCart.classList.remove("active");

  e.stopPropagation(); // Mencegah event klik dari meluas ke document
  e.preventDefault();
});

// Fungsi untuk toggle shopping Cart
scb.addEventListener("click", function (e) {
  shoppingCart.classList.toggle("active");

  // Pastikan elemen lain tertutup
  navbarNav.classList.remove("active");
  searchForm.classList.remove("active");

  e.stopPropagation(); // Mencegah event klik dari meluas ke document
  e.preventDefault();
});

// Klik di luar sidebar untuk menutup navbarNav
document.addEventListener("click", function (e) {
  // Cek apakah klik di luar navbar-nav dan hamburgerMenu
  if (!navbarNav.contains(e.target) && !hamburgerMenu.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  // Cek apakah klik di luar searchForm dan searchButton
  if (!searchForm.contains(e.target) && !searchButton.contains(e.target)) {
    searchForm.classList.remove("active");
  }

  // Cek apakah klik di luar searchForm dan searchButton
  if (!shoppingCart.contains(e.target) && !scb.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// mulai logika untuk membuka eye detail
document.addEventListener("DOMContentLoaded", function () {
  // Fungsi untuk membuka modal box
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
    }
  }

  // Fungsi untuk menutup modal box
  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  };

  // Tambahkan event listener pada setiap ikon "eye"
  document.querySelectorAll(".view-details").forEach((icon) => {
    icon.addEventListener("click", (event) => {
      event.preventDefault();
      const modalId = icon.getAttribute("data-modal"); // Mendapatkan ID modal dari data-modal
      openModal(modalId); // Membuka modal sesuai ID yang dipilih
    });
  });

  // Event untuk menutup modal saat klik di luar konten modal
  window.addEventListener("click", function (event) {
    document.querySelectorAll(".modal-box").forEach((modal) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
});
// ======================= Scroll Reveal =================================================================
ScrollReveal({
  // reset: true,
  distance:'10px',
  duration:2000,
  delay:200,
});

ScrollReveal().reveal('.hero, .modal-box', { origin:'top' });
ScrollReveal().reveal('.about', { origin:'bottom' });
ScrollReveal().reveal('.menu', { origin:'left' });
ScrollReveal().reveal('.contact', { origin:'right' });