import React from "react";
import { ITask } from "../../state/data/task";
import { Container, makeStyles, IconButton, Box, InputBase, Divider, Paper } from "@material-ui/core";
import TasksContainer from "../../state/containers/TasksContainer";
import AddIcon from "@material-ui/icons/Add";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Link } from "react-router-dom";
import routes from "../../utils/routes";
import PriorityView from "./PriorityView";
import DifficultyView from "./DifficultyView";
import DurationView from "./DurationView";
import classNames from "classnames";
import markdownParser from "../../utils/markdownParser";
import TaskList from "../taskList/TaskList";
import SubtasksProgressView from "./SubtasksProgressView";

interface TaskViewProps {
    isExpanded: boolean;
    taskId?: string;
    parentTaskId?: string;
    onToggleExpandedState: () => void;
    keyIn: string | number;
}

const useStyles = makeStyles((theme) => ({
    taskContainer: {
        borderRadius: theme.shape.borderRadius,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: theme.palette.grey["400"],
        padding: "0",
        marginTop: "1em",
    },
    completeTaskContainer: {
        backgroundColor: theme.palette.grey["200"],
    },
    taskTitleInput: {
        flex: "1",
        "&>input": {
            marginBottom: "1px",
        },
        "&>input:focus": {
            marginBottom: "0",
            borderBottom: "1px solid",
            borderBottomColor: theme.palette.grey["400"],
        },
    },
    completeTaskTitleInput: {
        "&>input": {
            marginBottom: "1px",
            color: theme.palette.grey["500"],
            textDecorationLine: "line-through",
        },
    },
    taskSummaryDivider: {
        height: "20px",
    },
    taskSummaryContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: "0.5em",
    },
    taskSecondLine: {
        marginLeft: "30px",
        display: "grid",
        gridTemplateColumns: "max-content auto",
        justifyItems: "right",
    },
    taskPropsContainer: {
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "16px max-content",
        gridColumnGap: "0.5rem",
        width: "250px max-content",
        alignItems: "center",
    },
    taskCollapsedDetailsContainer: {
        height: "0",
        display: "none",
    },
    taskExpandedDetailsContainer: {
        height: "auto",
    },
    taskDescription: {
        padding: "1em",
        marginBottom: "1em",
    },
}));

const TaskView: React.FC<TaskViewProps> = (props) => {
    const { tasks, createTask, updateTask, deleteTask, getTask } = TasksContainer.useContainer();
    const task = (props.taskId && getTask(props.taskId)) || ({ title: "", parentId: props.parentTaskId } as ITask);
    const isNewTask = task.id === undefined;
    const children = isNewTask ? undefined : tasks.filter((t) => t.parentId === task.id);

    const saveTask = (title: string) => {
        task.title = title;

        if (task.id) updateTask(task);
        else createTask(task);
    };

    const resolveIcon = () => {
        if (!task.id) {
            return (
                <IconButton size="small" disabled>
                    <AddIcon />
                </IconButton>
            );
        } else if (task.complete) {
            return (
                <IconButton size="small" onClick={() => updateTask({ ...task, complete: false })}>
                    <CheckBoxIcon />
                </IconButton>
            );
        } else {
            return (
                <IconButton size="small" onClick={() => updateTask({ ...task, complete: true })}>
                    <CheckBoxOutlineBlankIcon />
                </IconButton>
            );
        }
    };

    const styles = useStyles();

    return (
        <Container className={classNames(styles.taskContainer, { [styles.completeTaskContainer]: task.complete })}>
            <Box className={styles.taskSummaryContainer}>
                {resolveIcon()}
                <InputBase
                    className={classNames(styles.taskTitleInput, { [styles.completeTaskTitleInput]: task.complete })}
                    placeholder={isNewTask ? "Новая задача" : undefined}
                    value={task.title}
                    onChange={(event) => {
                        saveTask(event.target.value);
                    }}
                />
                {!isNewTask && (
                    <>
                        <Link to={routes.root.tasks.edit.build({ taskId: task.id })}>
                            <IconButton size="small">
                                <EditIcon />
                            </IconButton>
                        </Link>
                        <Divider orientation="vertical" className={styles.taskSummaryDivider} />
                        <IconButton size="small" onClick={() => deleteTask(task.id)}>
                            <ClearIcon />
                        </IconButton>
                    </>
                )}
            </Box>

            {!isNewTask && (
                <Box className={styles.taskSecondLine}>
                    <Box className={styles.taskPropsContainer}>
                        <PriorityView priority={task.priority} />
                        {task.difficulty && <DifficultyView difficulty={task.difficulty} />}
                        {task.duration && <DurationView duration={task.duration} />}
                        {children && children.length > 0 ? <SubtasksProgressView children={children} /> : null}
                    </Box>
                    {task.description || (children && children.length > 0) ? (
                        <IconButton size="small" onClick={() => props.onToggleExpandedState()}>
                            {props.isExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                        </IconButton>
                    ) : null}
                </Box>
            )}
            <Container className={classNames({ [styles.taskExpandedDetailsContainer]: props.isExpanded }, { [styles.taskCollapsedDetailsContainer]: !props.isExpanded })}>
                {task.description && (
                    <Paper className={styles.taskDescription} elevation={2}>
                        <div dangerouslySetInnerHTML={{ __html: markdownParser.render(task.description) }}></div>
                    </Paper>
                )}
                {children && children.length > 0 ? <TaskList readOnly parentTaskId={task!.id} tasks={children} allowCompletion /> : null}
            </Container>
        </Container>
    );
};

export default TaskView;
