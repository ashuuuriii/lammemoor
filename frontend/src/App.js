import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import PasswordResetScreen from "./screens/PasswordResetScreen";
import PasswordResetTokenScreen from "./screens/PasswordResetTokenScreen";
import ManageAccountScreen from "./screens/ManageAccountScreen";
import EditAddressScreen from "./screens/EditAddressScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import CartScreen from "./screens/CartScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderConfirmScreen from "./screens/OrderConfirmScreen";
import OrderListScreen from "./screens/OrderListScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PaymentConfirmScreen from "./screens/PaymentConfirmScreen";
import ContactScreen from "./screens/ContactScreen";
import NotFoundScreen from "./screens/NotFoundScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-5">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/about" element={<AboutScreen />} exact />
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
            <Route path="accounts/manage/" element={<ManageAccountScreen />} />
            <Route path="accounts/orders/:id" element={<OrderDetailScreen />} />
            <Route path="accounts/orders/" element={<OrderListScreen />} />
            <Route path="edit_address/:id" element={<EditAddressScreen />} />
            <Route path="/shop/" element={<ProductListScreen />} />
            <Route path="/product/:id" element={<ProductDetailScreen />} />
            <Route path="/cart/" element={<CartScreen />} />
            <Route path="/order/confirm" element={<OrderConfirmScreen />} />
            <Route
              path="/order/payment/payment_confirm/:id"
              element={<PaymentConfirmScreen />}
            />
            <Route path="/order/payment" element={<PaymentScreen />} />
            <Route path="/order/" element={<OrderScreen />} />
            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/*" element={<NotFoundScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
