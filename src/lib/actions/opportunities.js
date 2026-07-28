'use server'

import { serverMutation } from "../core/server";

export const createOpportunity = async (newOpportunityData) => {
    return serverMutation('/api/opportunities', newOpportunityData);

}