import { Capacitor } from '@capacitor/core';

export type Platform = 'android' | 'ios' | 'web';

export function getPlatform(): Platform {
    return Capacitor.getPlatform() as Platform;
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

export function isPluginAvailable(name: string): boolean {
    return Capacitor.isPluginAvailable(name);
}
