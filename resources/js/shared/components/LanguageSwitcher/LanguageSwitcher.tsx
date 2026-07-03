import { Globe } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { supportedLanguages, type LanguageCode } from '@/shared/constants/navigation';
import { cn } from '@/shared/utils/utils';

interface LanguageSwitcherProps {
    className?: string;
    value?: LanguageCode;
    onChange?: (code: LanguageCode) => void;
}

export default function LanguageSwitcher({
    className,
    value = 'en',
    onChange,
}: LanguageSwitcherProps) {
    const current = supportedLanguages.find((lang) => lang.code === value) ?? supportedLanguages[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon-sm"
                    className={cn('rounded-[10px] text-muted-foreground', className)}
                    aria-label="Select language"
                >
                    <Globe className="size-4" />
                    <span className="sr-only">{current.label}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
                {supportedLanguages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => onChange?.(language.code)}
                        className={cn(
                            'cursor-pointer gap-2',
                            value === language.code && 'bg-accent text-accent-foreground',
                        )}
                    >
                        <span aria-hidden="true">{language.flag}</span>
                        {language.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
