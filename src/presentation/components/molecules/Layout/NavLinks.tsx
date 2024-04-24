import ActionButton from "@/presentation/components/atoms/shared/ActionButton";
import { NavigationMenuList } from "@/presentation/shadcn/components/ui/navigation-menu";
import NavigationButton from "@/presentation/components/atoms/shared/NavigationButton";
import { useAppDispatch, useAppSelector } from "@/infra/store/reduxStore";
import { logout } from "@/core/use-cases/auth/logout";

const NavLinks = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <NavigationMenuList>
      {" "}
      {isAuth ? (
        <>
          <ActionButton
            textContent='Projects'
            testId='toProjectsButton'
            to='/dashboard'
          />
          <ActionButton
            action={handleLogout}
            textContent='Log Out'
            testId='logoutButton'
            to='/'
          />
        </>
      ) : (
        <>
          <NavigationButton path='/signup' textContent='Sign Up' />
          <NavigationButton path='/login' textContent='Log In' />
        </>
      )}
    </NavigationMenuList>
  );
};

export default NavLinks;
