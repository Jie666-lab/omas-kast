/* ============================================================
   商品数据（所有页面共用）
   ============================================================ */

const products = [
    {
        id: 1,
        name: "Frozen Bread (Basketbrood)",
        price: 2.50,
        image: "images/placeholder.jpg",
        images: [
            "images/placeholder.jpg",
            "images/image-1.png",
            "images/image-3.png"
        ],
        category: "Bakery",
        rating: 4.5,
        reviews: 12,
        description: "Freshness Guaranteed Sliced Dutch Bread. Perfect for breakfast and sandwiches.",
        ingredients: "Wheat flour, water, yeast, salt, vegetable oil",
        stock: 15
    },
    {
        id: 2,
        name: "Almond Bread (Red Marzipan)",
        price: 5.00,
        image: "images/placeholder.jpg",
         images: [
            "images/placeholder.jpg",
            "images/image-1.png",
            "images/image-3.png"
        ],
        category: "Bakery",
        rating: 4.2,
        reviews: 8,
        description: "Delicious almond bread with red marzipan filling.",
        ingredients: "Almond flour, marzipan, sugar, eggs, butter",
        stock: 10
    },
    {
        id: 3,
        name: "Delicia's Bakkend Current Bread",
        price: 3.91,
        image: "images/placeholder.jpg",
         images: [
            "images/placeholder.jpg",
            "images/image-1.png",
            "images/image-3.png"
        ],
        category: "Bakery",
        rating: 4.8,
        reviews: 15,
        description: "Traditional Dutch current bread, soft and sweet.",
        ingredients: "Wheat flour, currents, sugar, butter, milk",
        stock: 20
    },
    {
        id: 4,
        name: "Van Gogh Thee (Tea)",
        price: 2.50,
        image: "images/placeholder.jpg",
         images: [
            "images/placeholder.jpg",
            "images/image-1.png",
            "images/image-3.png"
        ],
        category: "Drinks",
        rating: 4.6,
        reviews: 22,
        description: "Premium Dutch tea blend inspired by Van Gogh.",
        ingredients: "Black tea, herbs, natural flavors",
        stock: 30
    },
    {
        id: 5,
        name: "Coffee Crema",
        price: 5.99,
        image: "images/placeholder.jpg",
         images: [
            "images/placeholder.jpg",
            "images/image-1.png",
            "images/image-3.png"
        ],
        category: "Drinks",
        rating: 4.9,
        reviews: 28,
        description: "Rich Dutch coffee with smooth crema.",
        ingredients: "100% Arabica coffee beans",
        stock: 25
    },
    {
        id: 6,
        name: "De Ringel Hagelslag",
        price: 3.03,
        image: "images/placeholder.jpg",
         images: [
            "images/placeholder.jpg",
            "images/image-1.png",
            "images/image-3.png"
        ],
        category: "Snacks",
        rating: 4.7,
        reviews: 18,
        description: "Traditional Dutch chocolate sprinkles for bread.",
        ingredients: "Sugar, cocoa, vegetable fat",
        stock: 40
    },
    {
        id: 7,
        name: "Stroopwafels",
        price: 4.49,
        image: "images/placeholder.jpg",
         images: [
            "images/placeholder.jpg",
            "images/image-1.png",
            "images/image-3.png"
        ],
        category: "Snacks",
        rating: 4.8,
        reviews: 35,
        description: "Traditional Dutch stroopwafels with caramel filling.",
        ingredients: "Wheat flour, syrup, butter, cinnamon",
        stock: 50
    },
    {
        id: 8,
        name: "Dutch Cookies Assorted",
        price: 2.99,
        image: "images/placeholder.jpg",
         images: [
            "images/placeholder.jpg",
            "images/image-1.png",
            "images/image-3.png"
        ],
        category: "Snacks",
        rating: 4.3,
        reviews: 14,
        description: "Assorted Dutch cookies, perfect with coffee.",
        ingredients: "Flour, sugar, butter, eggs, vanilla",
        stock: 35
    },
    {
        id: 9,
        name: "Vegetables Mix",
        price: 3.50,
        image: "images/placeholder.jpg",
         images: [
            "images/placeholder.jpg",
            "images/image-1.png",
            "images/image-3.png"
        ],
        category: "Cooking",
        rating: 4.4,
        reviews: 10,
        description: "Fresh Dutch vegetable mix for cooking.",
        ingredients: "Carrots, onions, celery, bell peppers",
        stock: 20
    },
    {
        id: 10,
        name: "Premium Coffee Beans",
        price: 6.99,
        image: "images/placeholder.jpg",
         images: [
            "images/placeholder.jpg",
            "images/image-1.png",
            "images/image-3.png"
        ],
        category: "Drinks",
        rating: 4.7,
        reviews: 24,
        description: "Premium whole coffee beans from Amsterdam.",
        ingredients: "100% Arabica beans",
        stock: 18
    }
];

