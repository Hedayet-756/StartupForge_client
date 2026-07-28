'use server'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);

    return handleStatus(res);
}


export const serverMutation = async (path, data, method = 'POST') => {
    try {
        const cleanBaseUrl = baseUrl ? String(baseUrl).replace(/\/$/, '') : "http://localhost:5000";
        const cleanPath = path ? String(path).replace(/^\//, '') : "";
        const cleanUrl = `${cleanBaseUrl}/${cleanPath}`;

        const res = await fetch(cleanUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ... await authHeader()
            },
            body: JSON.stringify(data),
        });

        return handleStatus(res);
    } catch (error) {
        console.error("🚨 [serverMutation Error]:", error.message);
        return { success: false, error: error.message };
    }
}