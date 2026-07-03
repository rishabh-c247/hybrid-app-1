import { Route } from 'react-router-dom';
import HomePage from '@/modules/home/pages/HomePage';

const publicRoutes = (
    <>
        <Route path="/" element={<HomePage />} />
    </>
);

export default publicRoutes;
