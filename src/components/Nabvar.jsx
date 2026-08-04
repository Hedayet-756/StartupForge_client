
"use client";

import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/signin");
                },
            },
        });
    };

    const navLinks = [
        {
            label: "Browse Opportunities",
            href: "/opportunities",
        },
        {
            label: "Startups",
            href: "dashboard/admin/startups",
        },
        {
            label: "Pricing",
            href: "/plans",
        }
    ];

    const dashboardLink = {
        collaborator: "/dashboard/collaborator",
        founder: "/dashboard/founder",
        admin: "/dashboard/admin",
    };

    if (user?.email) {
        navLinks.push({
            label: "Dashboard",
            href: dashboardLink[user?.role || "collaborator"],
        });
    }

    return (
        <div className="bg-gray-950 text-white">
            {/* নোটিশ বা ব্যানার সেকশন */}
            <div className="bg-zinc-900 border-b border-zinc-800 p-1.5 text-sm text-zinc-300">
                <marquee>
                    🚀 Welcome to StartupForge — Build your startup team, post opportunities, and recruit talented collaborators! 🎉
                </marquee>
            </div>

            <nav className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-lg">
                <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                    {/* লোগো এবং মোবাইল মেনু বাটন */}
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden text-zinc-300 hover:text-white"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Menu</span>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>

                        <Link href={'/'}>
                            <div className="flex items-center gap-3">
                                <Image
                                    height={36}
                                    width={36}
                                    loading="eager"
                                    src="/logo.png"
                                    alt="StartupForge Logo"
                                    className="rounded-lg"
                                />
                                <p className="font-bold text-lg tracking-wide text-white">
                                    Startup<span className="text-indigo-400">Forge</span>
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* ডেস্কটপ নেভিগেশন লিংকস (ডিক্লেয়ার করা অ্যারে ম্যাপ করে রেন্ডার করা হলো) */}
                    <ul className="hidden items-center gap-6 md:flex text-sm font-medium text-zinc-300">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <Link href={link.href} className="hover:text-white transition-colors">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* অথেন্টিকেশন বিহীন অবস্থায় Login/Sign Up */}
                    {!user && (
                        <div className="hidden items-center gap-3 md:flex">
                            <Link
                                href="/auth/signin"
                                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                            >
                                Login
                            </Link>
                            <Link href="/auth/signup">
                                <Button className="bg-white text-black hover:bg-zinc-200 font-medium">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* ইউজার লগইন করা থাকলে ড্রপডাউন মেনু */}
                    {user && (
                        <div className="hidden items-center gap-4 md:flex">
                            <Dropdown>
                                <Dropdown.Trigger className="rounded-full focus:outline-none ring-2 ring-zinc-700">
                                    <Avatar size="sm" aria-label="User Menu">
                                        <Avatar.Image
                                            referrerPolicy="no-referrer"
                                            alt={user?.name || "User"}
                                            src={user?.image}
                                        />
                                        <Avatar.Fallback className="bg-zinc-800 text-white">
                                            {user?.name?.charAt(0) || "U"}
                                        </Avatar.Fallback>
                                    </Avatar>
                                </Dropdown.Trigger>
                                <Dropdown.Popover className="bg-zinc-900 border border-zinc-800 text-white shadow-xl">
                                    <div className="px-3 pt-3 pb-2 border-b border-zinc-800">
                                        <div className="flex items-center gap-2">
                                            <Avatar size="sm">
                                                <Avatar.Image alt={user?.name} src={user?.image} />
                                                <Avatar.Fallback className="bg-zinc-800 text-white">
                                                    {user?.name?.charAt(0) || "U"}
                                                </Avatar.Fallback>
                                            </Avatar>
                                            <div className="flex flex-col gap-0 overflow-hidden">
                                                <p className="text-sm leading-5 font-semibold truncate">
                                                    {user?.name}
                                                </p>
                                                <p className="text-xs leading-none text-zinc-400 truncate">
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <Dropdown.Menu
                                        onAction={(key) => {
                                            if (key === "dashboard") router.push("/dashboard");
                                            if (key === "profile") router.push("/dashboard/profile");
                                        }}
                                    >
                                        <Dropdown.Item id="dashboard" textValue="Dashboard">
                                            <div className="flex items-center gap-2 py-1">
                                                <MdDashboard className="text-lg text-zinc-400" />
                                                <Label className="cursor-pointer">Dashboard</Label>
                                            </div>
                                        </Dropdown.Item>

                                        <Dropdown.Item id="profile" textValue="Profile">
                                            <div className="flex items-center gap-2 py-1">
                                                <CgProfile className="text-lg text-zinc-400" />
                                                <Label className="cursor-pointer">Profile</Label>
                                            </div>
                                        </Dropdown.Item>

                                        <Dropdown.Item
                                            id="logout"
                                            textValue="Logout"
                                            variant="danger"
                                            onClick={handleSignOut}
                                        >
                                            <div className="flex items-center gap-2 py-1 text-red-400">
                                                <BiLogOut className="text-lg" />
                                                <Label className="cursor-pointer">Logout</Label>
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown>
                        </div>
                    )}
                </header>

                {/* রেসপনসিভ মোবাইল ড্রপডাউন মেনু */}
                {isMenuOpen && (
                    <div className="border-t border-zinc-800 bg-zinc-950 md:hidden px-4 py-4">
                        <ul className="flex flex-col gap-3 text-zinc-300">
                            {navLinks.map((link, index) => (
                                link.show && (
                                    <li key={index}>
                                        <Link
                                            href={link.href}
                                            className="block py-2 hover:text-white"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                )
                            ))}

                            {user && (
                                <li>
                                    <Link
                                        href="/dashboard/[user.role]"
                                        className="block py-2 hover:text-white"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                </li>
                            )}

                            <li className="mt-4 flex flex-col gap-2 border-t border-zinc-800 pt-4">
                                {!user ? (
                                    <>
                                        <Link
                                            href="/auth/signin"
                                            className="block py-2 text-center text-zinc-300 hover:text-white"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                                            <Button className="w-full bg-white text-black font-medium">Sign Up</Button>
                                        </Link>
                                    </>
                                ) : (
                                    <Button
                                        className="w-full bg-red-600/20 text-red-400 border border-red-600/30"
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            handleSignOut();
                                        }}
                                    >
                                        Logout
                                    </Button>
                                )}
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;