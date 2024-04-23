import { Button } from "@/presentation/shadcn/components/ui/button";

const SubmitButton: React.FC<{ text: string,testId:string }> = ({ text,testId }) => {
  return (
    <Button className='mt-2' type='submit' data-testid={testId}>
      {text}
    </Button>
  );
};
export default SubmitButton;
