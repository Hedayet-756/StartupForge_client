"use server";
import { protectedFetch, serverFetch } from "../core/server";
import { getUserSession } from "../core/session";


export const getStartups = async () => {
    return protectedFetch('/api/startups');
};

export const getFounderStartup = async (founderId) => {
    return serverFetch(`/api/my/startups?founderId=${founderId}`);
};

export const getloggedInFounderStartup = async () => {
    const user = await getUserSession();
    return getFounderStartup(user?.id)
}