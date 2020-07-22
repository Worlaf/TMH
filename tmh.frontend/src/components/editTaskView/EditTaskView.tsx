import React, { useState } from "react";
import TasksContainer from "../../state/containers/TasksContainer";
import { Container, Typography } from "@material-ui/core";
import TaskDifficultyEditor from "./TaskDifficultyEditor";
import TaskPriorityEditor from "./TaskPriorityEditor";
import TaskDurationEditor from "./TaskDurationEditor";
import TaskDescriptionEditor from "./TaskDescriptionEditor";

interface IEditTaskViewProps {
    taskId: string;
}

const EditTaskView: React.FC<IEditTaskViewProps> = (props) => {
    const { tasks, updateTask } = TasksContainer.useContainer();
    const task = tasks.find((t) => t.id === props.taskId);

    if (task)
        return (
            <Container>
                <Typography variant="h1">{task.title}</Typography>
                <TaskDifficultyEditor difficulty={task.difficulty} onChange={(value) => updateTask({ ...task, difficulty: value })} />
                <TaskPriorityEditor priority={task.priority} onChange={(value) => updateTask({ ...task, priority: value })} />
                <TaskDurationEditor duration={task.duration} onChange={(value) => updateTask({ ...task, duration: value })} />
                <TaskDescriptionEditor description={task.description} onChange={(value) => updateTask({ ...task, description: value })} />
            </Container>
        );
    else throw Error(`Не удалось найти задачу с указанным идентификатором: '${props.taskId}'.`);
};

export default EditTaskView;
