import { isNative, isAndroid, isIos } from './platform';

/**
 * Bootstrap all Capacitor plugins on app start.
 * Safe to call on web — every block guards with isNative() or platform checks.
 */
export async function bootstrapCapacitor(): Promise<void> {
    if (!isNative()) return;

    await Promise.all([
        setupStatusBar(),
        setupKeyboard(),
    ]);

    await hideSplashScreen();
}

async function setupStatusBar(): Promise<void> {
    const { StatusBar, Style } = await import('@capacitor/status-bar');

    if (isIos()) {
        await StatusBar.setStyle({ style: Style.Default });
        await StatusBar.setOverlaysWebView({ overlay: false });
    }

    if (isAndroid()) {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#0f0f0f' });
        await StatusBar.setOverlaysWebView({ overlay: false });
    }
}

async function setupKeyboard(): Promise<void> {
    const { Keyboard } = await import('@capacitor/keyboard');

    // Sync keyboard height to a CSS variable so layouts can respond
    void Keyboard.addListener('keyboardWillShow', ({ keyboardHeight }) => {
        document.documentElement.style.setProperty(
            '--keyboard-height',
            `${keyboardHeight}px`,
        );
    });

    void Keyboard.addListener('keyboardWillHide', () => {
        document.documentElement.style.setProperty('--keyboard-height', '0px');
    });
}

async function hideSplashScreen(): Promise<void> {
    const { SplashScreen } = await import('@capacitor/splash-screen');
    await SplashScreen.hide({ fadeOutDuration: 300 });
}
