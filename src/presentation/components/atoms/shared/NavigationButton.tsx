import { Button } from "@/presentation/shadcn/components/ui/button";
import {
  NavigationMenuItem,
} from "@/presentation/shadcn/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";

interface NavigationButtonProps {
  path: `/${string}`;
  textContent: string;
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

const NavigationButton = ({ path, textContent,variant="default" }: NavigationButtonProps) => {
  return (
    <NavigationMenuItem>
      <Button asChild variant={variant}>
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
