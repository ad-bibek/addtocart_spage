document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const cartButton = document.getElementById("cart-button");
    const cartCount = document.getElementById("cart-count");
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
        productElement.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}">
          <h2>${product.title}</h2>
          <p>${product.price} USD</p>
          <button data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productElement);
      });
  
      // Add event listener for "Add to Cart" buttons
      document.querySelectorAll(".product button").forEach(button => {
        button.addEventListener("click", addToCart);
      });
    }
  
    function addToCart(event) {
      const productId = event.target.getAttribute("data-id");
      if (!cart.includes(productId)) {
        cart.push(productId);
        cartCount.textContent = cart.length;
      }
    }
  
    cartButton.addEventListener("click", () => {
      alert(`Cart Items: ${cart.join(", ")}`);
    });
  });