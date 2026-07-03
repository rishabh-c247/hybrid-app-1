export type { AppPlatform, PlatformSnapshot, RuntimeEnvironment } from './types';

export {
    createPlatformSnapshot,
    getPlatform,
    isAndroid,
    isIos,
    isMobileApp,
    isNative,
    isPwa,
    isWeb,
} from './detection';
