import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold tracking-tight">Kingcle Expansion OS</h3>
                        <p className="text-sm text-muted-foreground">
                            Connecting brands with the world's most influential voices.
                            Create authentic relationships and drive real growth.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Instagram size={20} />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Twitter size={20} />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Linkedin size={20} />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Facebook size={20} />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Platform</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/campaigns" className="hover:text-primary">Browse Campaigns</Link></li>
                            <li><Link href="/influencers" className="hover:text-primary">For Influencers</Link></li>
                            <li><Link href="/brands" className="hover:text-primary">For Brands</Link></li>
                            <li><Link href="/pricing" className="hover:text-primary">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
                            <li><Link href="/cookies" className="hover:text-primary">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Kingcle Expansion OS. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
