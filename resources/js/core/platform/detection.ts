import { Capacitor } from '@capacitor/core';
import type { AppPlatform, PlatformSnapshot, RuntimeEnvironment } from './types';

export function getPlatform(): AppPlatform {
    const platform = Capacitor.getPlatform();

    if (platform === 'android' || platform === 'ios') {
        return platform;
    }

    return 'web';
}

export function isNative(): boolean {
    return Capacitor.isNativePlatform();
}

export function isAndroid(): boolean {
    return getPlatform() === 'android';
}

export function isIos(): boolean {
    return getPlatform() === 'ios';
}

export function isWeb(): boolean {
    return getPlatform() === 'web';
}

export function isPwa(): boolean {
    if (isNative()) {
        return false;
    }

    if (typeof window === 'undefined') {
        return false;
    }

    const isStandaloneDisplayMode = window.matchMedia('(display-mode: standalone)').matches;
    const isIosStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    return isStandaloneDisplayMode || isIosStandalone;
}

/** True when the app should use the native mobile experience (not the public website). */
export function isMobileApp(): boolean {
    return isNative();
}

function resolveRuntimeEnvironment(): RuntimeEnvironment {
    if (isNative()) {
        return 'native';
    }

    if (isPwa()) {
        return 'pwa';
    }

    return 'web';
}

export function createPlatformSnapshot(): PlatformSnapshot {
    const platform = getPlatform();
    const runtime = resolveRuntimeEnvironment();

    return {
        platform,
        runtime,
        isWeb: runtime === 'web',
        isPwa: runtime === 'pwa',
        isNative: isNative(),
        isAndroid: platform === 'android',
        isIos: platform === 'ios',
        isMobileApp: isNative(),
    };
}
