import ActionButton from "@/presentation/components/atoms/shared/ActionButton";
import { NavigationMenuList } from "@/presentation/shadcn/components/ui/navigation-menu";
import NavigationButton from "@/presentation/components/atoms/shared/NavigationButton";
import { useAppSelector } from "@/infra/store/reduxStore";
//import { logOut } from "@/domain/usecases/user/userUseCase";

const NavLinks = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  return (
    <NavigationMenuList>
      {" "}
      {isAuth ? (
        <><ActionButton
          
          textContent='Projects'
          testId='toProjectsButton'
          to='/dashboard'
        />
        <ActionButton
          //action={logOut}
          textContent='Log Out'
          testId='logoutButton'
          to='/'
        /></>
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
