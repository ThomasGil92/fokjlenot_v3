import { ProjectStatus } from "@/domain/entities/Project";
import { UseFormReturn } from "react-hook-form";
import FormFieldZ from "../../atoms/shared/FormField";

interface AddProjectFieldsInterface {
  form: UseFormReturn<
    {
      id: string;
      title: string;
      status: ProjectStatus;
      owner: string;
      collaborators: string[];
    },
    any,
    undefined
  >;
}

const AddProjectFormFields: React.FC<AddProjectFieldsInterface> = ({
  form,
}) => {
  return (
    <>
      <FormFieldZ
        placeholder='Title here'
        description_helper='My New Project'
        label='Title:'
        dataId="titleInput"
        type='text'
        control={form.control}
        name='title'
        required
      />
    </>
  );
};

export default AddProjectFormFields;
