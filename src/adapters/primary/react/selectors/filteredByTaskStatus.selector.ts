import { TaskStatus } from "@/adapters/secondary/task/task";
import { AppState } from "@/infra/store/appState";
import { createSelector } from "@reduxjs/toolkit";

export type PyramidVM = {
  currentStep: number;
  steps: number[];
  numberOfGoodAnswers: number;
};

export const doneTasks = createSelector(
  (state: AppState) => state.tasks.list,
  (tasks) => ({
    
    tasks: tasks.filter(task=>task.status===TaskStatus.DONE)
  }),
);
export const pendingTasks = createSelector(
  (state: AppState) => state.tasks.list,
  (tasks) => ({
    
    tasks: tasks.filter(task=>task.status===TaskStatus.PENDING)
  }),
);
export const progressTasks = createSelector(
  (state: AppState) => state.tasks.list,
  (tasks) => ({
    
    tasks: tasks.filter(task=>task.status===TaskStatus.PROGRESS)
  }),
);
