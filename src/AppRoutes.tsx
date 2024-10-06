import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EnumRoutes } from './Utils/Enums'
import { Login } from './pages/Login';
import { Cart } from './pages/Cart';
import { Characters } from './pages/Characters';
import { HeaderEnableValidator } from './Utils/Functions';
import Header from './Components/Header/Header';
import { Register } from './pages/Register';
import  Buy  from './pages/Buy';
import { CharactersDetails } from './pages/CharactersDetails';
import ComicsList from './pages/ComicList';


export const AppRoutes = () => {
    return (
        <BrowserRouter>
             <Header enabled={HeaderEnableValidator(window.location.pathname)} />
                <Routes>
                    <Route  path={EnumRoutes.HOME} element={<Login />} />
                    <Route path={EnumRoutes.LOGIN} element={<Login />} />
                    <Route path={EnumRoutes.CART} element={<Cart />} />
                    <Route path={EnumRoutes.CHARACTERS} element={<Characters />} />
                    <Route path={EnumRoutes.CHARACTERSDETAILS} element={<CharactersDetails />} />
                    <Route path={EnumRoutes.COMICS} element={<ComicsList/>} />
                    <Route path={EnumRoutes.REGISTER} element={<Register />} />
                    <Route path={EnumRoutes.BUY} element={<Buy />} />

                </Routes>
        </BrowserRouter>
    );    
}
export default AppRoutes;