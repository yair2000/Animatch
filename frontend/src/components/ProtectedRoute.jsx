import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../pages/store/Loader"

const ProtectedRoute = () =>{
   const {isAuthenticated, loading} = useAuth();

   if(loading){
     return <Loader/>
   }
   return isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
}
export default ProtectedRoute;

// import { useEffect } from 'react';
// import { Navigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { loadUser } from "../reducers/user/userService";

// const ProtectedRoute = ({ children, isAdmin }) =>{
//   const { isAuthenticated = false, loading = true, user } = useSelector((state) =>state.auth);
//   const dispatch = useDispatch();

//   useEffect(() =>{
//      if(!user){
//         dispatch(loadUser());
//      }
//   },[isAuthenticated, loading]);

//   if(loading) return <h1>Loading...</h1>

//   if(!loading && isAuthenticated){
//      if(isAdmin === true && user.role === "Admin"){
//         return <Navigate to="/"/>
//      }
//      return children;
//   }
//   else{
//     return <Navigate to="/login"/>
//   }
// }

// export default ProtectedRoute;