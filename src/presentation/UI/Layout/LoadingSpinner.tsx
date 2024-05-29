import { Loader } from "lucide-react";
const LoadingSpinner = () => {
  return (
    <div className='fixed top-0 left-0 w-dvw h-dvh flex justify-center items-center flex-col backdrop-blur-xl z-20'>
      <Loader
        className='animate-spin'
        strokeWidth={"1.75px"}
        color={"#5070FF"}
        width={"30%"}
        height={"30%"}
      />
      <p className="text-lg text-primary">Sauvegarde</p>
    </div>
  );
};

export default LoadingSpinner;
