import Link from "next/link";
import Image from "next/image";
import {
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-zinc-800 bg-black text-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand & Description */}
                    <div>
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                src="/logo.png"
                                alt="StartupForge Logo"
                                width={36}
                                height={36}
                                className="rounded-lg h-9 w-auto"
                            />
                            <p className="font-bold text-lg tracking-wide text-white">
                                Startup<span className="text-indigo-400">Forge</span>
                            </p>
                        </Link>

                        <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                            StartupForge is a platform where startup founders can publish startup ideas, build teams, and recruit talented collaborators.
                        </p>

                        <div className="mt-5 flex items-center gap-3">
                            <Link
                                href="#"
                                className="rounded-full border border-zinc-800 bg-zinc-900 p-2.5 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                                aria-label="Facebook"
                            >
                                <FaFacebook className="h-4 w-4" />
                            </Link>
                            <Link
                                href="#"
                                className="rounded-full border border-zinc-800 bg-zinc-900 p-2.5 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                                aria-label="Instagram"
                            >
                                <BsInstagram className="h-4 w-4" />
                            </Link>
                            <Link
                                href="#"
                                className="rounded-full border border-zinc-800 bg-zinc-900 p-2.5 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                                aria-label="Twitter"
                            >
                                <BsTwitter className="h-4 w-4" />
                            </Link>
                            <Link
                                href="#"
                                className="rounded-full border border-zinc-800 bg-zinc-900 p-2.5 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                                aria-label="LinkedIn"
                            >
                                <LiaLinkedin className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-200">
                            Platform
                        </h3>

                        <ul className="space-y-3 text-sm text-zinc-400">
                            <li>
                                <Link href="/" className="hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/browse-startups" className="hover:text-white transition-colors">
                                    Browse Startups
                                </Link>
                            </li>
                            <li>
                                <Link href="/browse-opportunities" className="hover:text-white transition-colors">
                                    Browse Opportunities
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="hover:text-white transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-200">
                            Support
                        </h3>

                        <ul className="space-y-3 text-sm text-zinc-400">
                            <li>
                                <Link href="/contact" className="hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-white transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-white transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-200">
                            Contact Info
                        </h3>

                        <div className="space-y-4 text-sm text-zinc-400">
                            <div className="flex gap-3 items-start">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                                <span>Dhaka, Bangladesh</span>
                            </div>

                            <div className="flex gap-3 items-center">
                                <Phone className="h-4 w-4 shrink-0 text-indigo-400" />
                                <span>+880 1234-567890</span>
                            </div>

                            <div className="flex gap-3 items-center">
                                <Mail className="h-4 w-4 shrink-0 text-indigo-400" />
                                <span>support@startupforge.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Section */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-800 py-6 text-center text-sm text-zinc-400 md:flex-row">
                    <p>
                        © {new Date().getFullYear()} StartupForge. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-white transition-colors">
                            Terms
                        </Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}