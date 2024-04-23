//import NavigationTopBar from "@/presentation/components/organisms/NavigationTopBar";
import NavigationTopBar from "@/presentation/components/organisms/Layout/NavigationTopBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className='container px-0 w-screen mx-0 pt-28'>
      <NavigationTopBar />
      <Outlet />
    </div>
  );
};
export default Layout;
