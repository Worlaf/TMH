export interface ITask {
    id: string;
    title: string;
    duration: number | null;
    difficulty: number | null;
    description: string | null;
    order: number;
    // resources
    // location
    parentId?: string;
    complete: boolean;
}
