import React, { useState, useEffect } from "react";
import { Container, Box, makeStyles } from "@material-ui/core";
import _ from "lodash";
import TaskView from "../task/TaskView";
import { ITask } from "../../state/data/Task";
import SimpleReadonlyTaskView from "../task/SimpleReadonlyTaskView";
import TasksContainer from "../../state/containers/TasksContainer";
import { ISortMode, TaskSortSettingsView, SortDirection, SortModeType } from "./TaskSortSettingsView";

const useStyles = makeStyles((theme) => ({
    taskList: {
        padding: "0",
        borderLeftWidth: "4px",
        borderLeftStyle: "solid",
        borderLeftColor: theme.palette.grey["200"],
        paddingLeft: "0.5em",
        "&>div": {
            marginBottom: theme.spacing(1),
        },
    },
    title: {
        marginTop: theme.spacing(2),
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.grey["600"],
        fontSize: theme.typography.fontSize,
    },
}));

interface TaskListProps {
    tasks: ITask[];
    allowAdding?: boolean;
    parentTaskId?: string;
    readOnly?: boolean;
    allowCompletion?: boolean;
    allowSorting?: boolean;
    title?: string;
}

const TaskList: React.FC<TaskListProps> = (props) => {
    const { nextIndex } = TasksContainer.useContainer();
    const [expandedTaskId, setExpandedTaskId] = useState<string>();
    const [sortModes, setSortModes] = useState<ISortMode[]>([]);
    const [taskListData, setTaskListData] = useState({
        tasks: props.tasks,
        nextIndex: nextIndex(),
    });

    const styles = useStyles();

    useEffect(() => {
        let tasks = _(props.tasks).orderBy((t) => t.index);

        const resolveDirectionStr = (direction: SortDirection) => (direction === SortDirection.Ascending ? "asc" : "desc");

        sortModes.forEach((m) => {
            switch (m.mode) {
                case SortModeType.Priority:
                    tasks = tasks.orderBy((t) => t.priority, resolveDirectionStr(m.direction));
                    break;
                case SortModeType.Difficulty:
                    tasks = tasks.orderBy((t) => t.difficulty, resolveDirectionStr(m.direction));
                    break;
                case SortModeType.Duration:
                    tasks = tasks.orderBy((t) => t.duration, resolveDirectionStr(m.direction));
                    break;
            }
        });

        setTaskListData({
            tasks: tasks.value(),
            nextIndex: nextIndex(),
        });
    }, [props.tasks, sortModes]);

    return taskListData.tasks.length > 0 || props.allowAdding ? (
        <Container className={styles.taskList}>
            {props.title && <Container className={styles.title}>{props.title}</Container>}
            {props.allowSorting && <TaskSortSettingsView activeSortModes={sortModes} activeSortModesChanged={(newSortModes) => setSortModes(newSortModes)} />}
            <Box>
                {_(props.allowAdding && !props.readOnly ? [...taskListData.tasks, undefined] : taskListData.tasks)
                    .map((task) =>
                        props.readOnly ? (
                            <SimpleReadonlyTaskView taskId={task!.id} key={task!.index} keyIn={task!.index} allowCompletion={props.allowCompletion} />
                        ) : (
                            <TaskView
                                keyIn={task?.index ?? taskListData.nextIndex}
                                key={task?.index ?? taskListData.nextIndex}
                                taskId={task?.id}
                                parentTaskId={props.parentTaskId}
                                isExpanded={expandedTaskId !== undefined && task?.id === expandedTaskId}
                                onToggleExpandedState={() => {
                                    if (expandedTaskId !== task?.id) setExpandedTaskId(task?.id);
                                    else setExpandedTaskId(undefined);
                                }}
                            />
                        )
                    )
                    .value()}
            </Box>
        </Container>
    ) : null;
};

export default TaskList;
