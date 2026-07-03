import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/shared/utils/utils';

interface NavItemLinkProps {
    href?: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export function NavItemLink({ href, children, className, onClick }: NavItemLinkProps) {
    if (href) {
        return (
            <Link to={href} className={className} onClick={onClick}>
                {children}
            </Link>
        );
    }

    return (
        <span className={cn(className, 'cursor-default')} onClick={onClick} role="presentation">
            {children}
        </span>
    );
}

export function isActivePath(pathname: string, href?: string): boolean {
    if (!href) {
        return false;
    }

    if (href === '/') {
        return pathname === '/';
    }

    return pathname.startsWith(href);
}
