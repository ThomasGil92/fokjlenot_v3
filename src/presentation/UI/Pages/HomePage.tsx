import HomePageDemo from "@/presentation/components/organisms/HomePage/HomePageDemo";
import { Button } from "@/presentation/shadcn/components/ui/button";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <><div className='w-4/5 md:w-1/3 text-center mx-auto'>
      <h1 className='font-semibold text-3xl md:text-5xl leading-9 text-blue-gradient'>
        Gérez votre temps
      </h1>
      <h1 className='font-semibold text-3xl md:text-5xl leading-9'>
        efficacement
      </h1>
      <p className='font-text text-base md:text-lg leading-7 font-normal mt-5 md:mt-7'>
        Notre gestionnaire de projet simplifie la planification, l'organisation
        et la collaboration. Gérez vos projets avec efficacité, atteignez vos
        objectifs sans stress.
      </p>
      <Button
        className='bg-primary rounded-full mt-5 md:mt-8 w-full text-lg'
        asChild
      >
        <NavLink to='/login'>Démarrer un projet</NavLink>
      </Button>
      
    </div>
    <HomePageDemo/></>
  );
};

export default HomePage;
