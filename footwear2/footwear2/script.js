document.addEventListener('DOMContentLoaded', function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const productDetails = button.closest('.product-details');
            const productTitle = productDetails.querySelector('h2').textContent;
            const productPrice = parseFloat(button.getAttribute('data-price'));
            const productImg = productDetails.previousElementSibling.querySelector('img').src;

            const existingProduct = cart.find(item => item.title === productTitle);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ title: productTitle, price: productPrice, img: productImg, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${productTitle} added to cart.`);
            updateCartDisplay();
        });
    });

    function updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = `(${cart.length})`;
        }

        // Display cart items on the product page
        const cartItemsContainer = document.querySelector('.cart-items-container');
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            cart.forEach(function (item) {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <img src="${item.img}" alt="${item.title}" class="cart-item-img">
                    <h3>${item.title}</h3>
                    <p>₹${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
        }

        // Update Cart Summary
        const cartSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        document.getElementById('cart-subtotal').textContent = cartSubtotal.toFixed(2);
        document.getElementById('cart-total').textContent = cartSubtotal.toFixed(2);
    }

    // Remove item from cart
    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    };

    // Checkout function
    window.checkout = function () {
        alert('Proceeding to checkout...');
    };

    // Initialize cart display on load
    updateCartDisplay();

    // Review Functionality
    const productPages = document.querySelectorAll('.product-page');
    productPages.forEach(function (productPage) {
        const reviewSection = document.createElement('div');
        reviewSection.classList.add('review-section');
        reviewSection.innerHTML = `
            <h3>Leave a Review</h3>
            <input type="text" placeholder="Your Name" required>
            <textarea placeholder="Your Review" required></textarea>
            <button class="submit-review">Submit Review</button>
            <div class="reviews-container"></div>
        `;
        productPage.querySelector('.product-details').appendChild(reviewSection);

        const submitReviewButton = reviewSection.querySelector('.submit-review');
        submitReviewButton.addEventListener('click', function () {
            const name = reviewSection.querySelector('input').value;
            const review = reviewSection.querySelector('textarea').value;
            const reviewContainer = reviewSection.querySelector('.reviews-container');

            if (name && review) {
                const reviewItem = document.createElement('div');
                reviewItem.classList.add('review-item');
                reviewItem.innerHTML = `<strong>${name}</strong>: ${review}`;
                reviewContainer.appendChild(reviewItem);

                reviewSection.querySelector('input').value = '';
                reviewSection.querySelector('textarea').value = '';
            } else {
                alert('Please fill out both fields.');
            }
        });
    });

    // Image Zoom Effect
    const images = document.querySelectorAll('.product-page img');
    images.forEach(function (img) {
        img.style.transition = 'transform 0.3s ease'; // Add transition for smoother zoom
        img.addEventListener('mouseover', function () {
            img.style.transform = 'scale(1.5)';
        });

        img.addEventListener('mouseout', function () {
            img.style.transform = 'scale(1)';
        });
    });
});
