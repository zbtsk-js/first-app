import {useMutation} from "@tanstack/react-query";
import api from "../http/index.js";
export const useCheckout = () =>{
    return useMutation({
        mutationFn: async ( payload) => {const {data} = await api.post('/checkout', payload)
        return data;},
        onSuccess: (data) => {
            console.log('checkout response:', data)

        },
        onError: (e) => console.error("Payment creation failed:", e)
    })
}
