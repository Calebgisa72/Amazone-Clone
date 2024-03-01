let productDetails = '';
const cart = [];
isUserLogged = false;

function updateProductDetails() {
products.forEach((product) => {
    productDetails += `
    <div class="product-container">
          <div class="product-image-container js-image-${product.id}">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines js-name-${product.id}">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price js-cartPrice-${product.id}">
            $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
});

document.querySelector('.js-products').innerHTML = `<div class="products-grid js-product-grid">
        ${productDetails}
        </div>`;
}
updateProductDetails();

let isCartOpen = false;

function updateCartDisplay() {
    let itemList = `<p class="sele">Selected Products<div class="clear"
    ><button class="Clear-Cart" onclick="clearCart()">Clear Cart</button></div></p>`;
    let totalCost = 0;

    cart.forEach((item) => {
        const cartPrice = parseFloat(item.cartPrice).toFixed(2);
        const quantity = parseInt(item.quantity, 10);
        let totalPrice = quantity * cartPrice;

        itemList += `
            <div class="productInCart">
                <div class="product-cart-image imagee">
                    ${item.cartImage}
                </div>
                <p>${item.cartName}</p>
                <p>Quantity: ${quantity} * Cost = $${cartPrice}</p>
                <p>Price: $${totalPrice.toFixed(2)}</p>
            </div>
        `;

        totalCost += totalPrice;
    });

    document.querySelector('.js-receipt').innerHTML = `
        <div class="receipt">
            ${itemList}
        </div>
    `;

    document.querySelector('.cost').innerHTML = totalCost.toFixed(2);
}

function bringCart() {
    let cartReceipt = document.querySelector('.cart-receipt');

    if (isCartOpen === false) {
        cartReceipt.innerHTML = `
            <div class="reci">
            <div class="receipte js-receipt"></div>
            <div class="above">
                <p class="total">Total Cost = $<div class="cost"></div></p>
            </div>
            <div class="pay-div">
            <button class="pay-button js-pay-button">Buy / Pay</button>
            </div>
            </div>
         `;
        isCartOpen = true;
        updateCartDisplay();
        document.querySelector('.js-pay-button').addEventListener('click', () => {
            declineBuy ();
        })
    } else {
        cartReceipt.innerHTML = '';
        isCartOpen = false;
        addToCartt();
    }
}
 function declineBuy (){
    if(isUserLogged === false){
    alert('Fisrt Loggin Before Trying To Purchase');
    return;
    } 
    else {
        document.querySelector('.js-pay').innerHTML=`
            <div class="paym">
             <div>
            <p class="pay-text">Payment </p>
        </div>
    
        <div class="product-quantity-container">
            <select class="selector jsSelector" id="paymentModeSelector">
              <option selected value=" ">SELECT PAYMENT MODE</option>
              <option value="momo" style="color: rgb(117, 117, 16); font-size: 16px;">MTN Mobile Money</option>
              <option value="airtel" style="color: rgb(222, 17, 17); font-size: 16px;">Airtel Money</option>
            </select>
          </div>
          
          <div class="payments" id="paymentDetailsContainer"></div>
          </div>
          <div class="upload">
          <label for="imageUpload">Select ScreenShot:</label>
          <input type="file" id="imageUpload" name="image" accept="image/*">
          </div>
    `
   
        
    function paymentDeatis() {
        document.getElementById('paymentModeSelector').addEventListener('change', function() {
        let paymentMethod = this.value;
        let paymentDetailsContainer = document.getElementById('paymentDetailsContainer');
    
        paymentDetailsContainer.innerHTML = '';
    
        if (paymentMethod === 'momo') {
          paymentDetailsContainer.innerHTML = `
            <div class="payment-details">
              <p>Using MTN Mobile Money You will pay on the Code: 669856</p>
              <p>And Send Us the ScreenShot. For Further Assistance call 078124312</p>
            </div>`;
        } else if (paymentMethod === 'airtel') {
          paymentDetailsContainer.innerHTML = `
            <div class="payment-details">
              <p>Using AIRTEL Mobile Money You will pay on the Code: 777733</p>
              <p>And Send Us the ScreenShot. For Further Assistance call 073124312</p>
            </div>`;
        }
      });
      }
      paymentDeatis()


            let cartDiv = document.querySelector('.receipte');
            cartDiv.style.width = '450px';
            let above = document.querySelector('.above');
            above.style.cssText = 'left: 900px; right: 10px;';
            let payDiv = document.querySelector('.pay-div');
            payDiv.style.cssText = 'left: 900px; right: 10px;';

            document.querySelector('.cart-js').addEventListener('click',() =>{
                document.querySelector('.js-products').innerHTML = `<div class="products-grid js-product-grid">
        ${productDetails}
        </div>`;
        addToCartt();
            } )
    }
}
function login(){
    console.log('loggin');
    isUserLogged = true;
    document.querySelector('.js-login').innerHTML = 'Logout';
}


function addToCartt(){
    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const selected = document.querySelector(`.js-quantity-selector-${productId}`).value;
            const cartQuantity = Number(selected);
            const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`);
            addedToCart.classList.add('added-to-cart-visible');
            const productName = document.querySelector(`.js-name-${productId}`).innerHTML;
            const productImage = document.querySelector(`.js-image-${productId}`).innerHTML;
            const productPriceString = document.querySelector(`.js-cartPrice-${productId}`).innerHTML;
    
            const productPrice = parseFloat(productPriceString.replace('$', ''));
    
            setTimeout(() => {
                addedToCart.classList.remove('added-to-cart-visible');
            }, 2000);
    
            let matchingItems = cart.find((item) => item.productId === productId);
    
            if (matchingItems) {
                matchingItems.quantity += cartQuantity;
            } else {
                cart.push({
                    productId: productId,
                    quantity: cartQuantity,
                    cartImage: productImage,
                    cartName: productName,
                    cartPrice: productPrice
                });
            }
    
            let itemsInCart = 0;
            cart.forEach((item) => {
                itemsInCart += item.quantity;
            });
            
            document.querySelector('.js-cart-quantity').innerHTML = itemsInCart;
    
            updateCartDisplay();
        });
    });
}
 addToCartt();

 function clearCart(){
    console.log(cart);
    cart.length = 0;
    console.log(cart);
    updateCartDisplay();
    document.querySelector('.js-cart-quantity').innerHTML = 0;
 }

