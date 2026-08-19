'use client';
import React from 'react';
import { Xmark } from '@gravity-ui/icons';

export default function OpportunityDetailsModal({ isOpen, onClose, opportunity, startup }) {
    if (!isOpen || !opportunity) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-2xl p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">

                {/* ক্লোজ বাটন */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
                >
                    <Xmark className="size-5" />
                </button>

                {/* মডাল হেডার */}
                <div className="mb-6 pr-8">
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                        {opportunity.category || "General"}
                    </span>
                    <h2 className="text-2xl font-bold text-zinc-100 mt-2">
                        {opportunity.roleTitle || opportunity.title}
                    </h2>
                    <p className="text-sm text-zinc-400 mt-1">
                        {startup?.startupName || startup?.name} • <span className="text-zinc-300">{opportunity.location || opportunity.workType || "Remote"}</span>
                    </p>
                </div>

                {/* ইনফো গ্রিড */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 bg-zinc-900/50 border border-zinc-900 p-4 rounded-2xl">
                    <div>
                        <p className="text-xs text-zinc-500 font-medium">Commitment</p>
                        <p className="text-sm font-semibold text-zinc-200 mt-0.5 uppercase">{opportunity.commitmentLevel || opportunity.type || "Full-time"}</p>
                    </div>
                    <div>
                        <p className="text-xs text-zinc-500 font-medium">Deadline</p>
                        <p className="text-sm font-semibold text-zinc-200 mt-0.5">
                            {opportunity.deadline || opportunity.applicationDeadline ? new Date(opportunity.deadline || opportunity.applicationDeadline).toLocaleDateString() : 'N/A'}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-zinc-500 font-medium">Compensation</p>
                        <p className="text-sm font-semibold text-indigo-400 mt-0.5">
                            {opportunity.minPay && opportunity.maxPay ? `${opportunity.minPay} - ${opportunity.maxPay} ${opportunity.currency || 'BDT'}` : 'Negotiable'}
                        </p>
                    </div>
                </div>

                {/* স্কিলস */}
                <div className="mb-6">
                    <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">Required Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {(opportunity.requiredSkills || opportunity.skills || []).map((skill, idx) => (
                            <span key={idx} className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded-lg text-xs font-medium">
                                {typeof skill === 'string' ? skill : skill.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ডেসক্রিপশন */}
                <div className="mb-6">
                    <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">Description</h4>
                    <div className="text-sm text-zinc-300 bg-zinc-900/30 border border-zinc-900/80 p-4 rounded-2xl leading-relaxed whitespace-pre-wrap">
                        {opportunity.description || "No description provided for this opportunity."}
                    </div>
                </div>

                {/* ফুটার বাটন */}
                <div className="flex justify-end pt-4 border-t border-zinc-900">
                    <button
                        onClick={onClose}
                        className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
                    >
                        Close
                    </button>
                </div>

            </div>
        </div>
    );
}