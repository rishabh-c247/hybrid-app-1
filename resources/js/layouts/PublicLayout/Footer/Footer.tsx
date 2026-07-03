import Logo from '@/shared/components/Logo/Logo';
import { footerLinkGroups } from '@/shared/constants/navigation';
import Copyright from './Copyright';
import FooterLinks from './FooterLinks';
import FooterNewsletter from './FooterNewsletter';

export default function Footer() {
    return (
        <footer className="border-t border-border/60 bg-background">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
                    <div className="space-y-4">
                        <Logo />
                        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                            A modern hybrid platform built for teams who need one unified experience
                            across web, mobile, and everything in between.
                        </p>
                        <FooterNewsletter />
                    </div>

                    <FooterLinks groups={footerLinkGroups} />
                </div>
            </div>

            <Copyright />
        </footer>
    );
}
