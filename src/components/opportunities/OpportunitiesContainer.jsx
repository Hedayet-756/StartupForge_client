"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";
import OpportunityFilter from "./OpportunityFilter";
import OpportunityCard from "./OpportunityCard";

export default function OpportunitiesContainer({ opportunities, filters, total }) {
    const [search, setSearch] = useState(filters.search);
    const [category, setCategory] = useState(filters.category);
    const [jobType, setJobType] = useState(filters.jobType);
    const [isRemote, setIsRemote] = useState(filters.isRemote === true || filters.isRemote === "true");
    const [page, setPage] = useState(filters.page || 1);

    const categories = [...new Set(opportunities.map((job) => job.category))];

    const router = useRouter();

    const itemsPerPage = 12;
    const totalItems = total;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getPageNumbers = () => {
        const pages = [];
        pages.push(1);
        if (page > 3) {
            pages.push("ellipsis");
        }
        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        if (page < totalPages - 2) {
            pages.push("ellipsis");
        }
        pages.push(totalPages);
        return pages;
    };


    const startItem = (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalItems);


    useEffect(() => {
        const sp = new URLSearchParams();
        if (jobType !== "all-types") {
            sp.set('jobType', jobType);
        }
        if (category !== "all") {
            sp.set('category', category);
        }
        if (isRemote) {
            sp.set('isRemote', isRemote);
        }
        if (search) {
            sp.set('search', search);
        }
        if (page) {
            sp.set('page', page);
        }

        const path = `?${sp.toString()}`;
        router.push(path);
    }, [router, search, category, jobType, isRemote, page]);


    // console.log("Current Category:", category);

    // const jobs = jobs.filter((job) => {
    //     const searchTerm = search.toLowerCase();

    //     const matchesSearch =
    //         job.title?.toLowerCase().includes(searchTerm) ||
    //         job.companyName?.toLowerCase().includes(searchTerm);

    //     const matchesCategory =
    //         !category || job.category === category;

    //     const matchesRemote =
    //         !remoteOnly || job.isRemote === true;

    //     // console.log(job.category, category, matchesCategory);

    //     const matchesType =
    //         !jobType || job.type === jobType;

    //     return (
    //         matchesSearch &&
    //         matchesCategory &&
    //         matchesType &&
    //         matchesRemote
    //     );
    // });
    // console.log({
    //     category,
    //     jobType,
    //     total: jobs.length,
    //     filtered: filteredJobs.length,
    // });
    // console.log("Filtered Jobs:", filteredJobs.length);

    return (
        <div className="mt-20 w-11/12 mx-auto">
            <OpportunityFilter
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                jobType={jobType}
                setJobType={setJobType}
                categories={categories}
                isRemote={isRemote}
                setIsRemote={setIsRemote}
            />
            {opportunities.length > 0 ? (
                <>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Showing: {total} results</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                            {opportunities.map((job, index) => (
                                <motion.div
                                    key={job._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.05,
                                    }}
                                >
                                    <OpportunityCard opportunity={opportunity} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <Pagination className="w-full">
                        <Pagination.Summary>
                            Showing {startItem}-{endItem} of {totalItems} results
                        </Pagination.Summary>
                        <Pagination.Content>
                            <Pagination.Item>
                                <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
                                    <Pagination.PreviousIcon />
                                    <span>Previous</span>
                                </Pagination.Previous>
                            </Pagination.Item>
                            {getPageNumbers().map((p, i) =>
                                p === "ellipsis" ? (
                                    <Pagination.Item key={`ellipsis-${i}`}>
                                        <Pagination.Ellipsis />
                                    </Pagination.Item>
                                ) : (
                                    <Pagination.Item key={p}>
                                        <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                                            {p}
                                        </Pagination.Link>
                                    </Pagination.Item>
                                ),
                            )}
                            <Pagination.Item>
                                <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
                                    <span>Next</span>
                                    <Pagination.NextIcon />
                                </Pagination.Next>
                            </Pagination.Item>
                        </Pagination.Content>
                    </Pagination>
                </>
            ) : (
                <div className="text-center m-6">
                    <h1 className="text-2xl font-bold text-white">No results found</h1>
                    <p className="text-zinc-400 text-sm mt-3">Try adjusting your filters or search for a specific job.</p>
                </div>
            )}
        </div >
    );
}