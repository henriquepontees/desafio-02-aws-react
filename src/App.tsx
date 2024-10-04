// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login';
import { Characters } from "./pages/Characters";
import { Cart } from "./pages/Cart";
import { CharactersDetails } from "./pages/CharactersDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Characters" element={<Characters />} />
        <Route path="/Characters/:id" element={<CharactersDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
