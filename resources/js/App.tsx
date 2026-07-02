import { BrowserRouter } from 'react-router-dom';
import AppProvider from '@/providers/AppProvider';
import Router from '@/router/index';

export default function App() {
    return (
        <BrowserRouter>
            <AppProvider>
                <Router />
            </AppProvider>
        </BrowserRouter>
    );
}
