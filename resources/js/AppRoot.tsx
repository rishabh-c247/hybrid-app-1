import AppProvider from '@/providers/AppProvider';
import Router from '@/router/index';

export default function AppRoot() {
    return (
        <AppProvider>
            <Router />
        </AppProvider>
    );
}
