import { Route } from 'react-router-dom';
import MobileEntryPage from '@/modules/mobile/pages/MobileEntryPage';

const mobileRoutes = (
    <>
        <Route path="/" element={<MobileEntryPage />} />
    </>
);

export default mobileRoutes;
