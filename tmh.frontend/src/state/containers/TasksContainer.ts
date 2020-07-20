import { useState, useEffect } from "react";
import { createContainer } from "unstated-next";
import { ITask } from "../data/task";
import * as uuid from "uuid";
import _ from "lodash";
import localAppDataStorage from "../data/storage";

function useTasks() {
    const [tasks, setTasks] = useState<ITask[]>(localAppDataStorage.getTasks());

    useEffect(() => {
        localAppDataStorage.setTasks(tasks);
    }, [tasks]);

    const createTask = (task: Partial<ITask> & { title: string }) => {
        const newTask: ITask = {
            difficulty: null,
            duration: null,
            description: null,
            order: (_(tasks).maxBy((t) => t.order)?.order || 0) + 1,
            complete: false,
            ...task,
            uuid: uuid.v4(),
        };

        setTasks([...tasks, newTask]);

        return newTask;
    };

    const updateTask = (task: ITask) => {
        setTasks([...tasks.filter((t) => t.uuid !== task.uuid), task]);
    };

    const deleteTask = (id: string) => {
        setTasks([...tasks.filter((t) => t.uuid !== id)]);
    };

    const getTask = (id: string) => tasks.find((t) => t.uuid === id);

    return { tasks, createTask, updateTask, deleteTask, getTask };
}

const TasksContainer = createContainer(useTasks);

export default TasksContainer;
