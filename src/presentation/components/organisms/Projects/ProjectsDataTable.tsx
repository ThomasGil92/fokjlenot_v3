import { Project } from "@/adapters/secondary/project/project";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/presentation/shadcn/components/ui/button";
import { Checkbox } from "@/presentation/shadcn/components/ui/checkbox";
import ProjectsTable, { TableData } from "../../molecules/Projects/ProjectsTable";

// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<TableData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: unknown) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: unknown) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "état",
    header: "État",
    cell: ({ row }) => <div className='capitalize'>{row.getValue("état")}</div>,
  },
  {
    accessorKey: "nom",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue("nom")}</div>,
  },
  {
    accessorKey: "description",
    header: () => <div className='text-left'>Description</div>,
    cell: ({ row }) => {
      return (
        <div className='text-left font-medium'>
          {row.getValue("description") ? row.getValue("description") : ""}
        </div>
      );
    },
  },
];

const ProjectsDataTable = ({ projects }: { projects: Project[] }) => {
  return (
    <div>
      <ProjectsTable
        data={[
          ...projects.map((project) => {
            return { ...project, état: project.status, nom: project.title } as TableData;
          }),
        ]}
        columns={columns}
      />
    </div>
  );
};

export default ProjectsDataTable;
