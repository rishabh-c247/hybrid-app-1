import { Route, Routes } from 'react-router-dom';
import guestRoutes from './guest';
import protectedRoutes from './protected';
import publicRoutes from './public';

export default function Router() {
    return (
        <Routes>
            {publicRoutes}
            {guestRoutes}
            {protectedRoutes}
        </Routes>
    );
}
