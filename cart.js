
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];

// Function to update the cart icon with the total number of items
let cartCalculation = () => {
  let cartIcon = document.getElementById("cart");
  cartIcon.innerHTML = basket.map((x) => x.items).reduce((x, y) => x + y, 0);
};
cartCalculation();

// Function to generate HTML for cart items based on the basket data
let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket.map((x) => {
      let { id, items } = x;
      let search = shopItemsData.find((y) => y.id === id) || {};
      let { img, name, price } = search;
      return `

        <img width="70" src="${img}" alt="Product Photo">
        <p class="name">${name}</p>
        <p class="price">${price}</p>
      </div>
      <div class="cart-item-controls">
        <i onclick="decrement(${id})" class="minus-button cursor-pointer">-</i>
        <div id=${id} class="item-count">${items}</div>
        <i onclick="increment(${id})" class="plus-button cursor-pointer">+</i>
      </div>
    
      <i onclick="removeItem(${id})" class="remove-button cursor-pointer">X</i>
    </div>
    `;
    }).join(""));
  } else if (basket.length == 0) {
    shoppingCart.innerHTML = ``;

    // Display message when the cart is empty
    label.innerHTML = `
        <h2 class="text-xl pb-3">Cart is empty</h2>
        <a href="arts.html"><button class="bg-black text-white rounded-xl p-2">Buy Items</button></a>`;
  }
};

generateCartItems();

// Function to increment the quantity of an item in the cart
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      items: 1,
    })
  }
  else {
    search.items++;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
}

// Function to decrement the quantity of an item in the cart
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id)

  if (search === undefined) return;
  else if (search.items === 0) return;
  else {
    search.items--;
  }
 
  update(selectedItem.id);
  basket = basket.filter((x) => x.items !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

// Function to update the displayed quantity of an item
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.items;
  cartCalculation();
  TotalAmount();
};

// Function to remove an item from the cart
let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
}

// Function to clear the local storage and reset the cart
let clearLocalstorage =() =>{
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
}

// Function to calculate and display the total amount and checkout buttons
let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket.map((x) => {
      let {items, id} = x;
      let search = shopItemsData.find((y) => y.id === id) || [];
      return items * search.price;
    }).reduce((x, y) => x + y, 0);
    label.innerHTML = 
    ` <h2 class="text-2xl pb-5">Total bill:<p class=" text-green-500 text-2xl">NOK: ${amount}</p></h2>
      <button class=" bg-green-500 px-5 p-2 rounded-lg ">Checkout</button>
      <button onclick="clearLocalstorage()" class=" bg-red-500 px-5 p-2 rounded-lg">Clear Cart</button>
      `;
  } else return;
};

TotalAmount();
