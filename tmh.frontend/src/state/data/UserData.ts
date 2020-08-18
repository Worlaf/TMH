import { ITask } from "./Task";
import { ITag } from "./Tag";

export interface IUserData {
    tasks: ITask[];
    tags: ITag[];
}
