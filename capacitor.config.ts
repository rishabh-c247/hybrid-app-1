import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.hybridapp.app',
    appName: 'Hybrid App',
    webDir: 'mobile/www',

    server: {
        androidScheme: 'https',
    },

    plugins: {
        SplashScreen: {
            launchShowDuration: 1500,
            launchAutoHide: false, // we call SplashScreen.hide() manually after bootstrap
            backgroundColor: '#0f0f0f',
            androidSplashResourceName: 'splash',
            androidScaleType: 'CENTER_CROP',
            showSpinner: false,
        },

        StatusBar: {
            style: 'DARK',
            backgroundColor: '#0f0f0f',
            overlaysWebView: false,
        },

        Keyboard: {
            resize: 'body',
            resizeOnFullScreen: true,
        },
    },
};

export default config;
