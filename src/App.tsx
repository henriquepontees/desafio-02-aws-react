import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login';
import ComicsList from "./Components/ComicList";

function App() {

  return <BrowserRouter>
  <ComicsList />
    <Routes>
      <Route path="/" element={<Login />} />
      </Routes>
  </BrowserRouter>;
}

export default App;