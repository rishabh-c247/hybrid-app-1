import { ChevronRight } from 'lucide-react';
import type { NavDropdownItem } from '@/shared/constants/navigation';
import { isActivePath, NavItemLink } from '@/shared/components/NavItemLink/NavItemLink';
import { cn } from '@/shared/utils/utils';

interface DropdownPanelProps {
    items: NavDropdownItem[];
    pathname: string;
}

export default function DropdownPanel({ items, pathname }: DropdownPanelProps) {
    return (
        <div className="w-[min(480px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border/60 bg-popover p-3 shadow-xl">
            <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
                {items.map((item) => {
                    const Icon = item.icon;
                    const active = isActivePath(pathname, item.href);

                    return (
                        <NavItemLink
                            key={item.label}
                            href={item.href}
                            className={cn(
                                'group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors duration-200',
                                item.href &&
                                    'hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
                                active && 'bg-nav-active',
                            )}
                        >
                            {Icon && (
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Icon className="size-[18px]" strokeWidth={1.75} />
                                </span>
                            )}
                            <span className="min-w-0 flex-1">
                                <span
                                    className={cn(
                                        'block text-sm font-semibold text-foreground',
                                        active && 'text-nav-active-foreground',
                                    )}
                                >
                                    {item.label}
                                </span>
                                {item.description && (
                                    <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                                        {item.description}
                                    </span>
                                )}
                            </span>
                            <ChevronRight className="size-4 shrink-0 text-muted-foreground/50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
                        </NavItemLink>
                    );
                })}
            </div>
        </div>
    );
}
