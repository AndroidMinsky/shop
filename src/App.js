import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { commerce } from "./lib/commerce";

import Footer from "./components/Footer/Footer";
import Storefront from "./components/Storefront/Storefront";
import Header from "./components/Header/Header";
import Checkout from "./components/Checkout/Checkout";
import Cart from "./components/Cart/Cart";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [openCart, setOpenCart] = useState(false);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const addToCartHandler = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const removeFromCartHandler = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const updateQuantityHandler = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const refreshCartHandler = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const captureCheckoutHandler = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCartHandler();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <div className="bg-pink-bg flex flex-col min-h-screen">
          <Header totalItems={cart.total_items} openCart={setOpenCart} />
          <Cart
            open={openCart}
            setOpen={setOpenCart}
            cart={cart}
            onUpdateQuantity={updateQuantityHandler}
            onRemoveFromCart={removeFromCartHandler}
          />
          <Switch>
            <Route exact path="/">
              <Storefront products={products} onAddToCart={addToCartHandler} />
            </Route>
            <Route exact path="/checkout">
              <Checkout
                cart={cart}
                order={order}
                error={errorMessage}
                onCaptureCheckout={captureCheckoutHandler}
              />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </Elements>
  );
}
