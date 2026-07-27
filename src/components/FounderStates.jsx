'use client'
import React from 'react';
import { motion } from "framer-motion";

export default function FounderStates() {
    // 📊 ফাউন্ডার বা স্টার্টআপ রিলেটেড স্ট্যাটস এবং আইকন অ্যারে
    const stats = [
        {
            value: "4",
            label: "Total Startups",
            icon: (
                <svg className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        },
        {
            value: "18",
            label: "Open Positions",
            icon: (
                <svg className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            value: "284",
            label: "Total Applications",
            icon: (
                <svg className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            value: "12",
            label: "Team Members",
            icon: (
                <svg className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        }
    ];

    return (
        <section className="w-full flex flex-col items-center justify-center text-white py-4 overflow-hidden">

            {/* 📊 ৪টি স্ট্যাটস কার্ড গ্রিড */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        key={index}
                        className="bg-zinc-950 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between items-start h-[160px] transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900 group shadow-lg"
                    >
                        {/* ছোট আইকন বক্স */}
                        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-colors duration-300">
                            {stat.icon}
                        </div>

                        {/* স্ট্যাট টেক্সট সেকশন */}
                        <div className="flex flex-col gap-1 w-full">
                            <span className="text-sm text-zinc-400 font-medium tracking-wide">
                                {stat.label}
                            </span>
                            <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
                                {stat.value}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
}