'use server'

import { serverMutation } from "../core/server";

export const submitApplication = async (ApplicationData) => {
    return serverMutation('/api/applications', ApplicationData);
};