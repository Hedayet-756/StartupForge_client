import React from 'react';
import { getOpportunities } from '@/lib/api/opportunities';
import OpportunitiesContainer from '@/components/opportunities/OpportunitiesContainer';

const page = async ({ searchParams }) => {
    const filters = await searchParams;
    const filterObj = { ...filters, isRemote: filters.isRemote === "true" ? true : false };

    const querySearch = new URLSearchParams(filters);
    const queryString = querySearch.toString();

    // fetch related jobs
    const { opportunities, total } = await getOpportunities(queryString);

    return (
        <div>
            <div className="max-w-3xl pl-4 md:pl-12">
                <h1 className="text-2xl font-bold text-white">Open Positions</h1>
                <p className="text-zinc-400 text-sm mt-3">Discover exciting opportunities in the tech industry.</p>
            </div>
            <OpportunitiesContainer opportunities={opportunities} filters={filterObj} total={total} />
        </div>
    );
};

export default page;