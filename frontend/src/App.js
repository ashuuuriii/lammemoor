import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import PasswordResetScreen from "./screens/PasswordResetScreen";
import PasswordResetTokenScreen from "./screens/PasswordResetTokenScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import CartScreen from "./screens/CartScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-5">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login/" element={<LoginScreen />} />
            <Route path="/register/" element={<RegistrationScreen />} />
            <Route
              path="/accounts/password_reset/"
              element={<PasswordResetScreen />}
            />
            <Route
              path="/accounts/password_reset/reset"
              element={<PasswordResetTokenScreen />}
            />
            <Route path="/shop/" element={<ProductListScreen />} />
            <Route path="/product/:id" element={<ProductDetailScreen />} />
            <Route path="/cart/" element={<CartScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
