import { Trash2 } from 'lucide-react';
import {useCart} from "/front-part/src/js/hooks/useCart";

export default function SideBarItem({price, title, imageSrc, id, }) {
    const {increment, decrement, cart, removeFromCart}= useCart()
    const Product = cart.find(product => product.id == id) //тут для того  нам получать обновляемое кол товара то значение которые было передано пропсами,и которое является айдишником товара,мы сравниваем с айди во всем карте просто чтоб мы могли получать обновленное значение
    if (!Product) return 'Your cart is empty';
    const ProductQuantity = Product.quantity
    return (<>

        <div className="sidebar-item">
            <div className="sidebar-item__image-wrapper">
                <img
                    src={imageSrc}
                    alt={title}
                    className="sidebar-item__image"
                />
            </div>

            <div className="sidebar-item__content">
                <div className="sidebar-item__header">
                    <h3 className="sidebar-item__title">{title}</h3>
                    <button className="sidebar-item__delete" onClick={() => removeFromCart(id)}>
                        <Trash2 />
                    </button>
                </div>

                <div className="sidebar-item__footer">
                    <span className="sidebar-item__price">{price} NOK</span>

                    <div className="counter">
                        <button
                            className="counter__btn"
                            onClick= {() => decrement(id)}
                            disabled={ProductQuantity === 1}

                        >
                            −
                        </button>
                        <span className="counter__value">{ProductQuantity}</span>
                        <button
                            className="counter__btn"
                            onClick={() => increment(id)}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};