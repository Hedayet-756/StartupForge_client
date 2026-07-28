import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const getFounderStartup = async (founderId) => {
    return serverFetch(`/api/my/startups?founderId=${founderId}`);
};

export const getloggedInFounderStartup = async () => {
    const user = await getUserSession();
    return getFounderStartup(user?.id)
}