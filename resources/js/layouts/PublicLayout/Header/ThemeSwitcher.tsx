import { Monitor, Moon, Sun } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { useThemeStore } from '@/shared/stores/theme-store';
import type { Theme } from '@/core/theme/constants';
import { cn } from '@/shared/utils/utils';

interface ThemeSwitcherProps {
    className?: string;
}

const themeOptions: Array<{ value: Theme; label: string; icon: typeof Sun }> = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
];

export default function ThemeSwitcher({ className }: ThemeSwitcherProps) {
    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);
    const resolvedTheme = useThemeStore((state) => state.resolvedTheme);

    const ActiveIcon = resolvedTheme === 'dark' ? Moon : Sun;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon-sm"
                    className={cn('rounded-[10px] text-muted-foreground', className)}
                    aria-label="Toggle theme"
                >
                    <ActiveIcon className="size-4 transition-transform duration-300" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-36">
                {themeOptions.map((option) => {
                    const Icon = option.icon;

                    return (
                        <DropdownMenuItem
                            key={option.value}
                            onClick={() => setTheme(option.value)}
                            className={cn(
                                'cursor-pointer gap-2',
                                theme === option.value && 'bg-accent text-accent-foreground',
                            )}
                        >
                            <Icon className="size-4" />
                            {option.label}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
