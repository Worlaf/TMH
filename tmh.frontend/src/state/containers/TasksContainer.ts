import { useState, useEffect } from "react";
import { createContainer } from "unstated-next";
import { ITask } from "../data/task";
import * as uuid from "uuid";
import _ from "lodash";
import UserDataContainer from "./UserDataContainer";

function useTasks() {
    const { userData, updateUserData } = UserDataContainer.useContainer();
    const [tasks, setTasks] = useState<ITask[]>(userData.tasks);

    useEffect(() => {
        if (userData.tasks !== tasks) updateUserData({ tasks: tasks });
    }, [tasks]);

    const nextIndex = () => (_(tasks).maxBy((t) => t.index)?.index || 0) + 1;

    const createTask = (task: Partial<ITask> & { title: string }) => {
        const newTask: ITask = {
            priority: 0,
            difficulty: null,
            duration: null,
            description: null,
            index: nextIndex(),
            complete: false,
            parentId: null,
            ...task,
            id: uuid.v4(),
        };

        setTasks([...tasks, newTask]);

        return newTask;
    };

    const updateTask = (task: ITask) => {
        setTasks([...tasks.filter((t) => t.id !== task.id), task]);
    };

    const deleteTask = (id: string) => {
        setTasks([...tasks.filter((t) => t.id !== id)]);
    };

    const getTask = (id: string) => tasks.find((t) => t.id === id);

    return { tasks, createTask, updateTask, deleteTask, getTask, nextIndex };
}

const TasksContainer = createContainer(useTasks);

export default TasksContainer;
