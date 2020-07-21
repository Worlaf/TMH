import React from "react";
import { Priority, getPriorityLabel } from "../../state/data/task";
import PropertyEditorLayout from "./PropertyEditorLayout";
import { ButtonGroup, Button } from "@material-ui/core";

interface ITaskPriorityEditorProps {
    priority: Priority;
    onChange: (value: Priority) => void;
}

const TaskPriorityEditor: React.FC<ITaskPriorityEditorProps> = (props) => {
    const priorities: Priority[] = [-2, -1, 0, 1, 2];
    return (
        <PropertyEditorLayout label="Приоритет">
            <ButtonGroup>
                {priorities.map((p) => (
                    <Button variant={p === props.priority ? "contained" : "outlined"} color="primary" disableElevation onClick={() => props.onChange(p)}>
                        {getPriorityLabel(p)}
                    </Button>
                ))}
            </ButtonGroup>
        </PropertyEditorLayout>
    );
};

export default TaskPriorityEditor;
