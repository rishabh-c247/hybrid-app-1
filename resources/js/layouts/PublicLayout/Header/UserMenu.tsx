import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/utils';

interface UserMenuProps {
    className?: string;
}

export default function UserMenu({ className }: UserMenuProps) {
    return (
        <div className={cn('flex items-center', className)}>
            {/* Future: authenticated avatar dropdown with Dashboard, Profile, Logout */}
            <Button size="sm" className="rounded-[10px] font-medium">
                Sign In
            </Button>
        </div>
    );
}
