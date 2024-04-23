import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/shadcn/components/ui/card";

const ProjectsListCardHeader = () => {
  
  return (
    <CardHeader>
      <CardTitle>Your projects</CardTitle>
      <CardDescription>You have {"x"} projects</CardDescription>
    </CardHeader>
  );
};
export default ProjectsListCardHeader;
