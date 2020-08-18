import React from "react";
import TasksContainer from "../../state/containers/TasksContainer";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { Box, IconButton, Typography, makeStyles } from "@material-ui/core";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "grid",
        gridTemplateColumns: "min-content auto",
        alignItems: "center",
    },
    completeTaskTitle: {
        color: theme.palette.grey["500"],
        textDecoration: "line-through",
    },
}));

export default function SimpleReadonlyTaskView(props: { taskId: string; allowCompletion?: boolean; keyIn: string | number }) {
    const { getTask, updateTask } = TasksContainer.useContainer();
    const task = getTask(props.taskId);

    if (!task) throw Error(`Не удалось получить задачу по идентификатору ${props.taskId}`);

    const styles = useStyles();

    return (
        <Box className={styles.container}>
            {props.allowCompletion && (
                <IconButton size="small" onClick={() => updateTask({ ...task, complete: !task.complete })}>
                    {task.complete ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                </IconButton>
            )}
            <Box>
                <Typography className={classNames({ [styles.completeTaskTitle]: task.complete })}>{task.title}</Typography>
            </Box>
        </Box>
    );
}
