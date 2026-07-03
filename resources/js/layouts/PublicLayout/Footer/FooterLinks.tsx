import type { FooterLinkGroup } from '@/shared/constants/navigation';
import { NavItemLink } from '@/shared/components/NavItemLink/NavItemLink';
import { cn } from '@/shared/utils/utils';

interface FooterLinksProps {
    groups: FooterLinkGroup[];
}

export default function FooterLinks({ groups }: FooterLinksProps) {
    return (
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {groups.map((group) => (
                <div key={group.title} className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
                    <ul className="space-y-3">
                        {group.links.map((link) => (
                            <li key={link.label}>
                                <NavItemLink
                                    href={link.href}
                                    className={cn(
                                        'text-sm text-muted-foreground',
                                        link.href &&
                                            'transition-colors duration-200 hover:text-foreground',
                                    )}
                                >
                                    {link.label}
                                </NavItemLink>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
