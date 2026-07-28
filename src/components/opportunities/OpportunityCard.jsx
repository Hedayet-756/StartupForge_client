import { Card, Button, Chip } from "@heroui/react";
import {
    Briefcase,
    MapPin,
    CircleDollar,
    Calendar,
} from "@gravity-ui/icons";
import Link from "next/link";

export default function OpportunityCard({ opportunity }) {
    return (
        <Card className="bg-[#0d1117] border border-zinc-800 p-5 hover:border-[#008dff]/50 hover:shadow-lg hover:shadow-[#008dff]/10 transition-all duration-300">
            {/* Company Info */}
            <div className="flex items-start gap-4">
                <img
                    src={opportunity.companyLogo || "/placeholder-company.png"}
                    alt={opportunity.companyName}
                    width={60}
                    height={60}
                    className="rounded-xl bg-white p-2 object-contain"
                />

                <div className="flex-1">
                    <h2 className="text-xl font-bold text-white">
                        {opportunity.title}
                    </h2>

                    <p className="text-zinc-400 text-sm mt-1">
                        {opportunity.companyName}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                        <Chip
                            size="sm"
                            variant="flat"
                            color="primary"
                        >
                            {opportunity.category}
                        </Chip>

                        <Chip
                            size="sm"
                            variant="flat"
                            color="success"
                        >
                            {opportunity.type}
                        </Chip>

                        {opportunity.isRemote && (
                            <Chip
                                size="sm"
                                variant="flat"
                                color="secondary"
                            >
                                Remote
                            </Chip>
                        )}
                    </div>
                </div>
            </div>

            {/* Job Description */}
            <p className="text-zinc-400 text-sm mt-5 line-clamp-3">
                {opportunity.description}
            </p>

            {/* Job Details */}
            <div className="space-y-3 mt-5">
                <div className="flex items-center gap-2 text-zinc-300">
                    <MapPin className="w-4 h-4" />
                    <span>{opportunity.location}</span>
                </div>

                <div className="flex items-center gap-2 text-zinc-300">
                    <CircleDollar className="w-4 h-4" />
                    <span>
                        {opportunity.salaryMin} - {opportunity.salaryMax} {opportunity.currency}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-zinc-300">
                    <Briefcase className="w-4 h-4" />
                    <span>{opportunity.type}</span>
                </div>

                <div className="flex items-center gap-2 text-zinc-300">
                    <Calendar className="w-4 h-4" />
                    <span>
                        Apply before{" "}
                        {new Date(opportunity.applicationDeadline).toLocaleDateString()}
                    </span>
                </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 mt-6">
                <Link
                    href={`/jobs/${opportunity._id}`}
                    className="group flex justify-start items-center gap-2 font-semibold text-white transition-colors hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg p-2"
                >
                    Apply Now
                </Link>

                <Button
                    variant="bordered"
                    className="group flex justify-start items-center gap-2 font-semibold text-white transition-colors hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg p-2"
                >
                    Details
                </Button>
            </div>
        </Card>
    );
}