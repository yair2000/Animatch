import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useAuth = () =>{
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [loading, setLoading] = useState(true);

   const user = useSelector((state) => state.user);

   useEffect(() =>{
      if(user){
        setIsAuthenticated(true);
      }
      else{
        setIsAuthenticated(false);
      }
      setLoading(false);
   }, [user]);
   
   return {isAuthenticated, loading}
}