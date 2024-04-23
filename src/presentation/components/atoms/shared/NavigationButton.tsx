import {
 
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/presentation/shadcn/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";

interface NavigationButtonProps {
  path: `/${string}`;
  textContent: string;
}

const NavigationButton = ({ path, textContent }: NavigationButtonProps) => {
  return (
    <NavigationMenuItem>
      <NavLink to={path} className={navigationMenuTriggerStyle()}>
       {/*  <NavigationMenuLink className={navigationMenuTriggerStyle()}> */}
          {textContent}
        {/* </NavigationMenuLink> */}
      </NavLink>
    </NavigationMenuItem>
  );
};
export default NavigationButton;
