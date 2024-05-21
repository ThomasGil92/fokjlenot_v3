import { Button } from "@/presentation/shadcn/components/ui/button";
import {
  NavigationMenuItem,
} from "@/presentation/shadcn/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";

interface NavigationButtonProps {
  path: `/${string}`;
  textContent: string;
}

const NavigationButton = ({ path, textContent }: NavigationButtonProps) => {
  return (
    <NavigationMenuItem>
      <Button asChild>
        <NavLink to={path}>
          {/*  <NavigationMenuLink className={navigationMenuTriggerStyle()}> */}
          {textContent}
          {/* </NavigationMenuLink> */}
        </NavLink>
      </Button>
    </NavigationMenuItem>
  );
};
export default NavigationButton;
