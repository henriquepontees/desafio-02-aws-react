// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login';
import { Characters } from "./pages/Characters";
import { Cart } from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Characters" element={<Characters />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
