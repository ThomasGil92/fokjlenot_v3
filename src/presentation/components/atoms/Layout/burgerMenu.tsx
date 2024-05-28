import { Button } from "@/presentation/shadcn/components/ui/button";
import {  forwardRef } from "react";

interface BurgerMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}


const BurgerMenu = forwardRef<HTMLButtonElement, BurgerMenuProps>(
  ({ isOpen,setIsOpen }, ref) => {
    const genericHamburgerLine = `min-h-1 min-w-6 my-1 rounded-full bg-primary text-black transition ease transform duration-300`;

    return (
      <Button
        ref={ref}
        onClick={() => {setIsOpen(!isOpen);console.log("test")}}
        className='flex flex-col rounded justify-center bg-white hover:bg-white  items-center border-none'
       
      >
        <div>
          <div
            className={`${genericHamburgerLine} ${
              isOpen
                ? "rotate-45 translate-y-2 opacity-100 group-hover:opacity-100 "
                : "opacity-100 group-hover:opacity-100"
            }`}
          />
          <div
            className={`${genericHamburgerLine} ${
              isOpen ? "opacity-0" : "opacity-100 group-hover:opacity-100"
            }`}
          />
          <div
            className={`${genericHamburgerLine} ${
              isOpen
                ? "-rotate-45 -translate-y-2 opacity-100 group-hover:opacity-100"
                : "opacity-100 group-hover:opacity-100"
            }`}
          />
        </div>
      </Button>
    );
  },
);

export default BurgerMenu;
