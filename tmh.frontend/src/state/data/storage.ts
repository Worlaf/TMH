import { ITask } from "./task";

interface IAppDataStorage {
    getTasks: () => ITask[];
    setTasks: (tasks: ITask[]) => void;
}

class LocalAppDataStorage implements IAppDataStorage {
    private readonly tasksKey: string = "tasks";
    getTasks() {
        const tasksJson = window.localStorage.getItem(this.tasksKey);

        return tasksJson !== null ? (JSON.parse(tasksJson) as ITask[]) : [];
    }

    setTasks(tasks: ITask[]) {
        window.localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
    }
}

const localAppDataStorage = new LocalAppDataStorage();

export default localAppDataStorage;
