import { ArrowRight, ChevronRight } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import type { NavMegaMenu } from '@/shared/constants/navigation';
import { NavItemLink } from '@/shared/components/NavItemLink/NavItemLink';
import { cn } from '@/shared/utils/utils';

interface MegaMenuProps {
    menu: NavMegaMenu;
}

function MegaMenuColumn({
    title,
    items,
}: {
    title: string;
    items: NavMegaMenu['columns'][number]['items'];
}) {
    return (
        <div className="min-w-0 flex-1 px-2 py-4">
            <p className="mb-3 px-3 text-[11px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                {title}
            </p>
            <ul className="space-y-0.5">
                {items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <li key={item.label}>
                            <NavItemLink
                                href={item.href}
                                className={cn(
                                    'group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200',
                                    item.href &&
                                        'hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
                                )}
                            >
                                {Icon && (
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <Icon className="size-[18px]" strokeWidth={1.75} />
                                    </span>
                                )}
                                <span className="min-w-0 flex-1">
                                    <span className="block text-sm font-semibold text-foreground">
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
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default function MegaMenu({ menu }: MegaMenuProps) {
    const [firstColumn, secondColumn] = menu.columns;

    return (
        <div className="w-[min(780px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border/60 bg-popover shadow-xl">
            <div className="flex flex-col lg:flex-row">
                {firstColumn && <MegaMenuColumn title={firstColumn.title} items={firstColumn.items} />}

                {firstColumn && secondColumn && (
                    <div className="mx-1 hidden w-px self-stretch bg-border/60 lg:block" />
                )}

                {secondColumn && (
                    <MegaMenuColumn title={secondColumn.title} items={secondColumn.items} />
                )}

                <div className="m-3 min-w-0 flex-1 rounded-xl border border-primary/10 bg-accent/50 p-5 lg:max-w-[240px]">
                    {menu.featured.badge && (
                        <Badge
                            variant="outline"
                            className="mb-3 rounded-full border-primary/20 bg-background/80 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-primary uppercase"
                        >
                            {menu.featured.badge}
                        </Badge>
                    )}
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                        {menu.featured.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {menu.featured.description}
                    </p>
                    {menu.featured.href ? (
                        <Button asChild size="sm" className="mt-4 h-9 w-full rounded-[10px]">
                            <NavItemLink href={menu.featured.href}>
                                Learn more
                                <ArrowRight className="size-3.5" />
                            </NavItemLink>
                        </Button>
                    ) : (
                        <Button size="sm" className="mt-4 h-9 w-full rounded-[10px]" disabled>
                            Learn more
                            <ArrowRight className="size-3.5" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
