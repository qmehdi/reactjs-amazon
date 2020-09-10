import React from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";

function App() {
  return (
    //BEM Convention
    <div className="app">
      {/* Header */}
      <Header />

      {/* Home */}
      <Home />
    </div>
  );
}

export default App;
