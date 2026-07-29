
import { getApplicationsByApplicant } from "@/lib/api/application";
import { getUserSession } from "@/lib/core/session";
import {
    CircleCheckFill,
    CircleXmarkFill,
    Clock
} from "@gravity-ui/icons";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';
import CancelButton from "@/components/Cancel";

const ApplicationsPage = async () => {
    const user = await getUserSession();
    const jobs = await getApplicationsByApplicant(user?._id || user?.id);

    const pending = jobs.filter(job => job.status === "pending").length;
    const accepted = jobs.filter(job => job.status === "accepted").length;
    const rejected = jobs.filter(job => job.status === "rejected").length;

    console.log(jobs);

    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-16">
            <div className="max-w-7xl mx-auto px-5">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold">
                        My Applications
                    </h1>
                    <p className="text-zinc-400 mt-2">
                        Track every job you've applied for.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mb-10">

                    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
                        <p className="text-zinc-400 text-sm">Total Applications</p>
                        <h2 className="text-4xl font-bold mt-3">
                            {jobs.length}
                        </h2>
                    </div>

                    <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6">
                        <p className="text-yellow-400 text-sm">Pending</p>
                        <h2 className="text-4xl font-bold mt-3">
                            {pending}
                        </h2>
                    </div>

                    <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6">
                        <p className="text-green-400 text-sm">Accepted</p>
                        <h2 className="text-4xl font-bold mt-3">
                            {accepted}
                        </h2>
                    </div>

                    <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6">
                        <p className="text-red-400 text-sm">Rejected</p>
                        <h2 className="text-4xl font-bold mt-3">
                            {rejected}
                        </h2>
                    </div>

                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-zinc-800/70">

                                <tr className="text-left">

                                    <th className="px-6 py-4">Job</th>

                                    <th className="px-6 py-4">Company</th>

                                    <th className="px-6 py-4">Applied</th>

                                    <th className="px-6 py-4">Status</th>

                                    <th className="px-6 py-4 text-center">Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {jobs.map((job) => (

                                    <tr
                                        key={job._id}
                                        className="border-t border-zinc-800 hover:bg-zinc-800/40 transition"
                                    >

                                        <td className="px-6 py-5">
                                            <div>
                                                <h3 className="font-semibold text-white">
                                                    {job.jobTitle}
                                                </h3>

                                                <p className="text-sm text-zinc-400">
                                                    {job.jobCategory || "General"}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">

                                                <img
                                                    src={job.companyLogo || "/company-placeholder.png"}
                                                    alt={job.companyName}
                                                    className="w-8 h-8 rounded-lg object-cover border border-zinc-700"
                                                />

                                                <span className="font-medium">
                                                    {job.companyName}
                                                </span>

                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            {/* নতুন ফরম্যাটে তারিখ দেখাবে, যেমন: "2 days ago" */}
                                            {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                                        </td>

                                        <td className="px-6 py-5">

                                            {
                                                job.status === "accepted" ? (

                                                    <div className="flex items-center gap-2 text-green-500">

                                                        <CircleCheckFill className="w-5 h-5" />

                                                        <span>Accepted</span>

                                                    </div>

                                                ) : job.status === "rejected" ? (

                                                    <div className="flex items-center gap-2 text-red-500">

                                                        <CircleXmarkFill className="w-5 h-5" />

                                                        <span>Rejected</span>

                                                    </div>

                                                ) : (

                                                    <div className="flex items-center gap-2 text-yellow-500">

                                                        <Clock className="w-5 h-5" />

                                                        <span>Pending</span>

                                                    </div>

                                                )

                                            }

                                        </td>


                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-between gap-3">
                                                <Link
                                                    href={`/jobs/${job.jobId}`}
                                                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-sm"
                                                >
                                                    View Job
                                                </Link>

                                                {/* এখানে বাটনটি কন্ডিশনালি রেন্ডার হচ্ছে */}
                                                {job.status === "applied" && (
                                                    <CancelButton applicationId={job._id} />
                                                )}
                                            </div>
                                        </td>

                                    </tr>

                                ))}

                                {jobs.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan={5}
                                            className="text-center py-16 text-zinc-400"
                                        >
                                            <div className="space-y-2">

                                                <h2 className="text-2xl font-semibold">
                                                    No Applications Yet
                                                </h2>

                                                <p>
                                                    Start applying for jobs to see them here.
                                                </p>

                                            </div>
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default ApplicationsPage;