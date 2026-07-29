'use server';

import { serverMutation } from "../core/server";

export const createStartup = async (newStartupData) => {
    return serverMutation('/api/startups', newStartupData);
}

export const updateStartup = async (id, data) => {
    const result = serverMutation(`/api/startups/${id}`, data, 'PATCH');
    return result;
};


// export const approveCompany = async (companyId, updatedCompanyData) => {
//     return await serverMutation(`api/companies/${companyId}`, updatedCompanyData, 'PATCH');
// }
