document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const buyButton = document.getElementById("buy-button");
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    
    function renderCartItems() {
        cartItemsContainer.innerHTML = ""; 

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        cart.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.className = "cart-item";
            itemElement.innerHTML = `
                <img src="${item.thumbnail}" alt="${item.title}">
                <h2>${item.title}</h2>
                <p>${item.price} USD</p>
                <button class="remove-button" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Attach event listeners to remove buttons
        const removeButtons = cartItemsContainer.querySelectorAll(".remove-button");
        removeButtons.forEach(button => {
            button.addEventListener("click", removeFromCart);
        });
    }

        function removeFromCart(event) {
        const productId = event.target.getAttribute("data-id");
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }

        buyButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        alert("Thank you for your purchase!");
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    });

       renderCartItems();
});
