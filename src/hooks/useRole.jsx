import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useRole = () => {

    const { user, loading } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const { data: getRole, isPending: isRolePending } = useQuery({
        queryKey: [user?.email, 'getRole'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPrivate.get(`/user/role/${user?.email}`);
            // console.log(res.data);
            return res?.data;
        }
    });

    return [getRole, isRolePending];
};

export default useRole;