import { Task, TaskStatus } from "@/adapters/secondary/task/task";
import { AppState } from "@/infra/store/appState";
import { createSelector } from "@reduxjs/toolkit";

export type PyramidVM = {
  currentStep: number;
  steps: number[];
  numberOfGoodAnswers: number;
};
export const setTasksOrder = (
  dragIndex: number,
  hoverIndex: number,
  tasks: Task[],
) => {
  const prevTasks = tasks.filter((task) => task.status === TaskStatus.DONE);
  const updatedCards = [...prevTasks]; // Crée une copie du tableau existant
  const draggedCard = updatedCards.splice(dragIndex, 1)[0]; // Retire l'élément à l'index dragIndex

  updatedCards.splice(hoverIndex, 0, draggedCard); // Insère l'élément à l'index hoverIndex

  return updatedCards;
};
export const doneTasks = createSelector(
  (state: AppState) => state.tasks.list,
  (tasks) => ({
    tasks: tasks.filter((task) => task.status === TaskStatus.DONE),
    setTasksOrder,
  }),
);
export const pendingTasks = createSelector(
  (state: AppState) => state.tasks.list,
  (tasks) => ({
    tasks: tasks.filter((task) => task.status === TaskStatus.PENDING),
    setTasksOrder,
  }),
);
export const progressTasks = createSelector(
  (state: AppState) => state.tasks.list,
  (tasks) => ({
    tasks: tasks.filter((task) => task.status === TaskStatus.PROGRESS),
    setTasksOrder,
  }),
);
