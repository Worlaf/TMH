import React from "react";
import TasksContainer from "../../state/containers/TasksContainer";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { Box, IconButton, Typography, makeStyles } from "@material-ui/core";
import classNames from "classnames";
import { ITask } from "../../state/data/Task";

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

export default function SimpleReadonlyTaskView(props: { task: ITask; allowCompletion?: boolean; keyIn: string | number }) {
    const { update: updateTask } = TasksContainer.useContainer();

    const styles = useStyles();

    return (
        <Box className={styles.container}>
            {props.allowCompletion && (
                <IconButton size="small" onClick={() => updateTask({ ...props.task, complete: !props.task.complete })}>
                    {props.task.complete ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                </IconButton>
            )}
            <Box>
                <Typography className={classNames({ [styles.completeTaskTitle]: props.task.complete })}>{props.task.title}</Typography>
            </Box>
        </Box>
    );
}
