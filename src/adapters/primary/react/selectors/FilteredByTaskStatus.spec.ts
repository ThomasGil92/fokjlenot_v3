import { Task, TaskStatus } from "@/adapters/secondary/task/task";
import { setTasksOrder } from "./filteredByTaskStatus.selector";

describe("setTaskOrder", () => {
  it("should reorganise an array with args", () => {
    let tasks: Task[] = [
      {
        id: "2",
        title: "Second Task",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet augue tincidunt, maximus ipsum eget, volutpat dui. Pellentesque posuere diam eget arcu aliquet venenatis.",
        status: TaskStatus.DONE,
        projectId: "1",
        collaborators: [],
      },
      {
        id: "3",
        title: "third Task",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet augue tincidunt, maximus ipsum eget, volutpat dui. Pellentesque posuere diam eget arcu aliquet venenatis.",
        status: TaskStatus.DONE,
        projectId: "2",
        collaborators: [],
      },
     
      {
        id: "5",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet augue tincidunt, maximus ipsum eget, volutpat dui. Pellentesque posuere diam eget arcu aliquet venenatis.",
        title: "Fifth Task",
        status: TaskStatus.DONE,
        projectId: "1",
        collaborators: [],
      },
    ];

    
    expect(setTasksOrder(2, 1, tasks)).toStrictEqual([
      
      {
        id: "2",
        title: "Second Task",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet augue tincidunt, maximus ipsum eget, volutpat dui. Pellentesque posuere diam eget arcu aliquet venenatis.",
        status: TaskStatus.DONE,
        projectId: "1",
        collaborators: [],
      },
        {
        id: "5",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet augue tincidunt, maximus ipsum eget, volutpat dui. Pellentesque posuere diam eget arcu aliquet venenatis.",
        title: "Fifth Task",
        status: TaskStatus.DONE,
        projectId: "1",
        collaborators: [],
      }, {
        id: "3",
        title: "third Task",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet augue tincidunt, maximus ipsum eget, volutpat dui. Pellentesque posuere diam eget arcu aliquet venenatis.",
        status: TaskStatus.DONE,
        projectId: "2",
        collaborators: [],
      },
   
     
    ]);
  });
});
