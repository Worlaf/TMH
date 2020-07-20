import React from "react";
import TasksContainer from "../../state/containers/TasksContainer";
import TaskList from "./TaskList";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    taskListSeparator: {
        marginTop: theme.spacing(2),
        borderBottomWidth: "1px",
        borderBottomColor: theme.palette.grey[500],
        borderBottomStyle: "dotted",
    },
}));

const RootTaskList: React.FC = () => {
    const { tasks } = TasksContainer.useContainer();
    const styles = useStyles();

    return (
        <Container>
            <Container className={styles.taskListSeparator}>Актуальные задачи:</Container>
            <TaskList tasks={tasks.filter((t) => t.parentId === undefined && !t.complete)} allowAdding={true} />
            <Container className={styles.taskListSeparator}>Закрытые:</Container>
            <TaskList tasks={tasks.filter((t) => t.parentId === undefined && t.complete)} allowAdding={false} />
        </Container>
    );
};

export default RootTaskList;