let isLoginOpen = false;
let loginButton = document.querySelector('.js-loginButton');
let loginInput = document.querySelector('.js-login-input');
var bodyElement = document.querySelector('.bod');

 
    loginButton.addEventListener('click', () => {
        
        if(document.querySelector('.js-login').innerHTML === 'Login/Sign Up'){
            if (isLoginOpen === false) {
                bodyElement.style.filter = 'blur(90px)';
                loginInput.classList.add('login-input');
                loginInput.innerHTML = `
                <div class="login details">
                <button class="cancel-button" onclick="cancelForm()">X</button>

                <form action="login.jsp" method="post">

                 <h3 style="text-decoration: underline; font-weight: 700; text-align: center;">LOGIN/SIGN-UP FORM</h3>
                <div class="input-gird">
                    <div class="labels">
                <label for="Email">Email/Username: </label>
                    </div>
                <input class="input" name="email" type="text" placeholder="Enter your email or usename">
                    <div class="labels">
                <label for="Email">Password: </label>
                    </div>
                <input class="input" name="password"  type="password" placeholder="Enter your Password">
                </div>
                <button class="login-but" onclick="login()">Login</button>
                <a class="forgot" href="#">Forgot Password</a>

               </form>

                <p style="margin-left: 50px; margin-top: 40px;">Don't have an account? Click 
                    <button class="Sign-button" onclick="openSignupForm()">Sign Up</button></p>
            </div>
            `;
                isLoginOpen = true;
            } else {
                bodyElement.style.filter = 'none';
                loginInput.classList.remove('login-input');
                loginInput.innerHTML = '';
                isLoginOpen = false;
            }
        }
        else{
            isUserLogged = false;
            document.querySelector('.js-login').innerHTML = 'Login/Sign Up';
        }
       
    });
    
    function openSignupForm() {
        loginInput.innerHTML = '';
        bodyElement.style.filter = 'blur(90px)';
        loginInput.classList.add('login-input');
        loginInput.innerHTML = `
      <div class="signup details">
          <button class="cancel-button" onclick="cancelForm()">X</button>
          <h3 style="text-decoration: underline; font-weight: 700; text-align: center;  margin-top: -13px;
          margin-bottom: -25px;
          ">SIGN-UP FORM</h3>
          <div class="input-gird">
          <div class="labels">
          <label for="FirstName">First Name: </label>
            </div>
            <input class="input" type="text" name="firstName" placeholder="Enter your first name" required>
            <div class="labels">
                <label for="LastName">Last Name: </label>
            </div>
            <input class="input" type="text" name="lastName" placeholder="Enter your last name">
            <div class="labels">
                <label for="Email">Email: </label>
            </div>
            <input class="input" type="text" name="email" placeholder="Enter your email" required>
            <div class="labels">
                <label for="PhoneNumber">Phone Number: </label>
            </div>
            <input class="input" type="text" name="phoneNumber"placeholder="Enter your phone number" required>
            <div class="labels">
                <label for="Password">Password: </label>
            </div>
            <input class="input" type="password" name="password" placeholder="Enter your password" required>
            </div>
          <button onclick="login()" class="Sign-button" style="margin-left: 230px;">Sign Up</button>
      </div>
        `;
        isLoginOpen = true;
    }

    function cancelForm() {
        bodyElement.style.filter = 'none';
        loginInput.classList.remove('login-input');
        loginInput.innerHTML = '';
        isLoginOpen = false;
    }