/* ============================================================
   工具函数（所有页面共用）
   ============================================================ */

// 生成星级评分
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }
    if (halfStar) {
        stars += '⭐';
    }
    
    return stars;
}

// 更新购物车数量显示
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// 添加商品到购物车
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    alert(`${product.name} added to cart!`);
}

/* ============================================================
   主页功能（仅主页使用）
   ============================================================ */

// 生成商品卡片HTML
function createProductCard(product) {
    return `
        <div class="product-card" onclick="goToProduct(${product.id})">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-name">${product.name}</div>
            <div class="product-rating">${generateStars(product.rating)}</div>
            <div class="product-price">Total €${product.price.toFixed(2)}</div>
            <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
}

// 跳转到商品详情页
function goToProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

/*
// 主页初始化
function initHomePage() {
    // 显示Weekly Specials
    const weeklySpecialsElement = document.getElementById('weekly-specials');
    if (weeklySpecialsElement) {
        const weeklySpecials = products.slice(0, 4);
        weeklySpecialsElement.innerHTML = weeklySpecials.map(createProductCard).join('');
    }
*/


// 主页初始化
function initHomePage() {
    // 显示Weekly Specials
    const weeklySpecialsElement = document.getElementById('weekly-specials');
    if (weeklySpecialsElement) {
        // 清空容器
        weeklySpecialsElement.innerHTML = '';
        
        // 用for循环添加前4个商品
        for (let i = 0; i < 4; i++) {
            const product = products[i];
            const cardHTML = createProductCard(product);
            weeklySpecialsElement.innerHTML += cardHTML;
        }
    }
   
    // 显示Today's Top Picks
    const topPicksElement = document.getElementById('top-picks');
    if (topPicksElement) {
        const topPicks = products.slice(4, 8);
        topPicksElement.innerHTML = topPicks.map(createProductCard).join('');
    }
    
    // 显示所有商品
    const allProductsElement = document.getElementById('all-products');
    if (allProductsElement) {
        allProductsElement.innerHTML = products.map(createProductCard).join('');
    }
    
    // Back to Top按钮
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/* ============================================================
   商品详情页功能（仅商品详情页使用）
   ============================================================ */

// 商品详情页初始化
function initProductDetailPage() {
    // 读取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        alert('Product not found!');
        window.location.href = 'index.html';
        return;
    }
    
    // 找到对应商品
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        alert('Product not found!');
        window.location.href = 'index.html';
        return;
    }
    
    // 显示商品信息
    displayProductDetail(product);
    
    // 显示相似商品
    displaySimilarProducts(product);
    
    // 设置数量选择器
    setupQuantitySelector();
    
    // 设置Add to Cart按钮
    setupAddToCartButton(product);
}

// 显示商品详情
function displayProductDetail(product) {
    // ========== 显示主图 ==========
    const mainImage = document.querySelector('.main-image');
    mainImage.src = product.image;
    
    // ========== 显示商品信息 ==========
    document.querySelector('.product-info h1').textContent = product.name;
    document.querySelector('.stars').textContent = generateStars(product.rating);
    document.querySelector('.review-count').textContent = `(${product.reviews} reviews)`;
    document.querySelector('.product-price-large').textContent = `€${product.price.toFixed(2)}`;
    document.querySelector('.product-description').textContent = product.description;
    document.querySelector('.ingredients p').textContent = product.ingredients;

    // ========== 显示缩略图并添加点击切换功能 ==========
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // 如果商品有images数组就用，没有就用主图复制3份
    const images = product.images || [product.image, product.image, product.image];
    
    thumbnails.forEach((thumbnail, index) => {
        // 设置缩略图的图片
        if (images[index]) {
            thumbnail.src = images[index];
            
            // 添加点击事件
            thumbnail.addEventListener('click', function() {
                // 切换主图
                mainImage.src = images[index];
                
                // 更新active状态
                thumbnails.forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
            });
        } else {
            // 如果没有这张图片，隐藏这个缩略图
            thumbnail.style.display = 'none';
        }
    });
    
}

// 显示相似商品
function displaySimilarProducts(currentProduct) {
    const similarProducts = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);
    
    const similarProductsGrid = document.querySelector('.similar-products .product-grid');
    if (similarProductsGrid) {
        similarProductsGrid.innerHTML = similarProducts.map(createProductCard).join('');
    }
}

// 设置数量选择器
function setupQuantitySelector() {
    const quantityInput = document.querySelector('.quantity-input');
    const minusBtn = document.querySelector('.quantity-btn:first-child');
    const plusBtn = document.querySelector('.quantity-btn:last-child');
    
    if (minusBtn) {
        minusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
    }
    
    if (plusBtn) {
        plusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
        });
    }
}

// 设置Add to Cart按钮
function setupAddToCartButton(product) {
    const addToCartBtn = document.querySelector('.btn-add-to-cart-large');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const quantity = parseInt(document.querySelector('.quantity-input').value);
            addToCart(product.id, quantity);
        });
    }
}

/* ============================================================
   购物车页功能（仅购物车页使用）
   ============================================================ */

// 购物车页初始化
function initCartPage() {
    displayCart();
    displayRecommendations();
}

// 显示购物车内容
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyCart = document.querySelector('.empty-cart');
    const cartContent = document.querySelector('.cart-content');
    
    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartContent) cartContent.style.display = 'none';
        return;
    }
    
    if (emptyCart) emptyCart.style.display = 'none';
    if (cartContent) cartContent.style.display = 'grid';
    
    // 显示购物车商品
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = cart.map(item => createCartItemHTML(item)).join('');
        
        // 绑定事件
        bindCartItemEvents();
    }
    
    // 更新总价
    updateCartSummary(cart);
}

// 生成购物车商品HTML
function createCartItemHTML(item) {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    
    return `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p class="cart-item-price">€${item.price.toFixed(2)}</p>
                <div class="cart-item-controls">
                    <button class="qty-minus">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="qty-input" readonly>
                    <button class="qty-plus">+</button>
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="cart-item-total">€${itemTotal}</div>
                <button class="btn-remove">Remove</button>
            </div>
        </div>
    `;
}

// 绑定购物车商品事件
function bindCartItemEvents() {
    // 增加数量
    document.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const productId = parseInt(cartItem.dataset.id);
            updateCartItemQuantity(productId, 1);
        });
    });
    
    // 减少数量
    document.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const productId = parseInt(cartItem.dataset.id);
            updateCartItemQuantity(productId, -1);
        });
    });
    
    // 删除商品
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const productId = parseInt(cartItem.dataset.id);
            removeCartItem(productId);
        });
    });
}

// 更新购物车商品数量
function updateCartItemQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(i => i.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }
}

// 删除购物车商品
function removeCartItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// 更新购物车总价
function updateCartSummary(cart) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = 0;
    const shipping = subtotal > 50 ? 0 : 5.99;
    const total = subtotal - discount + shipping;
    
    document.querySelector('.summary-row:nth-child(1) span:last-child').textContent = `€${subtotal.toFixed(2)}`;
    document.querySelector('.summary-row:nth-child(2) span:last-child').textContent = `€${discount.toFixed(2)}`;
    document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`;
    document.querySelector('.summary-row.total span:last-child').textContent = `€${total.toFixed(2)}`;
}

// 显示推荐商品
function displayRecommendations() {
    const recommendationsGrid = document.querySelector('.recommendations .product-grid');
    if (recommendationsGrid) {
        const recommended = products.slice(0, 4);
        recommendationsGrid.innerHTML = recommended.map(createProductCard).join('');
    }
}

// 结账按钮
function setupCheckoutButton() {
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('Checkout functionality will be implemented soon!');
        });
    }
}

/* ============================================================
   页面加载时初始化（所有页面）
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
    // 更新购物车数量（所有页面都需要）
    updateCartCount();
    
    // 根据页面执行不同的初始化
    if (document.getElementById('weekly-specials')) {
        // 主页
        initHomePage();
    } else if (document.querySelector('.product-detail-main')) {
        // 商品详情页
        initProductDetailPage();
    } else if (document.querySelector('.cart-container')) {
        // 购物车页
        initCartPage();
        setupCheckoutButton();
    }
});