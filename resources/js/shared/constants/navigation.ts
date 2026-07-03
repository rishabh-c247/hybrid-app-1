import type { LucideIcon } from 'lucide-react';
import {
    BarChart3,
    Building2,
    Cpu,
    Database,
    Globe2,
    Layers,
    Package,
    ShoppingCart,
    Users,
    Workflow,
    Zap,
} from 'lucide-react';

export interface NavLinkItem {
    type: 'link';
    label: string;
    href?: string;
}

export interface NavDropdownItem {
    label: string;
    href?: string;
    description?: string;
    icon?: LucideIcon;
}

export interface NavDropdown {
    type: 'dropdown';
    label: string;
    items: NavDropdownItem[];
}

export interface MegaMenuColumn {
    title: string;
    items: NavDropdownItem[];
}

export interface MegaMenuFeatured {
    title: string;
    description: string;
    href?: string;
    badge?: string;
}

export interface NavMegaMenu {
    type: 'mega';
    label: string;
    columns: MegaMenuColumn[];
    featured: MegaMenuFeatured;
}

export type NavItem = NavLinkItem | NavDropdown | NavMegaMenu;

export const mainNavigation: NavItem[] = [
    { type: 'link', label: 'Home', href: '/' },
    { type: 'link', label: 'About' },
    {
        type: 'dropdown',
        label: 'Services',
        items: [
            {
                label: 'CRM',
                description: 'Customer relationship management',
                icon: Users,
            },
            {
                label: 'ERP',
                description: 'Enterprise resource planning',
                icon: Building2,
            },
            {
                label: 'HRMS',
                description: 'Human resource management',
                icon: Workflow,
            },
            {
                label: 'POS',
                description: 'Point of sale systems',
                icon: ShoppingCart,
            },
        ],
    },
    {
        type: 'mega',
        label: 'Products',
        columns: [
            {
                title: 'Platform',
                items: [
                    {
                        label: 'Analytics',
                        description: 'Real-time insights and reporting',
                        icon: BarChart3,
                    },
                    {
                        label: 'Automation',
                        description: 'Workflow automation engine',
                        icon: Zap,
                    },
                    {
                        label: 'Integrations',
                        description: 'Connect your favorite tools',
                        icon: Layers,
                    },
                    {
                        label: 'API Platform',
                        description: 'Developer-first REST & GraphQL',
                        icon: Cpu,
                    },
                ],
            },
            {
                title: 'Solutions',
                items: [
                    {
                        label: 'Startups',
                        description: 'Scale from day one',
                        icon: Globe2,
                    },
                    {
                        label: 'Enterprise',
                        description: 'Security and compliance at scale',
                        icon: Building2,
                    },
                    {
                        label: 'Agencies',
                        description: 'Manage multiple clients effortlessly',
                        icon: Package,
                    },
                    {
                        label: 'Developers',
                        description: 'Build on our open platform',
                        icon: Database,
                    },
                ],
            },
        ],
        featured: {
            badge: 'Popular',
            title: 'AI Workspace',
            description:
                'Supercharge your team with intelligent automation, smart suggestions, and contextual insights.',
        },
    },
    { type: 'link', label: 'Pricing' },
    { type: 'link', label: 'Contact' },
];

export interface FooterLinkGroup {
    title: string;
    links: Array<{ label: string; href?: string }>;
}

export const footerLinkGroups: FooterLinkGroup[] = [
    {
        title: 'Product',
        links: [
            { label: 'Features' },
            { label: 'Pricing' },
            { label: 'Integrations' },
            { label: 'Changelog' },
            { label: 'Roadmap' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Documentation' },
            { label: 'Blog' },
            { label: 'Guides' },
            { label: 'API Reference' },
            { label: 'Community' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About' },
            { label: 'Careers' },
            { label: 'Press' },
            { label: 'Partners' },
            { label: 'Contact' },
        ],
    },
    {
        title: 'Support',
        links: [
            { label: 'Help Center' },
            { label: 'FAQ' },
            { label: 'Status' },
            { label: 'Security' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { label: 'Privacy Policy' },
            { label: 'Terms of Service' },
            { label: 'Cookie Policy' },
            { label: 'GDPR' },
        ],
    },
];

export const supportedLanguages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
] as const;

export type LanguageCode = (typeof supportedLanguages)[number]['code'];
