import { useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { commerce } from "./lib/commerce";

import Footer from "./components/Footer/Footer";
import Storefront from "./components/Storefront/Storefront";
import Header from "./components/Header/Header";
import Checkout from "./components/Checkout/Checkout";
import Cart from "./components/Cart/Cart";
import Confirmation from "./components/Checkout/Confirmation";

import { useStripe } from "@stripe/react-stripe-js";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [openCart, setOpenCart] = useState(false);
  const [isProcessing, setProcessingTo] = useState(false);

  let history = useHistory();
  const stripe = useStripe();

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
      history.push("/confirmation");
      // Store the order in session storage so we can show it again if the user refreshes the page!
      window.sessionStorage.setItem("order_receipt", JSON.stringify(order));
    } catch (response) {
      if (
        response.statusCode !== 402 ||
        response.data.error.type !== "requires_verification"
      ) {
        console.log(response.data.error.message);
        setProcessingTo(false);
      }
      const cardActionResult = await stripe.handleCardAction(
        response.data.error.param
      );
      if (cardActionResult.error) {
        // The customer failed to authenticate themselves with their bank and the transaction has been declined
        console.log(cardActionResult.error.message);
        setProcessingTo(false);
        return;
      }
      try {
        const order = await commerce.checkout.capture(checkoutTokenId, {
          ...newOrder,
          payment: {
            gateway: "stripe",
            stripe: {
              payment_intent_id: cardActionResult.paymentIntent.id,
            },
          },
        });
        setOrder(order);
        refreshCartHandler();
        history.push("/confirmation");
        // Store the order in session storage so we can show it again if the user refreshes the page!
        window.sessionStorage.setItem("order_receipt", JSON.stringify(order));
        return;
      } catch (response) {
        // We get here if the order failed to capture with Commrece.js
        console.log(response.data.error.message);
        setProcessingTo(false);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
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
            error={errorMessage}
            onCaptureCheckout={captureCheckoutHandler}
            isProcessing={isProcessing}
            setProcessingTo={setProcessingTo}
          />
        </Route>
        <Route exact path="/confirmation">
          {order ? <Confirmation order={order} /> : <Redirect to="/" />}
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}
