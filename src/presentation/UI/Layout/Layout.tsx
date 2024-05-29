//import NavigationTopBar from "@/presentation/components/organisms/NavigationTopBar";

import { isAuth } from "@/core/use-cases/auth/isAuth";
import { useAppDispatch, useAppSelector } from "@/infra/store/reduxStore";
import NavigationTopBar from "@/presentation/components/organisms/Layout/NavigationTopBar";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const Layout = () => {
  const dispatch = useAppDispatch();
  const isLogged=useAppSelector(state=>state.auth.isAuth)
   const loading = useAppSelector((state) => state.global.loading);
  useEffect(() => {
    dispatch(isAuth());
  }, [dispatch,isLogged]);
  return (
    <div className='container px-0 w-screen mx-0 pt-28'>
      {loading && <LoadingSpinner/>}
      <NavigationTopBar />
      <ToastContainer/>
      <Outlet />
    </div>
  );
};
export default Layout;
