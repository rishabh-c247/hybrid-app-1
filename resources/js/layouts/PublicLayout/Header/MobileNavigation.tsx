import type { ReactNode } from 'react';
import { ChevronDown, Menu } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LanguageSwitcher from '@/shared/components/LanguageSwitcher/LanguageSwitcher';
import Logo from '@/shared/components/Logo/Logo';
import { isActivePath, NavItemLink } from '@/shared/components/NavItemLink/NavItemLink';
import { Button } from '@/shared/components/ui/button';
import { Separator } from '@/shared/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/shared/components/ui/sheet';
import { mainNavigation, type NavDropdown, type NavMegaMenu } from '@/shared/constants/navigation';
import { cn } from '@/shared/utils/utils';
import ThemeSwitcher from './ThemeSwitcher';
import UserMenu from './UserMenu';

export default function MobileNavigation() {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-[10px] lg:hidden"
                    aria-label="Open navigation menu"
                >
                    <Menu className="size-5" />
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="w-full max-w-sm border-border/60 p-0 sm:max-w-sm"
            >
                <SheetHeader className="border-b border-border/60 px-6 py-5">
                    <SheetTitle className="sr-only">Navigation</SheetTitle>
                    <Logo />
                </SheetHeader>

                <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile navigation">
                    <ul className="space-y-1">
                        {mainNavigation.map((item) => {
                            if (item.type === 'link') {
                                const active = isActivePath(pathname, item.href);

                                return (
                                    <li key={item.label}>
                                        <NavItemLink
                                            href={item.href}
                                            onClick={() => item.href && setOpen(false)}
                                            className={cn(
                                                'flex min-h-11 items-center rounded-[10px] px-4 text-sm font-medium transition-colors',
                                                active
                                                    ? 'bg-nav-active text-nav-active-foreground'
                                                    : 'text-foreground',
                                                item.href && 'hover:bg-accent/60',
                                            )}
                                        >
                                            {item.label}
                                        </NavItemLink>
                                    </li>
                                );
                            }

                            if (item.type === 'dropdown') {
                                return (
                                    <MobileCollapsibleSection key={item.label} label={item.label}>
                                        <MobileDropdownItems
                                            item={item}
                                            pathname={pathname}
                                            onNavigate={() => setOpen(false)}
                                        />
                                    </MobileCollapsibleSection>
                                );
                            }

                            return (
                                <MobileCollapsibleSection key={item.label} label={item.label}>
                                    <MobileMegaItems item={item} onNavigate={() => setOpen(false)} />
                                </MobileCollapsibleSection>
                            );
                        })}
                    </ul>
                </nav>

                <div className="mt-auto space-y-4 border-t border-border/60 p-6">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Preferences</span>
                        <div className="flex items-center gap-1">
                            <LanguageSwitcher />
                            <ThemeSwitcher />
                        </div>
                    </div>
                    <Separator />
                    <UserMenu className="w-full [&_button]:w-full" />
                </div>
            </SheetContent>
        </Sheet>
    );
}

function MobileCollapsibleSection({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    const [expanded, setExpanded] = useState(false);

    return (
        <li>
            <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="flex min-h-11 w-full items-center justify-between rounded-[10px] px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent/60"
                aria-expanded={expanded}
            >
                {label}
                <ChevronDown
                    className={cn(
                        'size-4 text-muted-foreground transition-transform duration-200',
                        expanded && 'rotate-180',
                    )}
                />
            </button>
            {expanded && <div className="mt-1 space-y-1 pb-2 pl-2">{children}</div>}
        </li>
    );
}

function MobileDropdownItems({
    item,
    pathname,
    onNavigate,
}: {
    item: NavDropdown;
    pathname: string;
    onNavigate: () => void;
}) {
    return (
        <>
            {item.items.map((child) => {
                const Icon = child.icon;
                const active = isActivePath(pathname, child.href);

                return (
                    <NavItemLink
                        key={child.label}
                        href={child.href}
                        onClick={() => child.href && onNavigate()}
                        className={cn(
                            'flex min-h-11 items-center gap-3 rounded-[10px] px-4 text-sm transition-colors',
                            active
                                ? 'bg-nav-active text-nav-active-foreground'
                                : 'text-muted-foreground',
                            child.href && 'hover:bg-accent/60 hover:text-foreground',
                        )}
                    >
                        {Icon && <Icon className="size-4 shrink-0" strokeWidth={1.75} />}
                        {child.label}
                    </NavItemLink>
                );
            })}
        </>
    );
}

function MobileMegaItems({
    item,
    onNavigate,
}: {
    item: NavMegaMenu;
    onNavigate: () => void;
}) {
    return (
        <>
            {item.columns.flatMap((column) =>
                column.items.map((child) => {
                    const Icon = child.icon;

                    return (
                        <NavItemLink
                            key={`${column.title}-${child.label}`}
                            href={child.href}
                            onClick={() => child.href && onNavigate()}
                            className={cn(
                                'flex min-h-11 items-center gap-3 rounded-[10px] px-4 text-sm transition-colors',
                                'text-muted-foreground',
                                child.href && 'hover:bg-accent/60 hover:text-foreground',
                            )}
                        >
                            {Icon && <Icon className="size-4 shrink-0" strokeWidth={1.75} />}
                            <span>
                                <span className="block font-medium">{child.label}</span>
                                <span className="block text-xs text-muted-foreground">
                                    {column.title}
                                </span>
                            </span>
                        </NavItemLink>
                    );
                }),
            )}
            <div className="mx-2 mt-2 rounded-[14px] bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] p-4 text-sm text-white">
                <span className="font-medium">{item.featured.title}</span>
                <span className="mt-1 block text-xs text-white/80">{item.featured.description}</span>
            </div>
        </>
    );
}
