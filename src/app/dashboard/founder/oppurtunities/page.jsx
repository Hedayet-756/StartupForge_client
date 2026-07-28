
import React from 'react';
// 🎯 আইকন লাইব্রেরিতে প্রয়োজনীয় আইকনগুলো যুক্ত করা হয়েছে
import { Briefcase, Calendar, Pin, ArrowUpRight, Globe, Eye, Pencil, TrashBin, CheckList } from '@gravity-ui/icons';
import { getloggedInFounderStartup } from '@/lib/api/founders';
import { getFounderOpportunities } from '@/lib/api/opportunities';
// Next.js-এর সার্ভার সাইড ক্যাশ বন্ধ রাখার জন্য
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const FounderOpportunities = async () => {
    const startunData = await getloggedInFounderStartup();
    const startup = (Array.isArray(startunData) && startunData.length > 0) ? startunData[0] : startunData;
    const startupId = startup?._id || startup?.id;

    let opportunities = [];
    if (startupId) {
        try {
            const rawJobs = await getFounderOpportunities(startupId);
            opportunities = Array.isArray(rawJobs) ? rawJobs : [];
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    console.log("=========================================");
    console.log("🏢 [RecruiterJobs] Current startup ID:", startupId);
    console.log("📦 [RecruiterJobs] Real-time Opportunities Found:", opportunities.length);
    console.log("=========================================");

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 flex justify-center">
            <div className="w-full max-w-7xl">

                {/* হেডার সেকশন */}
                <div className="border-b border-zinc-800 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100 flex items-center gap-3">
                            <Briefcase className="text-indigo-400 size-7" />
                            Manage Opportunities
                        </h1>
                        <p className="text-sm text-zinc-500 mt-1">
                            Review and manage all the opportunities posted by: <span className="text-indigo-400 font-semibold">{startup?.startupName || startup?.name || 'test company2'}</span>
                        </p>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 self-start sm:self-center">
                        Total Opportunities: <span className="text-indigo-400 font-bold text-sm ml-1">{jobs.length}</span>
                    </div>
                </div>

                {/* টেবিল সেকশন */}
                {opportunities.length === 0 ? (
                    <div className="border border-dashed border-zinc-800 rounded-2xl p-16 text-center flex flex-col items-center justify-center gap-3">
                        <Briefcase className="text-zinc-600 size-10" />
                        <h3 className="text-base font-semibold text-zinc-300">No opportunities posted yet</h3>
                        <p className="text-xs text-zinc-500 max-w-xs">You haven't published any opportunity roles under this company yet or the view is cached.</p>
                    </div>
                ) : (
                    <div className="bg-zinc-950 border border-zinc-800/60 rounded-2xl overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-zinc-800 bg-zinc-900/40 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                        <th className="py-4 px-6">Role Title</th>
                                        <th className="py-4 px-6">Required Skills</th>
                                        <th className="py-4 px-6">Work Type</th>
                                        <th className="py-4 px-6">Commitment Level</th>
                                        <th className="py-4 px-6">Deadline</th>
                                        <th className="py-4 px-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/60 text-sm text-zinc-300">
                                    {opportunities.map((opportunity) => (
                                        <tr key={opportunity._id || opportunity.id} className="hover:bg-zinc-900/30 transition-colors">

                                            {/* Role Title */}
                                            <td className="py-4 px-6">
                                                <div className="font-semibold text-zinc-100">
                                                    {opportunity.roleTitle || opportunity.title || "Software Engineer"}
                                                </div>
                                                <div className="text-xs text-zinc-500 mt-0.5 capitalize">
                                                    {opportunity.category || "Engineering"}
                                                </div>
                                            </td>

                                            {/* Required Skills */}
                                            <td className="py-4 px-6">
                                                <div className="flex flex-wrap gap-1 max-w-xs">
                                                    {(opportunity.requiredSkills || opportunity.skills || ["React", "Node.js"]).map((skill, idx) => (
                                                        <span key={idx} className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md text-xs">
                                                            {typeof skill === 'string' ? skill : skill.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>

                                            {/* Work Type */}
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center gap-1.5 text-zinc-300 capitalize bg-zinc-900/80 px-2.5 py-1 rounded-lg border border-zinc-800 text-xs">
                                                    <Globe className="size-3.5 text-indigo-400" />
                                                    {opportunity.workType || opportunity.locationType || "Remote"}
                                                </span>
                                            </td>

                                            {/* Commitment Level */}
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                                    {opportunity.commitmentLevel || opportunity.type || "Full-time"}
                                                </span>
                                            </td>

                                            {/* Deadline */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                                                    <Calendar className="size-4 text-zinc-500" />
                                                    {opportunity.deadline || opportunity.applicationDeadline ? new Date(opportunity.deadline || opportunity.applicationDeadline).toLocaleDateString('en-US', {
                                                        month: 'short', day: 'numeric', year: 'numeric'
                                                    }) : 'Jul 10, 2026'}
                                                </div>
                                            </td>

                                            {/* Actions */}
                                            <td className="py-4 px-3 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        title="View Details"
                                                        className="p-2 text-zinc-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors cursor-pointer"
                                                    >
                                                        <Eye className="size-4" />
                                                    </button>
                                                    <button
                                                        title="Edit Opportunity"
                                                        className="p-2 text-amber-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors cursor-pointer"
                                                    >
                                                        <Pencil className="size-4" />
                                                    </button>
                                                    <button
                                                        title="Delete Opportunity"
                                                        className="p-2 text-rose-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                                                    >
                                                        <TrashBin className="size-4" />
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default FounderOpportunities;