import { Button } from "@/presentation/shadcn/components/ui/button";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div className='w-4/5 text-center mx-auto'>
      <h1 className='font-semibold text-3xl leading-9 text-blue-gradient'>
        Gérez votre temps
      </h1>
      <h1 className='font-semibold text-3xl leading-9'>efficacement</h1>
      <p className='font-text text-base leading-7 font-normal mt-5'>
        Notre gestionnaire de projet simplifie la planification, l'organisation
        et la collaboration. Gérez vos projets avec efficacité, atteignez vos
        objectifs sans stress.
      </p>
      <Button className='bg-primary rounded-full mt-5 w-full text-lg' asChild>
        <NavLink to='/login'>Démarrer un projet</NavLink>
      </Button>
      {/* <h1 className='font-semibold text-3xl leading-9'>
        Gestionnaire de projet personnalisable pour une expérience sur mesure.
      </h1> */}
    </div>
  );
};

export default HomePage;
