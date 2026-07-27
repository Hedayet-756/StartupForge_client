'use client';
import FounderStates from '@/components/FounderStates';
import { useSession } from '@/lib/auth-client';
import React from 'react';

const FounderDashboardPage = () => {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <div className="min-h-[80vh] bg-black flex flex-col items-center justify-center gap-3 text-zinc-400">
                <div className="w-10 h-10 border-4 border-zinc-800 border-t-indigo-500 rounded-full animate-spin" />
                <p className="text-sm font-medium tracking-wide animate-pulse">Loading founder dashboard...</p>
            </div>
        );
    }
    const user = session?.user;

    return (
        <div className="p-6 lg:p-8 space-y-6 bg-black min-h-[85vh] text-white">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Welcome back, {user?.name || 'Founder'}! 👋</h2>
                <p className="text-sm text-zinc-400 mt-1">Manage your startups, review applications, and build your dream team.</p>
            </div>

            {/* ফাউন্ডার স্ট্যাটস বা ওভারভিউ কম্পোনেন্ট */}
            <FounderStates />
        </div>
    );
};

export default FounderDashboardPage;