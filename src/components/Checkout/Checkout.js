import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { commerce } from "../../lib/commerce";

import Form from "./Form";
import Summary from "./Summary";

export default function Checkout({ cart, onCaptureCheckout }) {
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [liveObject, setLiveObject] = useState(null);

  let history = useHistory();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {
        history.push("/");
        console.log(error);
      }
    };

    const timer = setTimeout(() => generateToken(), 1000);

    return () => clearTimeout(timer);
  }, [cart]);

  const loading = (
    <div className="flex justify-center">
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-10 h-10 border-4 border-light border-solid rounded-full animate-spin"
      ></div>
    </div>
  );

  return (
    <main className="-mt-32 pb-8 flex-grow">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Page title</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <h2 className="sr-only" id="section-1-title">
                Section title
              </h2>
              <div className="rounded-lg bg-white overflow-hidden shadow">
                <div className="p-6">
                  {checkoutToken ? (
                    <Form
                      checkoutToken={checkoutToken}
                      onCaptureCheckout={onCaptureCheckout}
                      setLiveObject={setLiveObject}
                    />
                  ) : (
                    loading
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4 sticky top-0">
            <section aria-labelledby="section-2-title">
              <h2 className="sr-only" id="section-2-title">
                Section title
              </h2>
              <div className="rounded-lg bg-white overflow-hidden shadow">
                <div className="p-6">
                  {liveObject ? <Summary liveObject={liveObject} /> : loading}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
