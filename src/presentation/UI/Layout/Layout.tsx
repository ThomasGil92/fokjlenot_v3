//import NavigationTopBar from "@/presentation/components/organisms/NavigationTopBar";

import { isAuth } from "@/core/use-cases/auth/isAuth";
import { useAppDispatch, useAppSelector } from "@/infra/store/reduxStore";
import NavigationTopBar from "@/presentation/components/organisms/Layout/NavigationTopBar";
import { useEffect } from "react";

import { Outlet } from "react-router-dom";

const Layout = () => {
  const dispatch = useAppDispatch();
  const isLogged=useAppSelector(state=>state.auth.isAuth)
  useEffect(() => {
    dispatch(isAuth());
  }, [dispatch,isLogged]);
  return (
    <div className='container px-0 w-screen mx-0 pt-28'>
      <NavigationTopBar />
      <Outlet />
    </div>
  );
};
export default Layout;
