import { ArrowLeft, ShieldExclamation } from '@gravity-ui/icons';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { getUserSession } from '@/lib/core/session';
import { getOpportunityById } from '@/lib/api/opportunities';
import ApplyOpportunities from './ApplyOpportunities';
import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getPlanById } from '@/lib/api/plans';

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();

    if (!user) {
        redirect(`/auth/signin?redirect=/opportunities/${id}/apply`);
    }

    if (user.role !== "collaborator") {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-6">
                <div className="max-w-lg w-full rounded-3xl border border-zinc-800 bg-zinc-950 p-10 text-center shadow-2xl">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
                        <ShieldExclamation className="h-10 w-10 text-red-500" />
                    </div>
                    <h1 className="mt-6 text-3xl font-bold text-white">Access Restricted</h1>
                    <p className="mt-3 text-zinc-400 leading-7">
                        Sorry! Only <span className="font-semibold text-white">collaborators</span> are allowed to apply for opportunities.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/jobs" className="rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-500 transition">Browse opportunities</Link>
                        <Link href={`/jobs/${id}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-6 py-3 text-zinc-300 hover:bg-zinc-900 transition">
                            <ArrowLeft className="h-5 w-5" />Back to oppritunity
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const applications = await getApplicationsByApplicant(user.id);
    const plan = await getPlanById(user?.plan || 'collaborator_free');
    console.log("plan", plan);
    const opportunityData = await getOpportunityById(id);
    const opportunity = Array.isArray(opportunityData) ? opportunityData[0] : opportunityData;
    const remaining = Math.max(0, plan.maxApplicationsPerMonth - applications.length);
    const progress = Math.min(100, (applications.length / plan.maxApplicationsPerMonth) * 100);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 p-8 text-white shadow-xl mb-8">
                    <h1 className="text-4xl font-bold">Apply for this Job</h1>
                    <p className="mt-2 text-indigo-100">Complete your application and take the next step in your career.</p>
                </div>

                <div className="mx-auto max-w-7x w-6/12">
                    <div className="space-y-6">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-900 p-6 shadow">
                            <div className="flex justify-between">
                                <div><p className="text-sm text-zinc-500">Current Plan</p><h3 className="text-xl font-bold">{plan.name}</h3></div>
                                <div className="text-right"><p className="text-sm text-zinc-500">Applications</p><h3 className="text-xl font-bold">{applications.length}/{plan.maxApplicationsPerMonth}</h3></div>
                            </div>
                            <div className="mt-5 h-3 bg-zinc-200 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${progress}%` }} />
                            </div>
                            <p className="mt-3 text-sm">Remaining: <span className="font-semibold text-indigo-600">{remaining}</span></p>
                        </div>

                        <div className="rounded-2xl bg-white dark:bg-zinc-900 shadow p-6">
                            {applications.length < plan.maxApplicationsPerMonth ? (
                                <ApplyOpportunities opportunity={opportunity} applicant={user} />
                            ) : (
                                <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
                                    <h2 className="text-2xl font-bold text-red-600">Application Limit Reached</h2>
                                    <p className="mt-3 text-zinc-600">You've used all of your monthly applications. Upgrade your plan to continue.</p>
                                    <Link href="/plans" className="inline-block mt-6 rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700">Upgrade Now</Link>
                                </div>
                            )}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default ApplyPage;
