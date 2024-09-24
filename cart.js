// Fetching products from Fake Store API
fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(products => {
    let productContainer = document.getElementById('product-list');
    products.forEach(product => {
      productContainer.innerHTML += `
        <div class="product">
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>Rating: ${product.rating.rate}</p>
          <p>Price: ₹${product.price}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      `;
    });
  });
  let cart = [];

  function addToCart(productId) {
    // Find the product by ID from the fake API
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(res => res.json())
      .then(product => {
        cart.push(product);
        displayCart();
      });
  }
  
  function displayCart() {
    let cartContainer = document.getElementById('cart-list');
    cartContainer.innerHTML = '';
    cart.forEach(item => {
      cartContainer.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}">
          <p>${item.title}</p>
          <p>₹${item.price}</p>
          <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      `;
    });
  }function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    displayCart();
  }
  function addToCart(productId) {
    const productInCart = cart.find(item => item.id === productId);
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
          product.quantity = 1;
          cart.push(product);
          displayCart();
        });
    }
    displayCart();
  }
  function displayCart() {
    let cartContainer = document.getElementById('cart-list');
    cartContainer.innerHTML = '';
    cart.forEach(item => {
      cartContainer.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}">
          <p>${item.title}</p>
          <p>₹${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
          <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      `;
    });
  }
  function searchProducts() {
    let query = document.getElementById('search-input').value.toLowerCase();
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(products => {
        let filteredProducts = products.filter(product =>
          product.title.toLowerCase().includes(query)
        );
        displayProducts(filteredProducts);
      });
  }
  function displayProducts(products) {
    let productContainer = document.getElementById('product-list');
    productContainer.innerHTML = '';
    products.forEach(product => {
      productContainer.innerHTML += `
        <div class="product">
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>Price: ₹${product.price}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      `;
    });
  }
  
  