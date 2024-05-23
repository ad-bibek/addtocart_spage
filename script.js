document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const cartButton = document.getElementById("cart-button");
    const cartCount = document.getElementById("cart-count");
    const modal = document.getElementById("product-modal");
    const modalContent = document.getElementById("modal-details");
    const closeModal = document.querySelector(".close");
    let cart = [];
  
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
          // Prevent the button click from triggering the modal
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
      event.stopPropagation(); // Prevent the modal from opening when adding to cart
      const productId = event.target.getAttribute("data-id");
      if (!cart.includes(productId)) {
        cart.push(productId);
        cartCount.textContent = cart.length;
      }
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
  
      // Add event listener for modal "Add to Cart" button
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
      alert(`Cart Items: ${cart.join(", ")}`);
    });
  });