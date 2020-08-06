import React from "react";
import TasksContainer from "../../state/containers/TasksContainer";
import TaskList from "./TaskList";
import { Container } from "@material-ui/core";

const RootTaskList: React.FC = () => {
    const { tasks } = TasksContainer.useContainer();

    return (
        <Container>
            <TaskList tasks={tasks.filter((t) => t.parentId === null && !t.complete)} allowAdding={true} allowSorting title="Актуальные задачи" />
            <TaskList tasks={tasks.filter((t) => t.parentId === null && t.complete)} allowAdding={false} title="Закрытые" />
        </Container>
    );
};

export default RootTaskList;
