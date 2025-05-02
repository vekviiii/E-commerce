import React from "react";
import HomePage from "./pages/Home/homePage";
import SuccessPage from "./pages/successPage/successPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import LoginLayout from "./layouts/loginLayout";
import SignUpPage from "./pages/signupPage/SignUpPage";
import LoginPage from "./pages/loginPage/LoginPage";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <Router>
      <Routes>
        {/* MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/paymentSuccess" element={<SuccessPage />} />
          <Route path="/" element={<HomePage />} />
        </Route>
        {/* LoginLayout */}
        <Route element={<LoginLayout />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* Not Found */}
        <Route path="*" element={<div> not found </div>} />
      </Routes>
    </Router>
  );
}

export default App;
