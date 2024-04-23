import { CardHeader } from "@/presentation/shadcn/components/ui/card";
import ActionButton from "../../atoms/shared/ActionButton";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/presentation/shadcn/components/ui/navigation-menu";

const ProjectCardHeader = () => {
  return (
    <CardHeader className='flex p-0'>
      <NavigationMenu className=' ms-auto'>
        <NavigationMenuList className="divide-x-4 space-x-0">
         
          <ActionButton
            textContent='Add task'
            action={() => console.log("Vous allez créer une tache")}
            testId='addTask'
            className='hover:bg-secondary-foreground hover:text-slate-100 rounded-none rounded-e'
          />
        </NavigationMenuList>
      </NavigationMenu>
    </CardHeader>
  );
};
export default ProjectCardHeader;
