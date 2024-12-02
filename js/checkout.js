document.addEventListener("DOMContentLoaded", () => {
    const checkoutForm = document.getElementById("checkout-form");
    const checkoutButton = document.getElementById("checkout-button");
  
    checkoutButton.addEventListener("click", (event) => {
      event.preventDefault(); // Mencegah form dari pengiriman default
  
      // Ambil detail pelanggan
      const name = document.getElementById("name").value.trim();
      const address = document.getElementById("addres").value.trim();
      const phone = document.getElementById("phone").value.trim();
  
      // Validasi input form
      if (!name || !address || !phone) {
        alert("Silakan lengkapi semua data pelanggan sebelum melanjutkan.");
        return;
      }
  
      // Ambil data keranjang belanja
      const cartItems = document.querySelectorAll(".shopping-cart .cart-item");
      if (cartItems.length === 0) {
        alert("Keranjang belanja kosong. Tambahkan item sebelum checkout.");
        return;
      }
  
      let cartDetails = "";
      cartItems.forEach((item, index) => {
        const itemName = item.querySelector("h3").textContent;
        const itemQuantity = item.querySelector(".item-quantity").textContent;
        const itemTotalPrice = item.querySelector(".item-total-price").textContent;
        cartDetails += `${index + 1}. ${itemName} - ${itemQuantity} pcs - ${itemTotalPrice}\n`;
      });
  
      // Hitung total harga
      const totalPrice = document.querySelector(".total-price").textContent;
  
      // Format pesan WhatsApp
      const message = `Halo, saya ingin melakukan pesanan dengan detail berikut:\n\n` +
        `*Customer Details:*\n` +
        `Nama: ${name}\n` +
        `Alamat: ${address}\n` +
        `Nomor Telepon: ${phone}\n\n` +
        `*Order Details:*\n` +
        `${cartDetails}\n` +
        `*Total Harga:*\n${totalPrice}\n\n` +
        `Mohon konfirmasi pesanan saya. Terima kasih!`;
  
      // Nomor WhatsApp tujuan (ganti dengan nomor Anda)
      const whatsappNumber = "6283803612385"; // Nomor dengan format internasional tanpa tanda "+"
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  
      // Redirect ke WhatsApp
      window.open(whatsappURL, "_blank");
    });
  });
  