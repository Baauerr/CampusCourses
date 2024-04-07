import { Navigate, useLocation } from 'react-router-dom';
import { getTokenFromLocalStorage } from '../helpers/tokenHelper';
import { MainComponent } from './MainComponent';
  
export const PrivateRoutes = () => {
    
    const location = useLocation();
    const token = getTokenFromLocalStorage()

    return token
        ? <MainComponent/>
        : <Navigate to="/login" replace state={{ from: location }} />;
}

