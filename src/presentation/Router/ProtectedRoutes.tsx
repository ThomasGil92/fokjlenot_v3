import { useAppSelector } from "@/infra/store/reduxStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  //const localStorageToken = localStorage.getItem("authToken");
  const isAuth=useAppSelector(state=>state.auth.isAuth)
  return isAuth ? <Outlet /> : <Navigate to='/login' replace />;
};

export default ProtectedRoutes;
