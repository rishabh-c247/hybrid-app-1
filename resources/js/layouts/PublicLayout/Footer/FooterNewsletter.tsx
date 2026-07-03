import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

export default function FooterNewsletter() {
    return (
        <form
            className="flex max-w-sm items-center gap-2"
            onSubmit={(event) => event.preventDefault()}
        >
            <Input
                type="email"
                placeholder="you@company.com"
                aria-label="Email address"
                className="h-9 min-w-0 flex-1 rounded-[10px] bg-background"
            />
            <Button type="submit" size="sm" className="h-9 shrink-0 rounded-[10px] px-4">
                Subscribe
            </Button>
        </form>
    );
}
