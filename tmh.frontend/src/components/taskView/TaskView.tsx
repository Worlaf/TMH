import React, { useRef, useState, useEffect } from "react";
import { ITask } from "../../state/data/task";
import { Container, TextField, makeStyles, IconButton, InputAdornment } from "@material-ui/core";
import TasksContainer from "../../state/containers/TasksContainer";
import AddIcon from "@material-ui/icons/Add";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import routes from "../../utils/routes";

interface TaskViewProps {
    isExpanded: boolean;
    taskId?: string;
    onToggleExpandedState: () => void;
}

const useStyles = makeStyles((theme) => ({
    completeTaskInput: {
        textDecorationLine: "line-through",
    },
    taskContainer: {
        padding: "0",
    },
    hidden: {
        transition: "opacity 0.4s, visibility 0.4s",
        visibility: "hidden",
        opacity: 0,
    },
}));

const TaskView: React.FC<TaskViewProps> = (props) => {
    const { tasks, createTask, updateTask, deleteTask } = TasksContainer.useContainer();
    const [showControls, setShowControls] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const task = tasks.find((t) => t.uuid === props.taskId) ?? ({ title: "" } as ITask);

    const saveTask = (title: string) => {
        task.title = title;

        if (task.uuid) updateTask(task);
        else createTask(task);
    };

    const resolveIcon = () => {
        if (!task.uuid) {
            return (
                <IconButton disabled>
                    <AddIcon />
                </IconButton>
            );
        } else if (task.complete) {
            return (
                <IconButton onClick={() => updateTask({ ...task, complete: false })}>
                    <CheckBoxIcon />
                </IconButton>
            );
        } else {
            return (
                <IconButton onClick={() => updateTask({ ...task, complete: true })}>
                    <CheckBoxOutlineBlankIcon />
                </IconButton>
            );
        }
    };

    const styles = useStyles();

    return (
        <Container className={styles.taskContainer}>
            <TextField
                placeholder={task.uuid === undefined ? "Новая задача" : undefined}
                value={task.title}
                inputRef={inputRef}
                onChange={(event) => {
                    saveTask(event.target.value);
                }}
                fullWidth
                InputProps={{
                    onFocus: () => setShowControls(true),
                    onBlur: () => setShowControls(false),
                    startAdornment: resolveIcon(),
                    endAdornment:
                        task.uuid !== undefined ? (
                            <InputAdornment position="end" className={showControls ? undefined : styles.hidden}>
                                <Link to={routes.root.tasks.edit.build({ taskId: task.uuid })}>
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                                <IconButton onClick={() => deleteTask(task.uuid)}>
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        ) : null,
                    className: task.complete ? styles.completeTaskInput : undefined,
                }}
            />
        </Container>
    );
};

export default TaskView;
