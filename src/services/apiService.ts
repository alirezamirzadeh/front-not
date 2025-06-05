const BASE_URL = import.meta.env.VITE_BASE_URL;

export type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
};

async function handleErrors(response: Response) {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status} - ${errorText}`);
    }
    return response;
}

export async function fetchGet<T extends Record<string, unknown>>(
    endpoint: string,
    params?: Record<string, string | number>
): Promise<ApiResponse<T>> {
    try {
        let url = `${BASE_URL}/${endpoint.replace(/^\/+/, "")}`;

        if (params && Object.keys(params).length > 0) {
            const queryString = new URLSearchParams(
                Object.entries(params).reduce<Record<string, string>>((acc, [key, value]) => {
                    acc[key] = String(value);
                    return acc;
                }, {})
            ).toString();

            url += `?${queryString}`;
        }

        const response = await fetch(url, {
            method: "GET",
     
        });

        

        await handleErrors(response);

        const data: T = await response.json();

        return {
            success: true,
            data,
        };
    } catch (err: unknown) {
        console.error("[fetchGet] Error:", err);
        return {
            success: false,
            error: err instanceof Error ? err.message : "Unknown error",
        };
    }
}
