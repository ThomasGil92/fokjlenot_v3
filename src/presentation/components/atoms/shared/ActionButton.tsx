import { Button } from "@/presentation/shadcn/components/ui/button";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

interface NavigationButtonProps {
  action?: () => void;
  textContent: string;
  testId: string;
  to?: `/${string}` | null;
  className?:string
}

const ActionButton = ({
  textContent,
  action,
  testId,
  to = null,className
}: NavigationButtonProps) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const handleClick = async () => {
    try {
      to && navigate(to);
      action && action();
    } catch (error) {
      console.error("Une erreur est survenue");
    }
  };
  return (
    <Button variant='secondary' className={className} onClick={handleClick} data-testid={testId} ref={ref}>
      {textContent}
    </Button>
  );
};
export default ActionButton;
