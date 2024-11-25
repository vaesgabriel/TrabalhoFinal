import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import Login from "./pages/Login";
import AddDelivery from "./pages/AddDelivery";
import DeliveryList from "./pages/DeliveryList";

function App() {
  const [notification, setNotification] = useState({ message: "", type: "" });

  const triggerNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 2500);
  };

  const LocationWrapper = ({ children }) => {
    const location = useLocation();
    const hideMenuItems = location.pathname === "/login";

    return (
      <>
        {}
        <Navbar
          hideMenuItems={hideMenuItems}
          setNotification={triggerNotification}
        />
        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}
        {children}
        {}
        <Footer />
      </>
    );
  };

  return (
    <Router>
      <LocationWrapper>
        <Routes>
          {}
          <Route path="/" element={<Navigate to="/login" />} />

          {}
          <Route
            path="/login"
            element={<Login setNotification={triggerNotification} />}
          />
          <Route
            path="/add-delivery"
            element={<AddDelivery setNotification={triggerNotification} />}
          />
          <Route
            path="/deliveries"
            element={<DeliveryList setNotification={triggerNotification} />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </LocationWrapper>
    </Router>
  );
}

export default App;
