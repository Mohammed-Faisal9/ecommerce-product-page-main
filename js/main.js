const data = [
  {
    id: 1,
    img: "images/image-product-1.jpg",
    thumbnailImg: "images/image-product-1-thumbnail.jpg",
  },
  {
    id: 2,
    img: "images/image-product-2.jpg",
    thumbnailImg: "images/image-product-2-thumbnail.jpg",
  },
  {
    id: 3,
    img: "images/image-product-3.jpg",
    thumbnailImg: "images/image-product-3-thumbnail.jpg",
  },
  {
    id: 4,
    img: "images/image-product-4.jpg",
    thumbnailImg: "images/image-product-4-thumbnail.jpg",
  },
];

// mobile menu
let mobileMenuOperation = () => {
  const toggleBtn = document.getElementById("toggle-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeBtnMenu = document.getElementById("close-btn");

  const MenuContral = () => {
    mobileMenu.classList.toggle("-translate-x-full");
  };

  toggleBtn.addEventListener("click", MenuContral);

  closeBtnMenu.addEventListener("click", MenuContral);
};
mobileMenuOperation();
// product
const mainImg = document.querySelector(".main-img");
const thumbnails = document.querySelectorAll("#thumbnail-area div");
const productArea = document.querySelector("#product-area");
const mainProductImg = document.getElementById("main-product-img");
const thumbnailProductArea = document.querySelectorAll(
  "#thumbnail-product-area div"
);
const closePage = document.getElementById("close-Product-btn");
const nextProduct = document.querySelectorAll("#next-btn");
const previousProduct = document.querySelectorAll("#previous-btn");

let currentItem = 0;

let showProduct = (current) => {
  let item = data[current];
  mainImg.src = item.img;
  mainProductImg.src = item.img;
  thumbnails[current].classList.add("before:border-2");
  thumbnails[current].classList.add("before:opacity-50");
  thumbnailProductArea[current].classList.add("before:border-2");
  thumbnailProductArea[current].classList.add("before:opacity-50");
};
showProduct(currentItem);

let thumbnailActions = (thumbnail) => {
  thumbnail.addEventListener("click", (e) => {
    for (let i = 0; i < data.length; i++) {
      thumbnailProductArea[i].classList.remove("before:border-2");
      thumbnailProductArea[i].classList.remove("before:opacity-50");
      thumbnails[i].classList.remove("before:border-2");
      thumbnails[i].classList.remove("before:opacity-50");
    }
    e.currentTarget.classList.add("before:border-2");
    e.currentTarget.classList.add("before:opacity-50");
    currentItem = +e.currentTarget.dataset.id - 1;
    showProduct(currentItem);
  });
};

thumbnails.forEach(thumbnailActions);
thumbnailProductArea.forEach(thumbnailActions);

mainImg.addEventListener("click", () => {
  productArea.classList.remove("invisible");
});

closePage.addEventListener("click", () => {
  productArea.classList.add("invisible");
});

let nextSlide = () => {
  for (let i = 0; i < data.length; i++) {
    thumbnailProductArea[i].classList.remove("before:border-2");
    thumbnailProductArea[i].classList.remove("before:opacity-50");
    thumbnails[i].classList.remove("before:border-2");
    thumbnails[i].classList.remove("before:opacity-50");
  }
  currentItem += 1;
  console.log("done");
  currentItem >= data.length ? (currentItem = 0) : currentItem;
  showProduct(currentItem);
};

nextProduct.forEach((slide) => {
  slide.addEventListener("click", nextSlide);
});

let previousSlide = () => {
  for (let i = 0; i < data.length; i++) {
    thumbnailProductArea[i].classList.remove("before:border-2");
    thumbnailProductArea[i].classList.remove("before:opacity-50");
    thumbnails[i].classList.remove("before:border-2");
    thumbnails[i].classList.remove("before:opacity-50");
  }
  currentItem -= 1;
  console.log("done");
  currentItem < 0 ? (currentItem = data.length - 1) : currentItem;
  showProduct(currentItem);
};

previousProduct.forEach((slide) => {
  slide.addEventListener("click", previousSlide);
});

// this is a cart actions
const addProduct = document.getElementById("add-product");
const removeProduct = document.getElementById("remove-product");
const productNumber = document.getElementById("product-number");
const addToCart = document.getElementById("add-to-cart");
const itemNumber = document.getElementById("cart-number");
const cartContent = document.getElementById("cart-content");
const cart = document.getElementById("cart");
const cartTextBox = cartContent.querySelector("div");
const totalPrice = document.getElementById("total");

// when incremnt items
addProduct.addEventListener("click", () => {
  productNumber.textContent = +productNumber.textContent + 1;
});

// when decremnt items
removeProduct.addEventListener("click", () => {
  if (productNumber.textContent == 0) {
    return;
  }
  productNumber.textContent = +productNumber.textContent - 1;
});

// when add items to cart
addToCart.addEventListener("click", () => {
  if (productNumber.textContent == 0) {
    cartTextBox.innerHTML = `<p class="text-slate-400">Your cart is empty</p>`;
    return (itemNumber.textContent = "");
  }
  itemNumber.textContent = productNumber.textContent;

  // add product to cart box

  let cartText = `<div class="flex items-center justify-between gap-2">
  <img class="w-16" src="images/image-product-1-thumbnail.jpg" alt="">
  <div class="text-sm text-slate-500">
    <p>Fall Limited Edition Sneakers</p>
    <p id="total">$125.00 * ${productNumber.textContent} =
      <span class="text-black font-bold">$${
        125.00 * +productNumber.textContent
      }</span>
    </p>
  </div>
  <img id="clear" class="cursor-pointer" src="images/icon-delete.svg" alt="">
</div>
<button class="w-full mt-4 py-4 rounded-xl bg-orange-500 text-white duration-300 hover:bg-orange-300">Checkout</button>`;

  cartTextBox.innerHTML = cartText;

  // clear cart
  const clear = cartTextBox.querySelector("#clear");
  clear.addEventListener("click", () => {
    cartTextBox.innerHTML = `<p class="text-slate-400 text-center">Your cart is empty</p>`;
    itemNumber.textContent = '';
  });
});

// when click on cart icon
cart.addEventListener("click", () => {
  cartContent.classList.toggle("hidden");
});
