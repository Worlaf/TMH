import { IEntity } from "./Entity";

export interface IActivity extends IEntity {
    label: string;
    description: string | null;
    tagIds: string[];
    taskId: string | null;
    isMandatory: boolean;
}

export interface IScheduleAssignment {
    activityId: string;
    start: Date;
    duration: number;
}
