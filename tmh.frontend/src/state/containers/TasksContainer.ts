import { createContainer } from "unstated-next";
import { ITask } from "../data/Task";
import * as uuid from "uuid";
import _ from "lodash";
import { IUserData } from "../data/UserData";
import nameof from "ts-nameof.macro";
import useEntity from "./useEntity";

function useTasks() {
    const taskRepository = useEntity<ITask>(
        nameof<IUserData>((d) => d.tasks),
        defaultTaskPropertiesProvider
    );

    function defaultTaskPropertiesProvider(tasks: ITask[]) {
        return {
            priority: 0,
            difficulty: null,
            duration: null,
            description: null,
            index: nextIndex(tasks),
            complete: false,
            parentId: null,
            title: "New Task",
            tagIds: [],
            id: uuid.v4(),
        } as ITask;
    }

    function nextIndex(tasks: ITask[]) {
        return (_(tasks).maxBy((t) => t.index)?.index || 0) + 1;
    }

    return {
        ...taskRepository,
        nextIndex: () => nextIndex(taskRepository.entities),
    };
}

const TasksContainer = createContainer(useTasks);

export default TasksContainer;
