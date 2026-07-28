'use client';
import React, { useEffect, useState } from 'react';
import { Button } from "@heroui/react";
import { Briefcase, MapPin, CircleDollar, Calendar, Envelope, ArrowRight } from "@gravity-ui/icons";
import { motion } from "motion/react";
import Image from 'next/image';
import { Fraunces } from 'next/font/google';
import Link from 'next/link';
import { getOpportunityById } from '@/lib/api/opportunities';

const fraunces = Fraunces({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-fraunces' });

const FACTS = (job) => [
    { icon: <MapPin />, label: "Location", value: job.location },
    { icon: <Briefcase />, label: "Employment", value: job.type?.replace('-', ' ') },
    { icon: <CircleDollar />, label: "Compensation", value: `${Number(job.salaryMin).toLocaleString()} – ${Number(job.salaryMax).toLocaleString()} ${job.currency}` },
    { icon: <Calendar />, label: "Apply by", value: job.applicationDeadline },
];

function LoadingState() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-[#0B0B0F]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-9 h-9 rounded-full border-2 border-[#D4A84B]/30 border-t-[#D4A84B] animate-spin" />
                <p className="text-[#71717A] text-sm font-mono tracking-wide">Preparing posting…</p>
            </div>
        </div>
    );
}

function NotFoundState() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-[#0B0B0F] px-6">
            <div className="text-center max-w-sm">
                <p className="font-mono text-xs tracking-[0.2em] text-[#D4A84B] mb-3">404 — POSTING</p>
                <h1 className="text-2xl font-semibold text-[#F5F1E8] mb-2" style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>
                    This role isn't on file
                </h1>
                <p className="text-[#71717A] text-sm leading-relaxed">
                    It may have been filled, withdrawn, or the link is out of date.
                </p>
            </div>
        </div>
    );
}

export default function OpportunityDetailsPage({ params }) {
    const [opportunity, setOpportunity] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        async function fetchJob() {
            const resolvedParams = await params;
            const opportunityId = resolvedParams.id;
            const data = await getOpportunityById(opportunityId);
            // 🎯 ফিক্স: ব্যাকএন্ড থেকে job একটা array হিসেবে আসে, তাই প্রথম আইটেমটা নিতে হবে
            const opportunityData = Array.isArray(data) ? data[0] : data;
            if (active) {
                setOpportunity(opportunityData);
                setLoading(false);
            }
        }
        fetchJob();
        return () => { active = false; };
    }, [params]);

    if (loading) return <LoadingState />;
    if (!opportunity) return <NotFoundState />;

    const cleanEmail = (opportunity.hrEmail || '').replace(/[\[\]]/g, '');
    const postedDate = opportunity.createdAt
        ? new Date(opportunity.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        : null;

    return (
        <div className={`min-h-screen bg-[#0B0B0F] py-12 md:py-20 px-4 ${fraunces.variable}`}>
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl mx-auto"
            >
                {/* Letterhead */}
                <div className="border border-[#27272E] rounded-t-2xl bg-[#111114] px-6 sm:px-10 pt-10 pb-8 relative overflow-hidden">
                    {/* Approval stamp */}
                    <div className="absolute top-6 right-6 sm:top-8 sm:right-10">
                        <div
                            className="w-[72px] h-[72px] rounded-full border-2 border-dashed border-[#D4A84B]/60 flex items-center justify-center"
                            style={{ transform: 'rotate(-12deg)' }}
                        >
                            <span className="font-mono text-[9px] tracking-[0.12em] text-[#D4A84B] text-center leading-tight uppercase">
                                Active<br />Posting
                            </span>
                        </div>
                    </div>

                    <p className="font-mono text-xs tracking-[0.2em] text-[#71717A] uppercase mb-6">
                        Position Vacancy {postedDate && `· Filed ${postedDate}`}
                    </p>

                    <div className="flex items-start gap-5 pr-20 sm:pr-0">
                        {opportunity.companyLogo && (
                            <div className="w-16 h-16 rounded-xl bg-[#F5F1E8] p-2.5 flex items-center justify-center flex-shrink-0">
                                <Image
                                    alt={opportunity.companyName}
                                    height={48}
                                    width={48}
                                    src={opportunity.companyLogo}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                        )}
                        <div>
                            <h1
                                className="text-3xl sm:text-4xl text-[#F5F1E8] leading-[1.1]"
                                style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 500 }}
                            >
                                {opportunity.title}
                            </h1>
                            <p className="text-base text-[#A1A1AA] mt-1.5">{opportunity.companyName}</p>
                        </div>
                    </div>
                </div>

                {/* Ledger facts */}
                <div className="border-x border-[#27272E] bg-[#0E0E11]">
                    {FACTS(opportunity).map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-4 px-6 sm:px-10 py-4 border-b border-[#1C1C21] last:border-b-0"
                        >
                            <span className="text-[#D4A84B] w-5 flex-shrink-0">{item.icon}</span>
                            <span className="text-[#71717A] text-sm w-32 flex-shrink-0">{item.label}</span>
                            <span className="text-[#F5F1E8] text-sm font-medium font-mono">{item.value}</span>
                        </div>
                    ))}
                </div>

                {/* Body copy */}
                <div className="border-x border-[#27272E] bg-[#0E0E11] px-6 sm:px-10 py-10 space-y-9">
                    <section>
                        <h2
                            className="text-xs font-mono tracking-[0.2em] uppercase text-[#D4A84B] mb-4"
                        >
                            §1 — About the role
                        </h2>
                        <p className="text-[#C9C9D1] text-base leading-relaxed">{opportunity.description}</p>
                    </section>
                    <section>
                        <h2 className="text-xs font-mono tracking-[0.2em] uppercase text-[#D4A84B] mb-4">
                            §2 — What's required
                        </h2>
                        <p className="text-[#C9C9D1] text-base leading-relaxed">{opportunity.requirements}</p>
                    </section>
                </div>

                {/* Footer / sign-off */}
                <div className="border border-[#27272E] rounded-b-2xl bg-[#111114] px-6 sm:px-10 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
                    <div className="flex items-center gap-2.5 text-[#71717A] text-sm">
                        <Envelope className="size-4 flex-shrink-0" />
                        <span className="font-mono break-all">{cleanEmail}</span>
                    </div>
                    <Link
                        href={`/jobs/${opportunity._id}/apply`}
                        className="w-full sm:w-auto bg-[#D4A84B] hover:bg-[#C49A3F] text-[#0B0B0F] font-semibold rounded-full px-8 h-12 text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                        Apply for this role <ArrowRight className="size-4" />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}