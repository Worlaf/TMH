import React, { useState } from "react";
import { Container, Box, makeStyles } from "@material-ui/core";
import _ from "lodash";
import TaskView from "./TaskView";
import { ITask } from "../../state/data/task";

const useStyles = makeStyles((theme) => ({
    taskList: {
        "&>div": {
            marginBottom: theme.spacing(1),
        },
    },
}));

interface TaskListProps {
    tasks: ITask[];
    onEditTask: (task: ITask) => void;
    onAddChildTask: (task: ITask) => void;
    onCompleteStateChanged: (task: ITask, complete: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = (props) => {
    const [expandedTaskId, setExpandedTaskId] = useState<string>();
    const classes = useStyles();

    return (
        <Container className={classes.taskList}>
            <Box>
                {_(props.tasks)
                    .orderBy((t) => t.order)
                    .filter((t) => t.parentUuid === undefined)
                    .map((t) => (
                        <TaskView
                            key={t.uuid}
                            task={t}
                            isExpanded={t.uuid === expandedTaskId}
                            children={props.tasks.filter((tt) => tt.parentUuid === t.uuid)}
                            onCompleteStateChanged={(complete) => props.onCompleteStateChanged(t, complete)}
                            onToggleExpandedState={() => {
                                if (expandedTaskId !== t.uuid) setExpandedTaskId(t.uuid);
                                else setExpandedTaskId(undefined);
                            }}
                            onEdit={() => {
                                props.onEditTask(t);
                            }}
                            onAddChild={() => {
                                props.onAddChildTask(t);
                            }}
                        />
                    ))
                    .value()}
            </Box>
        </Container>
    );
};

export default TaskList;
