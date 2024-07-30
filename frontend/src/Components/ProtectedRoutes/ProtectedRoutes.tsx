import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRoutesProps = {
    children: ReactNode;
};

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
    const storedData = localStorage.getItem('isLoggedIn');
    const isLoggedIn = storedData ? JSON.parse(storedData) : null;

    if (isLoggedIn?.loggedIn) {
        return <>{children}</>;
    }

    return <Navigate to="/" />;
}

export default ProtectedRoutes;
