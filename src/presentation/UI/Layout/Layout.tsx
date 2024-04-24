//import NavigationTopBar from "@/presentation/components/organisms/NavigationTopBar";

import { isAuth } from "@/core/use-cases/auth/isAuth";
import NavigationTopBar from "@/presentation/components/organisms/Layout/NavigationTopBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Outlet } from "react-router-dom";

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuth());
  }, []);
  return (
    <div className='container px-0 w-screen mx-0 pt-28'>
      <NavigationTopBar />
      <Outlet />
    </div>
  );
};
export default Layout;
