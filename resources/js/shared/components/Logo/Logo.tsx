import { cn } from '@/shared/utils/utils';

interface LogoMarkProps {
    className?: string;
}

/** Square icon mark — used in favicon, mobile, and compact contexts */
export function LogoMark({ className }: LogoMarkProps) {
    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className={cn('size-8 shrink-0', className)}
        >
            <defs>
                <linearGradient id="logo-mark-gradient" x1="4" y1="4" x2="28" y2="28">
                    <stop stopColor="#8B5CF6" />
                    <stop offset="0.5" stopColor="#7C3AED" />
                    <stop offset="1" stopColor="#6D28D9" />
                </linearGradient>
                <linearGradient id="logo-mark-shine" x1="8" y1="6" x2="24" y2="26">
                    <stop stopColor="white" stopOpacity="0.35" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
            </defs>
            <rect width="32" height="32" rx="9" fill="url(#logo-mark-gradient)" />
            <rect width="32" height="32" rx="9" fill="url(#logo-mark-shine)" />
            <path
                d="M10 11.5C10 10.6716 10.6716 10 11.5 10H14.5C15.3284 10 16 10.6716 16 11.5V14.5C16 15.3284 15.3284 16 14.5 16H11.5C10.6716 16 10 15.3284 10 14.5V11.5Z"
                fill="white"
                fillOpacity="0.95"
            />
            <path
                d="M16 17.5C16 16.6716 16.6716 16 17.5 16H20.5C21.3284 16 22 16.6716 22 17.5V20.5C22 21.3284 21.3284 22 20.5 22H17.5C16.6716 22 16 21.3284 16 20.5V17.5Z"
                fill="white"
                fillOpacity="0.75"
            />
            <path
                d="M16 11.5C16 10.6716 16.6716 10 17.5 10H20.5C21.3284 10 22 10.6716 22 11.5V14.5C22 15.3284 21.3284 16 20.5 16H17.5C16.6716 16 16 15.3284 16 14.5V11.5Z"
                fill="white"
                fillOpacity="0.55"
            />
        </svg>
    );
}

interface LogoProps {
    className?: string;
    variant?: 'full' | 'mark';
    markClassName?: string;
}

/** Full wordmark logo — pure SVG, no HTML text */
export default function Logo({ className, variant = 'full', markClassName }: LogoProps) {
    if (variant === 'mark') {
        return <LogoMark className={cn(markClassName, className)} />;
    }

    return (
        <svg
            viewBox="0 0 132 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Hybrid"
            role="img"
            className={cn('h-8 w-auto shrink-0 text-foreground', className)}
        >
            <defs>
                <linearGradient id="logo-full-gradient" x1="4" y1="4" x2="28" y2="28">
                    <stop stopColor="#8B5CF6" />
                    <stop offset="0.5" stopColor="#7C3AED" />
                    <stop offset="1" stopColor="#6D28D9" />
                </linearGradient>
                <linearGradient id="logo-full-shine" x1="8" y1="6" x2="24" y2="26">
                    <stop stopColor="white" stopOpacity="0.35" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Mark */}
            <rect width="32" height="32" rx="9" fill="url(#logo-full-gradient)" />
            <rect width="32" height="32" rx="9" fill="url(#logo-full-shine)" />
            <path
                d="M10 11.5C10 10.6716 10.6716 10 11.5 10H14.5C15.3284 10 16 10.6716 16 11.5V14.5C16 15.3284 15.3284 16 14.5 16H11.5C10.6716 16 10 15.3284 10 14.5V11.5Z"
                fill="white"
                fillOpacity="0.95"
            />
            <path
                d="M16 17.5C16 16.6716 16.6716 16 17.5 16H20.5C21.3284 16 22 16.6716 22 17.5V20.5C22 21.3284 21.3284 22 20.5 22H17.5C16.6716 22 16 21.3284 16 20.5V17.5Z"
                fill="white"
                fillOpacity="0.75"
            />
            <path
                d="M16 11.5C16 10.6716 16.6716 10 17.5 10H20.5C21.3284 10 22 10.6716 22 11.5V14.5C22 15.3284 21.3284 16 20.5 16H17.5C16.6716 16 16 15.3284 16 14.5V11.5Z"
                fill="white"
                fillOpacity="0.55"
            />

            {/* Wordmark */}
            <g fill="currentColor">
                <path d="M40 22V10.5H43.8L48.6 17.8L53.4 10.5H57.2V22H54.3V14.8L49.9 21.2H47.3L42.9 14.8V22H40Z" />
                <path d="M59.5 22V10.5H66.8C68.9 10.5 70.4 11.1 71.3 12.3C72.2 13.5 72.7 15.1 72.7 17.1C72.7 19.1 72.2 20.7 71.3 21.9C70.4 23.1 68.9 23.7 66.8 23.7H59.5V22ZM62.4 20.8H66.6C67.8 20.8 68.7 20.5 69.3 19.9C69.9 19.3 70.2 18.4 70.2 17.1C70.2 15.8 69.9 14.9 69.3 14.3C68.7 13.7 67.8 13.4 66.6 13.4H62.4V20.8Z" />
                <path d="M75.2 22V10.5H81.2C83.1 10.5 84.5 10.9 85.4 11.7C86.3 12.5 86.8 13.6 86.8 15C86.8 16.1 86.5 17 85.9 17.7C85.3 18.4 84.5 18.8 83.5 19L87.5 22H83.8L80.2 19.2H78.1V22H75.2ZM78.1 17.2H81C81.8 17.2 82.4 17 82.8 16.6C83.2 16.2 83.4 15.7 83.4 15.1C83.4 14.5 83.2 14 82.8 13.6C82.4 13.2 81.8 13 81 13H78.1V17.2Z" />
                <path d="M90.2 22V10.5H97.5C99.6 10.5 101.1 11.1 102 12.3C102.9 13.5 103.4 15.1 103.4 17.1C103.4 19.1 102.9 20.7 102 21.9C101.1 23.1 99.6 23.7 97.5 23.7H90.2V22ZM93.1 20.8H97.3C98.5 20.8 99.4 20.5 100 19.9C100.6 19.3 100.9 18.4 100.9 17.1C100.9 15.8 100.6 14.9 100 14.3C99.4 13.7 98.5 13.4 97.3 13.4H93.1V20.8Z" />
                <path d="M106.1 22L110.5 10.5H113.8L118.2 22H115.1L114.2 19.6H110.1L109.2 22H106.1ZM110.9 17.4H113.4L112.15 13.8L110.9 17.4Z" />
                <path d="M120.5 22V10.5H127.8C129.9 10.5 131.4 11.1 132.3 12.3V12.2C131.4 13.4 129.9 14 127.8 14H123.4V15.8H127.2C128.4 15.8 129.3 16.1 129.9 16.7C130.5 17.3 130.8 18.2 130.8 19.3C130.8 20.4 130.5 21.3 129.9 21.9C129.3 22.5 128.4 22.8 127.2 22.8H120.5V22ZM123.4 20.9H127C127.8 20.9 128.4 20.7 128.8 20.3C129.2 19.9 129.4 19.4 129.4 18.8C129.4 18.2 129.2 17.7 128.8 17.3C128.4 16.9 127.8 16.7 127 16.7H123.4V20.9Z" />
            </g>
        </svg>
    );
}

export { LogoMark as LogoIcon };
