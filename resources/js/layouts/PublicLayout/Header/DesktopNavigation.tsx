import { useLocation } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { mainNavigation, type NavMegaMenu } from '@/shared/constants/navigation';
import { isActivePath, NavItemLink } from '@/shared/components/NavItemLink/NavItemLink';
import { cn } from '@/shared/utils/utils';
import { navigationMenuTriggerStyle } from '@/shared/components/ui/navigation-menu';
import DropdownPanel from './DropdownPanel';
import MegaMenu from './MegaMenu';
import NavMenuTrigger from './NavMenuTrigger';

const linkClassName = cn(
    navigationMenuTriggerStyle(),
    'rounded-[10px] bg-transparent font-medium text-muted-foreground transition-colors duration-200',
    'hover:bg-accent/60 hover:text-accent-foreground',
);

export default function DesktopNavigation() {
    const { pathname } = useLocation();

    return (
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {mainNavigation.map((item) => {
                if (item.type === 'link') {
                    const active = isActivePath(pathname, item.href);

                    return (
                        <NavItemLink
                            key={item.label}
                            href={item.href}
                            className={cn(
                                linkClassName,
                                active &&
                                    'bg-nav-active text-nav-active-foreground hover:bg-nav-active hover:text-nav-active-foreground',
                            )}
                        >
                            {item.label}
                        </NavItemLink>
                    );
                }

                if (item.type === 'dropdown') {
                    const isActive = item.items.some((child) => isActivePath(pathname, child.href));

                    return (
                        <DropdownMenu key={item.label}>
                            <DropdownMenuTrigger asChild>
                                <NavMenuTrigger isActive={isActive}>{item.label}</NavMenuTrigger>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="start"
                                sideOffset={10}
                                collisionPadding={16}
                                className="border-0 bg-transparent p-0 shadow-none"
                            >
                                <DropdownPanel items={item.items} pathname={pathname} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                }

                return (
                    <DropdownMenu key={item.label}>
                        <DropdownMenuTrigger asChild>
                            <NavMenuTrigger>{(item as NavMegaMenu).label}</NavMenuTrigger>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="center"
                            sideOffset={10}
                            collisionPadding={20}
                            className="max-w-[calc(100vw-2rem)] border-0 bg-transparent p-0 shadow-none"
                        >
                            <MegaMenu menu={item as NavMegaMenu} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            })}
        </nav>
    );
}
