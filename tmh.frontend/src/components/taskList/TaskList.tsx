import React, { useState } from "react";
import TasksContainer from "../../state/containers/TasksContainer";
import { Container, Button, Box, makeStyles } from "@material-ui/core";
import _ from "lodash";
import TaskView from "./TaskView";

const useStyles = makeStyles((theme) => ({
    taskList: {
        "&>div": {
            marginBottom: theme.spacing(1),
        },
    },
}));

const TaskList: React.FC = () => {
    const { tasks, createTask, updateTask } = TasksContainer.useContainer();
    const [hasEmptyTask, setHasEmptyTask] = useState(false);
    const [expandedTaskId, setExpandedTaskId] = useState<string>();
    const [taskInEditModeId, setTaskInEditModeId] = useState<string>();
    const classes = useStyles();

    return (
        <Container className={classes.taskList}>
            <Box>
                <Button
                    disabled={hasEmptyTask}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setHasEmptyTask(true);
                        setExpandedTaskId(undefined);
                        setTaskInEditModeId(undefined);
                    }}
                >
                    Добавить задачу
                </Button>
            </Box>
            <Box>
                {hasEmptyTask ? (
                    <TaskView
                        task={{ title: "", description: "", children: [], uuid: "", order: tasks.length, duration: null, difficulty: null, complete: false }}
                        isExpanded={true}
                        isInEditMode={true}
                        onSave={(task) => {
                            setHasEmptyTask(false);
                            createTask(task);
                        }}
                        onToggleExpandedState={() => {}}
                        onToggleInEditMode={() => {}}
                    />
                ) : null}
                {_(tasks)
                    .orderBy((t) => t.order)
                    .map((t) => (
                        <TaskView
                            key={t.uuid}
                            task={t}
                            isExpanded={t.uuid === expandedTaskId}
                            isInEditMode={t.uuid === taskInEditModeId}
                            onSave={(task) => {
                                updateTask(task);
                                setTaskInEditModeId(undefined);
                            }}
                            onToggleExpandedState={() => {
                                if (!hasEmptyTask) {
                                    if (expandedTaskId !== t.uuid) setExpandedTaskId(t.uuid);
                                    else setExpandedTaskId(undefined);
                                }
                            }}
                            onToggleInEditMode={(edit) => {
                                if (!hasEmptyTask && edit) setTaskInEditModeId(t.uuid);
                            }}
                        />
                    ))
                    .value()}
            </Box>
        </Container>
    );
};

export default TaskList;
