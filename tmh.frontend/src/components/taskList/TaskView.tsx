import React from "react";
import { ITask } from "../../state/data/task";
import { Box, Typography, makeStyles, Theme, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanel, Grid, Checkbox, Button, Paper } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { resolveDurationRu } from "../../utils/lang/resolveDurationRu";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Rating from "@material-ui/lab/Rating";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import TaskList from "./TaskList";

interface TaskViewProps {
    isExpanded: boolean;
    task: ITask;
    children: ITask[];
    onToggleExpandedState: () => void;
    onEdit: (task: ITask) => void;
    onAddChild: () => void;
    onCompleteStateChanged: (complete: boolean) => void;
    canAddChild: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    taskView: {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: theme.palette.grey[200],
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        bxoShadow: theme.shadows[2],
    },
    taskSummaryColumn: {
        flexBasis: "90%",
        display: "grid",
        gridTemplateColumns: "max-content 30%",
        gridTemplateRows: "max-content",
        gridAutoFlow: "column",
        gridAutoColumns: "20%",
        alignItems: "center",
        gridColumnGap: theme.spacing(1),
    },
    labelWithIconContainer: {
        display: "grid",
        gridTemplateColumns: "auto auto",
        gridColumnGap: theme.spacing(1),
        alignItems: "center",
    },
    description: {
        backgroundColor: theme.palette.grey[100],
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
    },
    ratingField: {
        display: "inline-flex",
        flexDirection: "column",
        "& > label": {
            position: "absolute",
            top: 0,
            left: 0,
            display: "block",
            fontSize: "1rem",
        },
    },
    taskRootForm: {
        marginBottom: theme.spacing(1),
    },
}));

const TaskView: React.FC<TaskViewProps> = (props) => {
    const classes = useStyles();

    return (
        <ExpansionPanel expanded={props.isExpanded}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} onClick={props.onToggleExpandedState}>
                <div className={classes.taskSummaryColumn}>
                    <Checkbox
                        value={props.task.complete}
                        onClick={(e) => e.stopPropagation()}
                        onFocus={(e) => e.stopPropagation()}
                        onChange={(e) => {
                            e.stopPropagation();
                            props.onCompleteStateChanged(e.target.checked);
                        }}
                    />
                    <Typography>{props.task.title || "New Task"}</Typography>
                    {props.task.duration && (
                        <Grid container>
                            <AccessTimeIcon />
                            {resolveDurationRu(props.task.duration)}
                        </Grid>
                    )}
                    {props.task.difficulty && <Rating value={props.task.difficulty} icon={<EmojiObjectsIcon />} readOnly />}
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Box style={{ width: "100%" }}>
                    <Box>
                        <Paper elevation={0} variant="outlined" className={classes.description}>
                            {props.task.description}
                        </Paper>
                    </Box>
                    <Box>
                        <TaskList tasks={props.task} onEditTask={} />
                    </Box>
                    <Button type="button" variant="contained" onClick={props.onEdit}>
                        Редактировать
                    </Button>
                    <Button type="button" variant="contained" onClick={props.onAddChild}>
                        Добавить подзадачу
                    </Button>
                </Box>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default TaskView;
