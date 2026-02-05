let cart = [];
let total = 0;
let currentSection = ""; // To remember which category user is in
let lastVisibleSection = null;
let currentProductName = "";
function getFinalPrice(product) {
    if (!product.offer) return product.price;

    return Math.round(
        product.price - (product.price * product.offer) / 100
    );
}



function addToCart(item, price) {
    const product = productData[item];

    let cartItem = cart.find(c => c.item === item);

    if (cartItem) {
        cartItem.qty += 1;
    } else {
        cart.push({
            item,
            price,
            img: product.img,
            qty: 1
        });
    }

    updateCartUI();
    syncButtons(item);
}
function updateCartUI() {
    const cartDiv = document.getElementById("cartItems");
    cartDiv.innerHTML = "";

    total = 0; // reset total
    document.getElementById("cartCount").textContent =
        cart.reduce((sum, item) => sum + item.qty, 0);

    cart.forEach((c, index) => {
        total += c.price * c.qty;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
      <img src="${c.img}" class="cart-img">
      <div class="cart-info">
        <strong>${c.item}</strong>
        <p>₹${c.price}</p>

        <div class="qty-controls">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${c.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>
      </div>
    `;

        cartDiv.appendChild(div);
    });

    // ✅ update total price
    document.getElementById("total").textContent = `Total: ₹${total}`;
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("cartBackBtn").onclick = function () {
        document.getElementById("cartModal").style.display = "none";

        // Restore previous screen
        if (lastVisibleSection) {
            lastVisibleSection.style.display =
                lastVisibleSection.id === "productDetail" ? "flex" : "grid";
        }
    };
});

function changeQty(index, change) {
    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        const removedItem = cart[index].item;
        cart.splice(index, 1);
        resetButtons(removedItem);
    }

    updateCartUI();
}
function syncButtons(item) {
    document.querySelectorAll(`button[data-item='${item}']`).forEach(btn => {
        btn.textContent = "View Cart";
        btn.onclick = toggleCart;
        btn.classList.add("view-cart");
    });

    const detailBtn = document.getElementById("addCartDetail");
    if (detailBtn.dataset.item === item) {
        detailBtn.textContent = "View Cart";
        detailBtn.onclick = toggleCart;
        detailBtn.classList.add("view-cart");
    }
}

function resetButtons(item) {
    document.querySelectorAll(`button[data-item='${item}']`).forEach(btn => {
        btn.textContent = "Add to Cart";
        btn.onclick = () =>
            addToCart(item, productData[item].price);
        btn.classList.remove("view-cart");
    });
}


function toggleCart() {
    const modal = document.getElementById("cartModal");

    if (modal.style.display === "flex") {
        modal.style.display = "none";
        return;
    }

    // Save currently visible section
    lastVisibleSection = document.querySelector(
        ".dashboard[style*='grid'], #productDetail[style*='flex'], #homeMenu[style*='grid']"
    );

    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";

    updateCartUI();
}


function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert(`Thank you! Your order total is ₹${total}.`);

    cart.forEach(c => resetButtons(c.item));

    cart = [];
    total = 0;
    document.getElementById("cartCount").textContent = 0;
    updateCartUI();
    toggleCart();
}

const productData = {
    // Biryanis
    "Chicken Biryani": {
        price: 300,
        offer: 20,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI9Tw6cZWpDVACgNwAaqls8uxiPMPrUimMTA&s",
        rating: 4.5,
        reviews: ["Delicious and perfectly spiced!", "Best biryani I've ever had.", "Loved it, will order again."]
    },
    "Veg Biryani": {
        price: 250,
        offer: 10,
        img: "https://www.chefkunalkapur.com/wp-content/uploads/2023/11/DSC07512-1300x731.jpg?v=1699167800",
        rating: 4,
        reviews: ["Very tasty and fresh.", "Good flavor, but a bit oily."]
    },
    "Mutton Biryani": {
        price: 350,
        img: "https://png.pngtree.com/png-clipart/20240927/original/pngtree-a-plate-of-beef-or-mutton-biryani-png-image_16104837.png",
        rating: 4.8,
        reviews: ["Perfectly cooked mutton!", "Highly recommend for biryani lovers."]
    },

    // Cakes
    "Chocolate Cake": {
        price: 200,
        img: "https://theovenchef.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-11-01-at-5.39.28-PM-1-scaled-e1698841246352.jpeg",
        rating: 4.7,
        reviews: ["Rich and moist chocolate cake.", "Kids loved it!", "Perfect sweetness."]
    },
    "Vanilla Cake": {
        price: 180,
        offer: 30,
        img: "https://atsloanestable.com/wp-content/uploads/2022/01/small-vanilla-cake3.jpg",
        rating: 4.3,
        reviews: ["Soft and fluffy.", "Good for birthdays.", "Tasty but not too sweet."]
    },

    // Starters
    "Spring Rolls": {
        price: 120,
        offer: 10,
        img: "https://thaicaliente.com/wp-content/uploads/2020/09/Spring-Roll-Feature.jpg",
        rating: 4.2,
        reviews: ["Crispy and fresh!", "Perfect appetizer."]
    },
    "Tomato Soup": {
        price: 100,
        offer: 50,
        img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/11/tomato-soup-recipe.jpg",
        rating: 4,
        reviews: ["Warm and comforting.", "Great taste."]
    },

    // Chocolates
    "Dark Chocolate": {
        price: 150,
        offer: 30,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Schokolade-schwarz-braun-weiss.jpg/500px-Schokolade-schwarz-braun-weiss.jpg",
        rating: 4.6,
        reviews: ["Rich taste.", "Perfect bitter-sweet flavor."]
    },
    "Milk Chocolate": {
        price: 120,
        offer: 50,
        img: "https://www.cocoterra.com/wp-content/uploads/white-chocolate-with-milk-powder.jpg",
        rating: 4.4,
        reviews: ["Sweet and creamy.", "Melts in mouth."]
    },

    // Desserts
    "Ice Cream": {
        price: 80,
        img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Ice_cream_with_whipped_cream%2C_chocolate_syrup%2C_and_a_wafer_%28cropped%29.jpg",
        rating: 4.5,
        reviews: ["Cold and creamy.", "Loved it with chocolate syrup."]
    },
    "Chocolate Brownie": {
        price: 120,
        offer: 60,
        img: "https://www.recipessimple.com/wp-content/uploads/2023/08/Chocolate-Brownie-Ice-Cream-Recipe.jpg",
        rating: 4.7,
        reviews: ["Chewy and chocolaty.", "Perfect dessert!"]
    },

    // Drinks
    "Cold Coffee": {
        price: 100,
        offer: 10,
        img: "https://cookingfromheart.com/wp-content/uploads/2022/04/Cold-Coffee-4.jpg",
        rating: 4.4,
        reviews: ["Refreshing!", "Perfect caffeine boost."]
    },
    "Lemonade": {
        price: 70,
        img: "https://dinnerthendessert.com/wp-content/uploads/2025/06/Lemonade-Recipe-10.jpg",
        rating: 4.1,
        reviews: ["Tangy and sweet.", "Very refreshing."]
    },
    "Mango Juice": {
        price: 90,
        img: "https://t3.ftcdn.net/jpg/01/87/65/02/360_F_187650225_yiZwjK4HjPVxlD8npzCRUuaoodF39Kby.jpg",
        rating: 4.6,
        reviews: ["Sweet and tropical.", "Best mango juice ever."]
    }
};
function showProductDetail(name, sectionId) {
    currentProductName = name;
    currentSection = sectionId; // Store current section
    const product = productData[name];
    if (!product) return;

    document.getElementById("productDetail").style.display = "flex";
    document.getElementById("detailImg").src = product.img;
    document.getElementById("detailName").textContent = name;
    const finalPrice = getFinalPrice(product);

    if (product.offer) {
        document.getElementById("detailPrice").innerHTML = `
    <span class="old-price">₹${product.price}</span>
    <span class="new-price">₹${finalPrice}</span>
    <div class="offer-badge">${product.offer}% OFF</div>
  `;
    } else {
        document.getElementById("detailPrice").innerHTML =
            `<span class="new-price">₹${product.price}</span>`;
    }


    // Display rating stars
    const ratingDiv = document.getElementById("detailRating");
    ratingDiv.innerHTML = "";
    const fullStars = Math.floor(product.rating);
    const halfStar = product.rating % 1 >= 0.5;
    for (let i = 0; i < fullStars; i++) ratingDiv.innerHTML += "★";
    if (halfStar) ratingDiv.innerHTML += "☆";
    for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) ratingDiv.innerHTML += "☆";

    // Reviews
    renderReviews(name);
    // Show review box ONLY for Chicken Biryani
    document.getElementById("addReviewBox").style.display =
        name === "Chicken Biryani" ? "block" : "none";


    // Add to cart button
    const btn = document.getElementById("addCartDetail");
    btn.setAttribute("data-item", name);
    btn.textContent = "Add to Cart";
    btn.onclick = () => addToCart(name, getFinalPrice(product));




    // Back button
    document.getElementById("backBtn").onclick = () => {
        closeProductDetail();
        // Show the previous section grid
        document.querySelectorAll('.dashboard').forEach(sec => sec.style.display = 'none');
        document.getElementById(currentSection).style.display = 'grid';
    };

}

function renderReviews(productName) {
    const reviewDiv = document.getElementById("detailReviews");
    reviewDiv.innerHTML = "";

    productData[productName].reviews.forEach(r => {
        const p = document.createElement("p");
        p.textContent = r;
        reviewDiv.appendChild(p);
    });
}

function submitReview() {
    const reviewText = document.getElementById("userReview").value.trim();
    if (!reviewText) {
        alert("Please write a review!");
        return;
    }

    // Add review to Chicken Biryani
    productData[currentProductName].reviews.unshift(reviewText);

    // Clear input
    document.getElementById("userReview").value = "";

    // Re-render reviews instantly
    renderReviews(currentProductName);
}



function closeProductDetail() {
    document.getElementById("productDetail").style.display = "none";
}


function showSection(sectionId, element) {
    document.getElementById("home").style.display = "none";
    document.getElementById("homeMenu").style.display = "none";

    document.querySelectorAll('.dashboard').forEach(sec => {
        sec.style.display = 'none';
    });

    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));

    if (sectionId === 'home') {
        document.getElementById("homeMenu").style.display = 'grid';
    } else {
        document.getElementById(sectionId).style.display = 'grid';
    }

    if (element) element.classList.add('active');
}

function openFromFooter(sectionId) {
    // Show navbar
    document.getElementById("mainNav").style.display = "flex";

    // Find matching nav link
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.textContent.toLowerCase() === sectionId) {
            link.classList.add("active");
        }
    });

    // Show section
    showSection(sectionId);
}


function openMainPage() {
    document.getElementById("mainNav").style.display = "flex";
    showSection('home', document.querySelector('nav a:first-child'));
}

function goHome() {
    // Show hero home page
    document.getElementById("home").style.display = "flex";

    // Hide navbar
    document.getElementById("mainNav").style.display = "none";

    // Hide home menu categories
    document.getElementById("homeMenu").style.display = "none";

    // Hide all dashboards (biryanis, cakes, etc.)
    document.querySelectorAll('.dashboard').forEach(sec => {
        sec.style.display = "none";
    });

    // Remove active nav highlights
    document.querySelectorAll('nav a').forEach(a => {
        a.classList.remove('active');
    });
}
Object.keys(productData).forEach(name => {
    const product = productData[name];
    const priceEl = document.getElementById(`price-${name}`);

    if (!priceEl) return;

    const finalPrice = getFinalPrice(product);

    if (product.offer) {
        priceEl.innerHTML = `
      <span class="old-price">₹${product.price}</span>
      <span class="new-price">₹${finalPrice}</span>
      <div class="offer-badge">${product.offer}% OFF</div>
    `;
    } else {
        priceEl.innerHTML = `<span class="new-price">₹${product.price}</span>`;
    }
});
