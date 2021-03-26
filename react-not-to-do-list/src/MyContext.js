import { createContext } from "react";

const TaskContext = createContext([]);

export const TaskProvider = TaskContext.Provider;
export const TaskConsumer = TaskContext.Consumer;

export default TaskContext;
