import { useAppSelector } from "@/infra/store/reduxStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  //const localStorageToken = localStorage.getItem("authToken");
  const isLogged=useAppSelector(state=>state.auth.isAuth)
  const loading=useAppSelector(state=>state.auth.loading)
  
if(loading)return null
  
  return isLogged ? <Outlet /> : <Navigate to='/login' replace />;
};

export default ProtectedRoutes;
