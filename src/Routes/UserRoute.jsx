import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import PropTypes from 'prop-types';

const UserRoute = ({ children }) => {

    const { user, loading, logoutUser } = useAuth();
    const [getRole, isRolePending] = useRole();
    const location = useLocation();

    if (loading || isRolePending) {
        return <span className="loading loading-ring loading-lg"></span>
    }

    if (user && getRole?.role === "user") {
        return children;
    }

    logoutUser()

    return <Navigate state={location.pathname} to={"/login"}></Navigate>
};

export default UserRoute;

UserRoute.propTypes = {
    children: PropTypes.node
}