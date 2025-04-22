import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import LandingPage from "./pages/landingPage/landingPage";
import SuccessPage from "./pages/successPage/successPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/paymentSuccess" element={<SuccessPage />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
