import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type props = {
    children: ReactNode
}
const ProtectedRoute = ({ children }: props) => {
    const isAuth = sessionStorage.getItem("isAuth");


    if (isAuth !== "true") {
        return <Navigate to="/" />;
    }
    return children;
};

export default ProtectedRoute