import { db } from "../auth";

export const getUsersList = async () => {
    const users = await db
        .collection("user")
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

    return users;
};


// import { headers } from "next/headers";
// import { auth } from "../auth";

// export const getUsersList = async () => {
//     const users = await auth.api.listUsers({
//         query: {
//             sortBy: "createdAt",
//             sortDirection: "desc",
//         },
//         // This endpoint requires session cookies.
//         headers: await headers(),
//     });
//     return users;
// }

