import { useEffect, useState } from "react";
import { commerce } from "../../lib/commerce";
import Confirmation from "./Confirmation";
import Form from "./Form";
import Summary from "./Summary";

export default function Checkout({ cart, order, error, onCaptureCheckout }) {
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {}
    };
    generateToken();
  }, [cart]);

  const summaryDataHandler = (data) => {
    setSummaryData(data);
  };

  const successfulCheckoutHandler = () => {
    setShowConfirmation(true);
  };

  const loading = (
    <div>
      <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
      Loading...
    </div>
  );

  return (
    <main className="-mt-32 pb-8">
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
                  {checkoutToken && !showConfirmation ? (
                    <Form
                      checkoutToken={checkoutToken}
                      onCaptureCheckout={onCaptureCheckout}
                      onSuccessfulCheckout={successfulCheckoutHandler}
                      onSummaryDataChange={summaryDataHandler}
                    />
                  ) : (
                    loading
                  )}
                  {showConfirmation && <Confirmation />}
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
                  {summaryData && <Summary summaryData={summaryData} />}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
