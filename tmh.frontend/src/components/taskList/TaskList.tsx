import React, { useState } from "react";
import { Container, Box, makeStyles } from "@material-ui/core";
import _ from "lodash";
import TaskView from "../taskView/TaskView";
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
    allowAdding: boolean;
}

const TaskList: React.FC<TaskListProps> = (props) => {
    const [expandedTaskId, setExpandedTaskId] = useState<string>();
    const classes = useStyles();
    const orderedTaskIds = _(props.tasks)
        .orderBy((t) => t.order)
        .map((t) => t.id)
        .value();

    return (
        <Container className={classes.taskList}>
            <Box>
                {_(props.allowAdding ? [...orderedTaskIds, undefined] : orderedTaskIds)
                    .map((tid, index) => (
                        <TaskView
                            key={index}
                            taskId={tid}
                            isExpanded={tid === expandedTaskId}
                            onToggleExpandedState={() => {
                                if (expandedTaskId !== tid) setExpandedTaskId(tid);
                                else setExpandedTaskId(undefined);
                            }}
                        />
                    ))
                    .value()}
            </Box>
        </Container>
    );
};

export default TaskList;
