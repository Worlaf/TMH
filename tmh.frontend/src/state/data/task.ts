export type Priority = -2 | -1 | 0 | 1 | 2;

export interface ITask {
    id: string;
    title: string;
    duration: number | null;
    difficulty: number | null;
    priority: Priority;
    description: string | null;
    order: number;
    // resources
    // location
    parentId?: string;
    complete: boolean;
}

export function getPriorityLabel(priority: Priority) {
    switch (priority) {
        case 2:
            return "Максимальный";
        case 1:
            return "Высокий";
        case 0:
            return "Средний";
        case -1:
            return "Низкий";
        case -2:
            return "Минимальный";
    }
}
