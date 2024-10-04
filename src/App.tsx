import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login';
import Buy from "./pages/buy/Buy";

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/buy" element={<Buy />} />
      
    </Routes>  
  </BrowserRouter>;
}

export default App;