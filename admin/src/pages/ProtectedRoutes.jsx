import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";


const ProtectedRoutes = ({ children }) => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user.user)
    // const token = useSelector((store) => store.user.token)

    useEffect(() => {
       if (user === null || user.role !== 'admin') {
        navigate('/')
        
       }
      
    },[navigate, user]);

    return <>{children}</>;
};

export default ProtectedRoutes;