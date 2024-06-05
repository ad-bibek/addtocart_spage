document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const cartButton = document.getElementById("cart-button");
  const cartCount = document.getElementById("cart-count");
  const modal = document.getElementById("product-modal");
  const modalContent = document.getElementById("modal-details");
  const closeModal = document.querySelector(".close");
  const searchForm = document.getElementById("search-form");
  const searchBar = document.getElementById("search-bar");
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let products = [];
  const token = 'YOUR_BEARER_TOKEN_HERE'; // Replace with your actual token
  setupSlider();

  cartCount.textContent = cart.length;

  axios.get("https://dummyjson.com/products", {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    products = response.data.products;
    displayProducts(products);
  })
  .catch(error => console.error("Error fetching products:", error));

  function displayProducts(products) {
    productList.innerHTML = '';
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

    document.querySelectorAll(".product").forEach(product => {
      product.addEventListener("click", (event) => {
        if (event.target.tagName.toLowerCase() === 'button') {
          return;
        }

        const productId = product.getAttribute('data-id');
        axios.get(`https://dummyjson.com/products/${productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          const productData = response.data;
          showModal(productData);
        })
        .catch(error => {
          console.error("Error fetching product details:", error);
        });
      });
    });

    document.querySelectorAll(".product button").forEach(button => {
      button.addEventListener("click", addToCart);
    });
  }

  function addToCart(event) {
    event.stopPropagation();
    const productId = event.target.getAttribute("data-id");

    axios.get(`https://dummyjson.com/products/${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      const product = response.data;
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

  // Search functionality
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchBar.value.toLowerCase();
    const filteredProducts = products.filter(product => 
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
  });

  function setupSlider() {
    const imgs = document.querySelectorAll('.header-slider ul img');
    const prev_btn = document.querySelector('.control_prev');
    const next_btn = document.querySelector('.control_next');

    let n = 0;

    function changeSlide() {
      imgs.forEach((img, i) => {
        img.style.display = i === n ? 'block' : 'none';
      });
    }

    changeSlide();

    prev_btn.addEventListener('click', () => {
      n = (n > 0) ? n - 1 : imgs.length - 1;
      changeSlide();
    });

    next_btn.addEventListener('click', () => {
      n = (n < imgs.length - 1) ? n + 1 : 0;
      changeSlide();
    });
  }
});
