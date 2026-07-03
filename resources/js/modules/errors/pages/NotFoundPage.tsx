import { ArrowLeft, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MobileLayout from '@/layouts/MobileLayout/MobileLayout';
import PublicLayout from '@/layouts/PublicLayout/PublicLayout';
import { Button } from '@/shared/components/ui/button';
import { usePlatform } from '@/shared/hooks/use-platform';
import { cn } from '@/shared/utils/utils';

const staggerDelays = ['delay-[0ms]', 'delay-[120ms]', 'delay-[240ms]', 'delay-[360ms]', 'delay-[480ms]'];

export default function NotFoundPage() {
    const navigate = useNavigate();
    const { isMobileApp } = usePlatform();
    const Layout = isMobileApp ? MobileLayout : PublicLayout;

    const handleGoBack = (): void => {
        if (window.history.length > 1) {
            navigate(-1);
            return;
        }

        navigate('/');
    };

    return (
        <Layout>
            <section
                className={cn(
                    'relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-20 sm:px-6 sm:py-28',
                    isMobileApp ? 'min-h-full' : 'min-h-[calc(100vh-12rem)]',
                )}
            >
                {/* Ambient background — soft aurora gradient, no scaling blobs */}
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                    <div
                        className="not-found-gradient-flow absolute inset-0 opacity-60 dark:opacity-40"
                        style={{
                            backgroundImage:
                                'linear-gradient(115deg, rgba(124,58,237,0.08), rgba(167,139,250,0.06), rgba(109,40,217,0.08), rgba(124,58,237,0.05))',
                        }}
                    />
                    <div
                        className="not-found-aurora absolute -top-1/4 left-1/4 h-[70%] w-[70%] rounded-full opacity-50 blur-[100px] dark:opacity-35"
                        style={{
                            background:
                                'radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)',
                        }}
                    />
                    <div
                        className="not-found-aurora-alt absolute -right-1/4 -bottom-1/4 h-[65%] w-[65%] rounded-full opacity-45 blur-[100px] dark:opacity-30"
                        style={{
                            background:
                                'radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%)',
                        }}
                    />
                    <div
                        className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15]"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,58,237,0.05) 1px, transparent 1px)',
                            backgroundSize: '48px 48px',
                            maskImage:
                                'radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)',
                        }}
                    />
                </div>

                {/* Content */}
                <div
                    className={cn(
                        'not-found-scale-in relative flex w-full max-w-lg flex-col items-center text-center sm:max-w-xl',
                        staggerDelays[0],
                    )}
                >
                    <div className="not-found-glow-soft pointer-events-none absolute -inset-12 rounded-full bg-primary/10 blur-3xl" />

                    <p
                        className={cn(
                            'not-found-fade-up relative mb-2 bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#6D28D9] bg-clip-text text-7xl font-bold tracking-tighter text-transparent sm:text-8xl not-found-shimmer-text',
                            staggerDelays[1],
                        )}
                    >
                        404
                    </p>

                    <h1
                        className={cn(
                            'not-found-fade-up relative mb-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl',
                            staggerDelays[2],
                        )}
                    >
                        Page Not Found
                    </h1>

                    <p
                        className={cn(
                            'not-found-fade-up relative mb-8 max-w-sm text-base leading-relaxed text-muted-foreground',
                            staggerDelays[3],
                        )}
                    >
                        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
                        Let&apos;s get you back on track.
                    </p>

                    <div
                        className={cn(
                            'not-found-fade-up relative flex w-full flex-col gap-3 sm:flex-row sm:justify-center',
                            staggerDelays[4],
                        )}
                    >
                        <Button
                            asChild
                            size="lg"
                            className="group h-11 rounded-[10px] px-6 shadow-md shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30"
                        >
                            <Link to="/">
                                <Home className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                                Go Home
                            </Link>
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            className="group h-11 rounded-[10px] px-6 transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 hover:bg-accent/50"
                            onClick={handleGoBack}
                        >
                            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                            Go Back
                        </Button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
