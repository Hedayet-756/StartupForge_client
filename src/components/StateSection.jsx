'use client'
import React from 'react';
import { motion } from "framer-motion";
import { Rocket, Users, Briefcase, Trophy } from "lucide-react";

export default function StatsSection() {
    // StartupForge এর রিকোয়ারমেন্ট অনুযায়ী স্ট্যাটস ডেটা
    const stats = [
        {
            value: "500+",
            label: "Active Startups",
            icon: <Rocket className="w-5 h-5 text-indigo-400 group-hover:text-white transition-colors" />
        },
        {
            value: "12K+",
            label: "Collaborators",
            icon: <Users className="w-5 h-5 text-indigo-400 group-hover:text-white transition-colors" />
        },
        {
            value: "1,500+",
            label: "Open Opportunities",
            icon: <Briefcase className="w-5 h-5 text-indigo-400 group-hover:text-white transition-colors" />
        },
        {
            value: "95%",
            label: "Team Matching Rate",
            icon: <Trophy className="w-5 h-5 text-indigo-400 group-hover:text-white transition-colors" />
        }
    ];

    return (
        <section className="relative w-full min-h-[550px] flex flex-col items-center justify-end bg-black text-white pb-20 px-4 md:px-8 overflow-hidden">

            {/* 🌌 ব্যাকগ্রাউন্ড গ্লোব বা ডিজাইন ইফেক্ট */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-full bg-top bg-no-repeat pointer-events-none z-0 select-none opacity-40 mix-blend-screen"
                style={{
                    backgroundImage: 'url("/banner.png")',
                    backgroundSize: '120% auto',
                }}
            />

            {/* অ্যাম্বিয়েন্ট ওভারলে গ্রেডিয়েন্ট */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black to-transparent z-1 pointer-events-none" />

            {/* 💬 হেডলাইন সেকশন */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-3xl text-center mb-16 px-4"
            >
                <h2 className="text-xl sm:text-2xl md:text-[32px] font-medium tracking-tight text-zinc-300 leading-snug sm:leading-relaxed">
                    Empowering over <span className="text-white font-semibold">12,000+ visionaries</span> <br className="hidden sm:inline" /> to build and scale their startup teams.
                </h2>
            </motion.div>

            {/* 📊 ৪টি স্ট্যাটস কার্ড গ্রিড */}
            <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.03, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between items-start h-[165px] shadow-2xl transition-all duration-300 hover:border-indigo-500/50 hover:bg-zinc-900/90 group"
                    >
                        {/* আইকন কন্টেইনার */}
                        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-indigo-500/30 group-hover:bg-indigo-600/10 transition-colors duration-300">
                            {stat.icon}
                        </div>

                        {/* স্ট্যাট টেক্সট সেকশন */}
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl sm:text-[34px] font-bold tracking-tight text-white leading-none font-sans">
                                {stat.value}
                            </span>
                            <span className="text-xs sm:text-[13px] text-zinc-400 font-medium tracking-wide">
                                {stat.label}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
}