import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login';
import { Characters } from "./pages/Characters";

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Characters" element={<Characters />} />
      </Routes>
  </BrowserRouter>;
}

export default App;