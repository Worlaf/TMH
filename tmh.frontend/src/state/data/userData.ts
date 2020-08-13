import { ITask } from "./task";
import { ITag } from "./tag";

export interface IUserData {
    tasks: ITask[];
    tags: ITag[];
}
