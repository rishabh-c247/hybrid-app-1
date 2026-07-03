/**
 * Status bar defaults — mirrored in capacitor.config.ts plugins.StatusBar.
 * Update both when customizing native status bar appearance.
 */
export const statusBarConfig = {
    android: {
        style: 'DARK' as const,
        backgroundColor: '#0f0f0f',
        overlaysWebView: false,
    },
    ios: {
        style: 'DEFAULT' as const,
        overlaysWebView: false,
    },
} as const;

/**
 * Splash screen defaults — mirrored in capacitor.config.ts plugins.SplashScreen.
 * Replace with custom assets via @capacitor/assets when ready.
 */
export const splashScreenConfig = {
    launchShowDuration: 1500,
    launchAutoHide: false,
    backgroundColor: '#0f0f0f',
    androidSplashResourceName: 'splash',
    androidScaleType: 'CENTER_CROP' as const,
    showSpinner: false,
} as const;
