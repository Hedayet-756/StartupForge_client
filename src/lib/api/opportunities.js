import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export const getOpportunities = async () => {
    return serverFetch(`/api/opportunities`);
};

export const getOpportunityById = async (opportunityId) => {
    return serverFetch(`/api/opportunities/${opportunityId}`);
};

export const getStartupOpportunities = async (startupId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/opportunities?startupId=${startupId}&status=${status}`);
    return res.json();
};