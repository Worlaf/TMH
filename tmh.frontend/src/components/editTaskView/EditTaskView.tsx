import React, { useState } from "react";
import TasksContainer from "../../state/containers/TasksContainer";
import { Container, Typography } from "@material-ui/core";
import TaskDifficultyEditor from "./TaskDifficultyEditor";

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
            </Container>
        );
    else throw Error(`Не удалось найти задачу с указанным идентификатором: '${props.taskId}'.`);
};

export default EditTaskView;
