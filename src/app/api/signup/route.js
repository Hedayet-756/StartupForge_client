import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function POST(request) {
    const { name, email, password, image, role, plan } =
        await request.json();

    return await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
            image,
            role,
            plan,
        },
        headers: await headers(),
        asResponse: true,
    });
}