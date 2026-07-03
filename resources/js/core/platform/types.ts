export type AppPlatform = 'web' | 'android' | 'ios';

/** How the app is running — distinct from the OS platform. */
export type RuntimeEnvironment = 'web' | 'pwa' | 'native';

export interface PlatformSnapshot {
    /** Capacitor platform identifier. */
    platform: AppPlatform;
    /** High-level runtime classification. */
    runtime: RuntimeEnvironment;
    isWeb: boolean;
    isPwa: boolean;
    isNative: boolean;
    isAndroid: boolean;
    isIos: boolean;
    /** True when running inside the Capacitor native shell (Android/iOS). */
    isMobileApp: boolean;
}
