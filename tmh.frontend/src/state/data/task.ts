export interface ITask {
    uuid: string;
    title: string;
    duration: number | null;
    difficulty: number | null;
    description: string | null;
    order: number;
    // resources
    // location
    parentUuid?: string;
    complete: boolean;
}
