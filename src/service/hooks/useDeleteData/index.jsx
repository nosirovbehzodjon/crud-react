import { useMutation } from "@tanstack/react-query";

const useDeleteData = (config, options) => {
    return useMutation({
        mutationKey: config.key,
        mutationFn: async (data) => {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}${config.url}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    method: "DELETE",
                    body: JSON.stringify(data),
                }
            );
            return await response.json();
        },
        ...options,
    });
};

export default useDeleteData;
