import React, { useState, useEffect, useCallback } from "react";
import { ITask } from "../../state/data/Task";
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
import Tags from "../Tags";
import _ from "lodash";

interface TaskViewProps {
    isExpanded: boolean;
    task?: ITask;
    parentTaskId?: string;
    onToggleExpandedState?: () => void;
    renderCustomIcon?: (task: ITask) => React.ReactNode;
    allowDelete?: boolean;
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
    taskTagsContainer: {
        marginLeft: "30px",
    },
    taskPropsContainer: {
        marginLeft: "30px",
        display: "grid",
        gridTemplateColumns: "max-content auto",
        justifyItems: "right",
    },
    taskMainPropsContainer: {
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "16px max-content",
        gridColumnGap: "0.5rem",
        width: "250px max-content",
        alignItems: "center",
    },
    taskDetailsContainer: {
        height: "auto",
    },
    taskDescription: {
        padding: "1em",
        marginBottom: "1em",
    },
}));

// todo: add create task view; debounce task updates
const TaskView: React.FC<TaskViewProps> = (props) => {
    const classes = useStyles();

    return (
        <Container className={classNames(classes.taskContainer, { [classes.completeTaskContainer]: props.task && props.task.complete })}>
            {props.task !== undefined ? <TaskHeader renderCustomIcon={props.renderCustomIcon} task={props.task} allowDelete={props.allowDelete} /> : <NewTaskHeader />}
            {props.task && <TaskSummary isExpanded={props.isExpanded} task={props.task} onToggleExpandedState={props.onToggleExpandedState} />}
        </Container>
    );
};

export default TaskView;

function TaskSummary(props: { task: ITask; onToggleExpandedState?: () => void; isExpanded: boolean }) {
    const { entities: tasks } = TasksContainer.useContainer();
    const classes = useStyles();
    const children = tasks.filter((t) => t.parentId === props.task.id);

    return (
        <>
            <Box className={classes.taskTagsContainer}>
                <Tags tagIds={props.task.tagIds} />
            </Box>
            <Box className={classes.taskPropsContainer}>
                <Box className={classes.taskMainPropsContainer}>
                    <PriorityView priority={props.task.priority} />
                    {props.task.difficulty && <DifficultyView difficulty={props.task.difficulty} />}
                    {props.task.duration && <DurationView duration={props.task.duration} />}
                    {children && children.length > 0 ? <SubtasksProgressView children={children} /> : null}
                </Box>
                {props.onToggleExpandedState !== undefined && (props.task.description || (children && children.length > 0)) ? (
                    <IconButton size="small" onClick={() => props.onToggleExpandedState!()}>
                        {props.isExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </IconButton>
                ) : null}
            </Box>
            {props.isExpanded && (
                <Container className={classes.taskDetailsContainer}>
                    {props.task.description && (
                        <Paper className={classes.taskDescription} elevation={2}>
                            <div dangerouslySetInnerHTML={{ __html: markdownParser.render(props.task.description) }}></div>
                        </Paper>
                    )}
                    {children && children.length > 0 ? <TaskList readOnly parentTaskId={props.task.id} tasks={children} allowCompletion /> : null}
                </Container>
            )}
        </>
    );
}

function TaskHeader(props: { task: ITask; renderCustomIcon?: (task: ITask) => React.ReactNode; allowDelete?: boolean }) {
    const classes = useStyles();
    const taskRepository = TasksContainer.useContainer();
    const [title, setTitle] = useState<string>(props.task.title);

    const debouncedUpdateTitle = useCallback(
        _.debounce((title: string) => {
            taskRepository.save({ ...props.task, title: title });
        }, 200),
        [taskRepository]
    );

    useEffect(() => {
        if (title !== props.task.title) {
            debouncedUpdateTitle(title);
        }
    }, [title]);

    const resolveIcon = () => {
        if (props.renderCustomIcon) return props.renderCustomIcon(props.task);
        else if (props.task.complete) {
            return (
                <IconButton size="small" onClick={() => taskRepository.save({ ...props.task, complete: false })}>
                    <CheckBoxIcon />
                </IconButton>
            );
        } else {
            return (
                <IconButton size="small" onClick={() => taskRepository.save({ ...props.task, complete: true })}>
                    <CheckBoxOutlineBlankIcon />
                </IconButton>
            );
        }
    };

    return (
        <Box className={classes.taskSummaryContainer}>
            {resolveIcon()}
            <TaskTitle title={title} isTaskComplete={props.task.complete} onChange={setTitle} onEnterKeyPress={() => debouncedUpdateTitle(title)} />
            {props.task !== undefined && (
                <>
                    <Link to={routes.root.tasks.edit.build({ taskId: props.task.id })}>
                        <IconButton size="small">
                            <EditIcon />
                        </IconButton>
                    </Link>
                    {props.allowDelete && (
                        <>
                            <Divider orientation="vertical" className={classes.taskSummaryDivider} />
                            <IconButton size="small" onClick={() => taskRepository.remove(props.task.id)}>
                                <ClearIcon />
                            </IconButton>
                        </>
                    )}
                </>
            )}
        </Box>
    );
}

function NewTaskHeader() {
    const classes = useStyles();
    const taskRepository = TasksContainer.useContainer();
    const [title, setTitle] = useState<string>("");

    const createTask = () => {
        taskRepository.create({ title: title });
    };

    return (
        <Box className={classes.taskSummaryContainer}>
            <IconButton size="small" onClick={createTask}>
                <AddIcon />
            </IconButton>
            <TaskTitle title={title} textInputPlaceholder={"Новая задача"} onEnterKeyPress={createTask} onChange={(title) => setTitle(title)} isTaskComplete={false} />
        </Box>
    );
}

function TaskTitle(props: { title: string; textInputPlaceholder?: string; isTaskComplete: boolean; onChange?: (title: string) => void; onEnterKeyPress?: () => void }) {
    const classes = useStyles();

    return (
        <InputBase
            className={classNames(classes.taskTitleInput, { [classes.completeTaskTitleInput]: props.isTaskComplete })}
            placeholder={props.textInputPlaceholder}
            value={props.title}
            onChange={(event) => {
                if (props.onChange) props.onChange(event.target.value);
            }}
            onKeyPress={(event) => {
                if (event.key === "Enter") {
                    if (props.onEnterKeyPress) props.onEnterKeyPress();
                }
            }}
        />
    );
}
