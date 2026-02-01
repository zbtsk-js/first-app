export const cartList = [];
const ItemsList = document.querySelector('.products-list');
const Cart = document.querySelector('.cart-products');


export function renderCart() {
    if (!Cart) return;
    if (cartList.length === 0){
        Cart.classList.add('empty');
      Cart.innerHTML = ` <img src="" alt="" class="cart-logo">
    <h2 class="cart-products__title">Your Cart is Empty
    </h2>
    <p class="cart-products__description">Discover our collection of premium storage solutions <br> crafted with Scandinavian quality.

    </p>
    <a href="" class="button button--accent">Explore Collection</a>`

        return
    }
    Cart.classList.remove('empty')
    cartList.forEach((product) => {
       Cart.insertAdjacentHTML('beforeend', `<div class="product-card" >
        <img src="./public/images/product-card.jpg" alt="" width="160" height="120"  class="product-card__image" >
        <div class="product-card__main">
            <div class="product-card__body">
                <h3 class="product-card__title">
                    ${product.name}
                </h3>
                <p class="product-card__description">
                    Classic
                </p>
            </div>
            <div class="product-card__footer">
                <div class="product-card__counter">
                    <button class="quantity-btn" aria-label="Уменьшить">−</button>
                    <span class="quantity-value">${product.quantity}</span>
                    <button class="quantity-btn" aria-label="Увеличить">+</button>
                </div>
                <div class="product-card__price-wrapper price-wrapper">
                    <span class="price-wrapper__description">Item total</span>
                    <span class="price-wrapper__price h2">${product.price*product.quantity}</span>
                </div>
            </div>
        </div>
</div>
`)

    })
}
ItemsList?.addEventListener('click', (e) => addToCart(e))
export function addToCart(ClickedItem ){

    if(ClickedItem.target.classList.contains('product-card__button')){
        const product = ClickedItem.target.closest('.product-card');
        const item = searchItem(product)
        const productData = {
            id: product.dataset.id, name: product.dataset.name, price: product.dataset.price, quantity: 1
        }
        item ? item.quantity++ : cartList.push(productData);
        renderCart()
    }
}

function searchItem(e){
    return cartList.find(product => product.id === e.dataset.id);
}

