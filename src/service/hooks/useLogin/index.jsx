import { useMutation } from "@tanstack/react-query";

const useLogin = (config, options) => {
    return useMutation({
        mutationKey: config.key,
        mutationFn: async (data) => {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}${config.url}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
            return await response.json();
        },
        ...options,
    });
};

export default useLogin;
