import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import EditTaskView from "../components/editTask/EditTaskView";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import routes from "../utils/routes";
import TasksContainer from "../state/containers/TasksContainer";
import { Button, Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    navigationContainer: {
        marginTop: "1rem",
        marginBottom: "1rem",
    },
}));

export default function EditTaskPage() {
    const routeParams = useParams<{ taskId: string }>();
    const task = TasksContainer.useContainer().getTask(routeParams.taskId);

    if (!task) throw Error(`Не удалось получить задачу по идентификатору ${routeParams.taskId}`);

    const styles = useStyles();

    return (
        <>
            <Container className={styles.navigationContainer}>
                {task.parentId ? (
                    <Button variant="outlined" color="primary" component={RouterLink} to={routes.root.tasks.edit.build({ taskId: task.parentId })}>
                        <ArrowBackIcon />
                    </Button>
                ) : (
                    <Button variant="outlined" color="primary" component={RouterLink} to={routes.root.tasks.build({})}>
                        <ArrowBackIcon />
                    </Button>
                )}
            </Container>
            <EditTaskView taskId={routeParams.taskId} />
        </>
    );
}
