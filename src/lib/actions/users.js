'use server';
import { headers } from "next/headers";
import { revalidatePath } from "next/cache"; // এটি যোগ করুন
import { auth } from "../auth";

export const updateUserRole = async (userId, role) => {
    const data = await auth.api.setRole({
        body: {
            userId: userId,
            role: role
        },
        headers: await headers()
    });

    // এখন এটি কাজ করবে কারণ আপনি উপরে ইমপোর্ট করেছেন
    revalidatePath("/dashboard/admin/users");

    return data;
};