import {useQuery} from "@tanstack/react-query";
import api from "../http/index.js";

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await api.get('/payment/products');
            return res.data;
        },
        staleTime: 5 * 60 * 1000,
    });
};
