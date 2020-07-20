import React, { useState } from "react";
import TasksContainer from "../../state/containers/TasksContainer";

interface IEditTaskViewProps {
    taskId: string;
}

const EditTaskView: React.FC<IEditTaskViewProps> = (props) => {
    const { tasks } = TasksContainer.useContainer();
    const task = tasks.find((t) => t.uuid === props.taskId);

    if (task) return <>{task.title}</>;
    else return <>ERROR SCREEN</>;
};

export default EditTaskView;
