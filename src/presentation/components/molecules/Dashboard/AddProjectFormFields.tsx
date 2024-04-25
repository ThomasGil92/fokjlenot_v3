import { UseFormReturn } from "react-hook-form";
import FormFieldZ from "../../atoms/shared/FormField";
import { ProjectStatus } from "@/adapters/secondary/project/project";

interface AddProjectFieldsInterface {
  form: UseFormReturn<
    {
      title: string;
      id: string;
      status: ProjectStatus;
      owner: string;
      collaborators: string[];
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
}

const AddProjectFormFields: React.FC<AddProjectFieldsInterface> = ({
  form,
}) => {
  const { register } = form;
  return (
    <>
      <FormFieldZ
        placeholder='Title here'
        description_helper='My New Project'
        label='Title:'
        dataId='titleInput'
        type='text'
        register={register}
        name='title'
        required
      />

      <>
        <FormFieldZ
          placeholder='Select a status'
          description_helper='Select the status of the project'
          label='Status:'
          dataId='statusInput'
          type='select'
          register={register}
          options={["Done", "Pending", "Progress"]}
          name='status'
          required
        />
      </>
    </>
  );
};

export default AddProjectFormFields;
