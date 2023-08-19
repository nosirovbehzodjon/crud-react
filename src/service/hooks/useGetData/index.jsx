import { useQuery } from "@tanstack/react-query";

const useGetData = (config, options) => {
    return useQuery({
        queryKey: config.key,
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}${config.url}`
            );
            return await response.json();
        },
    });
};

export default useGetData;
// mutationFn:
