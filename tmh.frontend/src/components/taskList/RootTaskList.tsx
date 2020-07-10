import React, { useState } from "react";
import TasksContainer from "../../state/containers/TasksContainer";
import { Container, Button, Box, makeStyles } from "@material-ui/core";
import _ from "lodash";
import EditTaskDialog from "./EditTaskDialog";
import { ITask } from "../../state/data/task";
import TaskList from "./TaskList";

const useStyles = makeStyles((theme) => ({
    taskList: {
        "&>div": {
            marginBottom: theme.spacing(1),
        },
    },
}));

// todo: create context to share task editing and adding subtasks

const RootTaskList: React.FC = () => {
    const { tasks, createTask, updateTask } = TasksContainer.useContainer();
    const [newTask, setNewTask] = useState<ITask>();
    const [taskInEditModeId, setTaskInEditModeId] = useState<string>();
    const classes = useStyles();

    const hasEmptyTask = newTask !== undefined;

    return (
        <Container className={classes.taskList}>
            <Box>
                <Button
                    disabled={newTask !== undefined}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setNewTask({ title: "", description: "", uuid: "", order: tasks.length, duration: null, difficulty: null, complete: false, parentUuid: undefined });
                        // setExpandedTaskId(undefined);
                        setTaskInEditModeId(undefined);
                    }}
                >
                    Добавить задачу
                </Button>
            </Box>
            <EditTaskDialog
                isOpen={newTask !== undefined || taskInEditModeId !== undefined}
                onClose={() => {
                    if (newTask !== undefined) {
                        setNewTask(undefined);
                    } else {
                        setTaskInEditModeId(undefined);
                    }
                }}
                onSave={(task) => {
                    if (newTask !== undefined) {
                        createTask(task);
                        setNewTask(undefined);
                    } else {
                        updateTask(task);
                        setTaskInEditModeId(undefined);
                    }
                }}
                task={(taskInEditModeId !== undefined && tasks.find((t) => t.uuid === taskInEditModeId)) || newTask!}
            />
            <TaskList
                tasks={_(tasks)
                    .filter((t) => t.parentUuid === undefined)
                    .value()}
                onAddChildTask={(parent) => {
                    if (!hasEmptyTask) setNewTask({ title: "", description: "", uuid: "", order: tasks.length, duration: null, difficulty: null, complete: false, parentUuid: parent.uuid });
                }}
                onCompleteStateChanged={(task, complete) => updateTask({ ...task, complete: complete })}
                onEditTask={(task) => {
                    if (!hasEmptyTask) setTaskInEditModeId(task.uuid);
                }}
            />
        </Container>
    );
};

export default RootTaskList;
