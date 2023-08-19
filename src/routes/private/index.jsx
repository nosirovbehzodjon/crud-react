import { Navigate, Outlet } from "react-router-dom";

const Private = ({ sprotected }) => {
    return true ? <Outlet /> : <Navigate replace to={"/"} />;
};

export default Private;
