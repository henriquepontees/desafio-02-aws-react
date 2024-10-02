import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login';
import { Cart } from "./pages/Cart";

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      </Routes>
  </BrowserRouter>;
}

export default App;