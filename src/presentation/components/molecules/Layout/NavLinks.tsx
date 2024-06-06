import ActionButton from "@/presentation/components/atoms/shared/ActionButton";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/presentation/shadcn/components/ui/navigation-menu";
import NavigationButton from "@/presentation/components/atoms/shared/NavigationButton";
import { useAppDispatch, useAppSelector } from "@/infra/store/reduxStore";
import { logout } from "@/core/use-cases/auth/logout";
import BurgerMenu from "../../atoms/Layout/burgerMenu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/presentation/shadcn/components/ui/dropdown-menu";
import { Button } from "@/presentation/shadcn/components/ui/button";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const NavLinks = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className='hidden md:block'>
        <NavigationMenuList className="gap-3">
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
              <NavigationButton path='/signup' textContent="Créer un compte" variant="secondary" />
              <NavigationButton path='/login' textContent='Connexion'/>
            </>
          )}
        </NavigationMenuList>
      </div>
      {/* Mobile */}
      <div className='block md:hidden relative z-50'>
        {isAuth ? (
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-screen h-screen border-none rounded-none bg-foreground'>
              <NavigationMenu className='w-full rounded-t-none bg-secondary border-2 flex justify-end z-40'>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Button asChild variant={"link"} >
                      <NavLink to='/dashboard' reloadDocument>
                        Tableau de bord
                      </NavLink>
                    </Button>
                    <Button asChild variant={"link"} onClick={handleLogout}>
                      <NavLink to='/login' reloadDocument>
                        Déconnexion
                      </NavLink>
                    </Button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-screen h-screen border-none rounded-none bg-secondary'>
              <NavigationMenu className='w-full rounded-t-none bg-secondary flex justify-end z-40'>
                <NavigationMenuList className='bg-secondary'>
                  <NavigationMenuItem className='bg-secondary'>
                    <NavigationMenuTrigger className='bg-secondary'>
                      Sign in
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className='w-screen p-0 m-0 '>
                      <Button
                        asChild
                        variant={"secondary"}
                        className='border-r-0 w-full m-0  '
                      >
                        <NavLink
                          to='/login'
                          className='w-full text-start flex justify-between  '
                          reloadDocument
                        >
                          <p>Log in</p>
                          <i className='fa-solid fa-chevron-right'></i>
                        </NavLink>
                      </Button>
                      <Button
                        asChild
                        variant={"secondary"}
                        className='border-r-0 w-full m-0  '
                      >
                        <NavLink
                          to='/signup'
                          className='w-full text-start flex justify-between  '
                          reloadDocument
                        >
                          <p>Sign up</p>
                          <i className='fa-solid fa-chevron-right'></i>
                        </NavLink>
                      </Button>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className='bg-secondary'>
                      Menu
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className='w-screen p-0 m-0 '>
                      <Button
                        asChild
                        variant={"secondary"}
                        className='border-r-0 w-full m-0  '
                      >
                        <NavLink
                          to='/login'
                          className='w-full text-start flex justify-between '
                          reloadDocument
                        >
                          <p>Menu à faire</p>
                          <i className='fa-solid fa-chevron-right'></i>
                        </NavLink>
                      </Button>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </>
  );
};

export default NavLinks;
