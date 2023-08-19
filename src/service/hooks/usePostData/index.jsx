import { useMutation } from "@tanstack/react-query";

const usePostData = (config, options) => {
    return useMutation({
        mutationKey: config.key,
        mutationFn: async (data) => {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}${config.url}`,
                {
                    method: "POST",
                    body: data,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            return await response.json();
        },
        ...options,
    });
};

export default usePostData;
