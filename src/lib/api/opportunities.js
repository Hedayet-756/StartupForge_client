import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export const getOpportunities = async () => {
    return serverFetch(`/api/opportunities`);
};

export const getFounderOpportunities = async (founderId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/opportunities?founderId=${founderId}&status=${status}`);
    return res.json();
};