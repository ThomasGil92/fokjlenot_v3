import { NavigationMenu } from "@/presentation/shadcn/components/ui/navigation-menu";
import NavLinks from "@/presentation/components/molecules/Layout/NavLinks";
import NavLogo from "@/presentation/components/atoms/Layout/NavLogo";
import DashboardNavigation from "../../molecules/Dashboard/DashboardNavigation";
const NavigationTopBar = () => {
  return (
    <NavigationMenu className='fixed top-0 py-3 px-10 w-full justify-between align-middle bg-background'>
      <NavLogo />
      <DashboardNavigation />
      <NavLinks />
    </NavigationMenu>
  );
};

export default NavigationTopBar;
