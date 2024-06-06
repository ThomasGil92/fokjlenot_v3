import { useAppSelector } from "@/infra/store/reduxStore";
import { Label } from "@/presentation/shadcn/components/ui/label";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/presentation/shadcn/components/ui/navigation-menu";
import { cn } from "@/presentation/shadcn/lib/utils";
import React from "react";
import { NavLink } from "react-router-dom";

const DashboardNavigation = () => {
  const projects=useAppSelector(state=>state.projects.list)
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Vos tâches</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='flex flex-col gap-3 pt-6 md:w-[400px] lg:w-[200px] bg-white border-slate-100 border-2 m-5 ms-1 rounded-3xl shadow-md shadow-slate-400 lg:grid-cols-[.75fr_1fr]'>
              <ListItem href='/docs' title='Introduction'>
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href='/docs/installation' title='Installation'>
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href='/docs/primitives/typography' title='Typography'>
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Projets</NavigationMenuTrigger>
          <NavigationMenuContent className="p-0">
            
            <ul className='flex flex-col gap-3 p-0 pt-6 pb-2 md:w-[400px] lg:w-[200px] bg-white  m-5 ms-1 rounded-xl shadow-md shadow-slate-400 lg:grid-cols-[.75fr_1fr]'>
             <p className="px-2 text-sm">ÉLÉMENTS RÉCENTS</p> {projects.slice(0, 4).map((project, id) => (
                <ListItem className="m-0 rounded-none"
                  key={id + project.title}
                  title={project.title}
                  href={`/project/${project.id}`}
                >
                  {project.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink to='/docs'>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default DashboardNavigation;
