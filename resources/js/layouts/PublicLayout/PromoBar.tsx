import { ArrowRight, Sparkles, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/utils';

const PROMO_DISMISSED_KEY = 'public-promo-bar-dismissed';

interface PromoBarProps {
    className?: string;
}

export default function PromoBar({ className }: PromoBarProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const dismissed = sessionStorage.getItem(PROMO_DISMISSED_KEY);
        setVisible(dismissed !== 'true');
    }, []);

    const dismiss = (): void => {
        sessionStorage.setItem(PROMO_DISMISSED_KEY, 'true');
        setVisible(false);
    };

    if (!visible) {
        return null;
    }

    return (
        <div
            className={cn(
                'relative overflow-hidden bg-gradient-to-r from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] text-white',
                className,
            )}
            role="region"
            aria-label="Promotional announcement"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.12),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.08),transparent_40%)]" />

            <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-1.5 sm:px-6 lg:px-8">
                <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-2.5">
                    <Badge className="shrink-0 rounded-full border-white/20 bg-white/15 px-2 py-0 text-[11px] font-medium text-white hover:bg-white/20">
                        <Sparkles className="mr-1 size-3" />
                        Limited Offer
                    </Badge>
                    <p className="truncate text-xs font-medium sm:text-sm">
                        Get 3 months free on all annual plans — launch pricing ends soon.
                    </p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                    <Button
                        type="button"
                        size="xs"
                        variant="secondary"
                        className="h-7 rounded-[8px] bg-white/15 px-2.5 text-xs text-white hover:bg-white/25"
                    >
                        View Plans
                        <ArrowRight className="size-3" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        onClick={dismiss}
                        className="size-7 rounded-full text-white/80 hover:bg-white/10 hover:text-white"
                        aria-label="Dismiss promotion"
                    >
                        <X className="size-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
