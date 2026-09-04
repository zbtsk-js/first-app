import {useQuery} from "@tanstack/react-query";
import AuthService from "../services/AuthService.js";

export const useEmailAvailabilaty = (DebouncedEmail) => {
    return useQuery({
        queryKey: ['email-exists', DebouncedEmail],
        queryFn: async () => await AuthService.checkifEmailexists(DebouncedEmail),
        enabled: !!DebouncedEmail
    })
}
