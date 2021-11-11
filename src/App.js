import { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Storefront from "./components/Storefront/Storefront";
import Header from "./components/Header/Header";
import Checkout from "./components/Checkout/Checkout";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

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

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div className="bg-pink-bg">
        <Header
          totalItems={cart.total_items}
          cart={cart}
          onUpdateQuantity={updateQuantityHandler}
          onRemoveFromCart={removeFromCartHandler}
        />
        <Switch>
          <Route exact path="/">
            <Storefront products={products} onAddToCart={addToCartHandler} />
          </Route>
          {/* <Route exact path="/cart">
            <Cart
              cart={cart}
              onUpdateQuantity={updateQuantityHandler}
              onRemoveFromCart={removeFromCartHandler}
            />
          </Route> */}
          <Route exact path="/checkout">
            <Checkout cart={cart} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
