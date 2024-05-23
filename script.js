document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const cartButton = document.getElementById("cart-button");
    const cartCount = document.getElementById("cart-count");
    const modal = document.getElementById("product-modal");
    const modalContent = document.getElementById("modal-details");
    const closeModal = document.querySelector(".close");
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Update cart count on page load
    cartCount.textContent = cart.length;
  
    // Fetch products from DummyJSON API
    fetch("https://dummyjson.com/products")
      .then(response => response.json())
      .then(data => {
        displayProducts(data.products);
      })
      .catch(error => console.error("Error fetching products:", error));
  
    function displayProducts(products) {
      products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "product";
        productElement.setAttribute("data-id", product.id);
        productElement.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}">
          <h2>${product.title}</h2>
          <p>${product.price} USD</p>
          <button data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productElement);
      });
  
      // Add event listener for product clicks
      document.querySelectorAll(".product").forEach(product => {
        product.addEventListener("click", (event) => {
          if (event.target.tagName.toLowerCase() === 'button') {
            return;
          }
  
          const productId = product.getAttribute("data-id");
          fetch(`https://dummyjson.com/products/${productId}`)
            .then(response => response.json())
            .then(productData => showModal(productData))
            .catch(error => console.error("Error fetching product details:", error));
        });
      });
  
      // Add event listener for "Add to Cart" buttons
      document.querySelectorAll(".product button").forEach(button => {
        button.addEventListener("click", addToCart);
      });
    }
  
    function addToCart(event) {
      event.stopPropagation();
      const productId = event.target.getAttribute("data-id");
  
      fetch(`https://dummyjson.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
          if (!cart.find(item => item.id === product.id)) {
            cart.push(product);
            cartCount.textContent = cart.length;
            localStorage.setItem('cart', JSON.stringify(cart));
          }
  
          // Navigate to cart page
          window.location.href = 'cart.html';
        })
        .catch(error => console.error("Error adding product to cart:", error));
    }
  
    function showModal(product) {
      modalContent.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>${product.price} USD</p>
        <button data-id="${product.id}">Add to Cart</button>
      `;
      modal.style.display = "block";
  
      modalContent.querySelector("button").addEventListener("click", addToCart);
    }
  
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  
    cartButton.addEventListener("click", () => {
      window.location.href = 'cart.html';
    });
  });