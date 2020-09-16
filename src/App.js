import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51HPwD1LVy8I7ci0neRjJe4BKXi4VFHsZ2xFyxK1QCo6lhxphrieGeyZXgd5pMJNXTZ0ZSYGn5hrZuNUr4jSDQby000Jp0EFEOf"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // Will only run once when the app component loads...
    // Kind of like a dynamic if statement
    // As soon as App loads, we attach this listener and then it's always listening... It's always there, observing....

    // Whenever the authentication changes, it'll give us the authenticated user (also does that when user is empty)
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // The user just logged in or the user was already logged in
        dispatch({
          // This will shoot the user into the dataLayer
          type: "SET_USER",
          // This is the user that got returned from firebase
          user: authUser,
        });
      } else {
        // The user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    //BEM Convention
    <Router>
      <div className="app">
        <Header />

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/payment">
            {/* Wrap the Payment element in a higher order function */}
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
