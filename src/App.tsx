import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login';
import { Cart } from "./pages/Cart";
import { EmptyCart } from "./pages/EmptyCart";

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/emptycart" element={<EmptyCart />} />
      </Routes>
  </BrowserRouter>;
}

export default App;