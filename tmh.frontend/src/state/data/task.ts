import { colors } from "@material-ui/core";

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

export function getPriorityColor(priority: Priority) {
    switch (priority) {
        case 2:
            return colors.red["A700"];
        case 1:
            return colors.orange["A700"];
        case 0:
            return colors.green["A700"];
        case -1:
            return colors.blue["A200"];
        case -2:
            return colors.blue["100"];
    }
}
