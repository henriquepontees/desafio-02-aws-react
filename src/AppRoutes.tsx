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
import SucessFull from './pages/SucessFull';
import { ComicListDetails } from './pages/ComicListDetails';


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
                    <Route path={EnumRoutes.ComicsList} element={<ComicsList/>} />
                    <Route path={EnumRoutes.ComicsListDetails} element={<ComicListDetails />} />
                    <Route path={EnumRoutes.REGISTER} element={<Register />} />
                    <Route path={EnumRoutes.BUY} element={<Buy />} />
                    <Route path={EnumRoutes.SUCESSFULL} element={<SucessFull />} />
                </Routes>
        </BrowserRouter>
    );    
}
export default AppRoutes;