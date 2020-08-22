import { ITask } from "./Task";
import { ITag } from "./Tag";
import { IActivity } from "./Activity";

export interface IUserData {
    tasks: ITask[];
    tags: ITag[];
    activities: IActivity[];
}
