import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { isMobileApp } from '@/core/platform';
import NotFoundPage from '@/modules/errors/pages/NotFoundPage';
import guestRoutes from './guest';
import mobileRoutes from './mobile';
import protectedRoutes from './protected';
import publicRoutes from './public';

export default function Router() {
    const entryRoutes = isMobileApp() ? mobileRoutes : publicRoutes;

    return (
        <BrowserRouter>
            <Routes>
                {entryRoutes}
                {guestRoutes}
                {protectedRoutes}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}
