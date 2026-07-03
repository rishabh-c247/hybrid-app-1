import { ChevronDown } from 'lucide-react';
import { forwardRef } from 'react';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/utils';

interface NavMenuTriggerProps extends React.ComponentPropsWithoutRef<typeof Button> {
    isActive?: boolean;
}

const NavMenuTrigger = forwardRef<HTMLButtonElement, NavMenuTriggerProps>(
    ({ className, isActive, children, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                variant="ghost"
                className={cn(
                    'group h-9 gap-1 rounded-[10px] px-4 font-medium text-muted-foreground',
                    'hover:bg-accent/60 hover:text-accent-foreground',
                    'data-[state=open]:bg-accent/60 data-[state=open]:text-accent-foreground',
                    isActive && 'bg-nav-active text-nav-active-foreground',
                    className,
                )}
                {...props}
            >
                {children}
                <ChevronDown className="size-3.5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Button>
        );
    },
);

NavMenuTrigger.displayName = 'NavMenuTrigger';

export default NavMenuTrigger;
