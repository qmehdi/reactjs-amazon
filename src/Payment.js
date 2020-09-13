import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  // Hooks
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  // These two const are for CardElement onChange
  // Need two pieces of states; one for error and one for disabled
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  // This useEffect code snippet is extremely important. This is communicating with Stripe.
  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  const handleSubmit = async (event) => {
    // Prevent refreshing
    event.preventDefault();

    // To allow Clicking of the Buy Now button only once
    setProcessing(true);

    // This is talking to Stripe to find out how much to charge the customer
    // stripe.confirmCardPayment(clientSecret, {payment_method: {card}})
    // This is a promise, so when the response comes back, we deconstruct it and retrieve paymentIntent
    // paymentIntent is the Payment Confirmation
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          // This cardElement that's getting passed in is the actual React component.
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent is payment confirmation

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        // Dont do history.push because we dont want the user to come back to the payment page
        // Instead swap the page by doing history.replace
        history.replace("/orders");
      });
  };

  const handleChange = (event) => {
    // Whenever we write inside the CardElement
    // Listen for changes in the CardElement
    // And display any errors as the customer types their card details

    // If the field is empty, show nothing
    setDisabled(event.empty);
    // If there is an error, show the error, otherwise show nothing
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Payment section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment section - Payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic will go here */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                {/* Renders out this text in a specific format */}
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />

                {/* button will be disabled based on some states in curly braces */}
                <button disabled={processing || disabled || succeeded}>
                  {/* Once Buy Now button is clicked, it'll switch to saying Processing and button will be disabled */}
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* If there are any errors with the card number as it's being typed in, it'll show on screen */}
              {/* Kind of a failsafe */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
