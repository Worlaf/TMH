import React, { useState } from "react";
import { ITask } from "../../state/data/task";
import { Box, Typography, makeStyles, Theme, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanel, Grid, Checkbox, TextField, Button, Paper, FormControl, FormControlLabel, InputLabel, InputBase } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { resolveDurationRu } from "../../utils/lang/resolveDurationRu";
import CommentIcon from "@material-ui/icons/Comment";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Rating from "@material-ui/lab/Rating";
import { useForm, Controller } from "react-hook-form";
import nameof from "ts-nameof.macro";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import CheckCircleTwoToneIcon from "@material-ui/icons/CheckCircleTwoTone";

interface TaskViewProps {
    isInEditMode: boolean;
    isExpanded: boolean;
    task: ITask;
    onToggleExpandedState: () => void;
    onToggleInEditMode: (edit: boolean) => void;
    onSave: (task: ITask) => void;
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
    const { register, handleSubmit, control } = useForm<ITask>();
    const classes = useStyles();
    
    if (props.isInEditMode) {
        return (
            <form
                className={classes.taskRootForm}
                onSubmit={handleSubmit((task) => {
                    console.log(task);
                    props.onSave({ ...props.task, title: task.title, description: task.description, duration: task.duration, difficulty: task.difficulty });
                })}
            >
                <ExpansionPanel expanded={props.isExpanded}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} onClick={props.onToggleExpandedState}>
                        <div className={classes.taskSummaryColumn}>
                            <CheckCircleTwoToneIcon fontSize="large" />
                            <TextField name={nameof(props.task.title)} fullWidth label="Название" inputRef={register} defaultValue={props.task.title} />
                            <TextField
                                label={
                                    <div className={classes.labelWithIconContainer}>
                                        <AccessTimeIcon fontSize="small" color="secondary" />
                                        <span>Длительность, мин.</span>
                                    </div>
                                }
                                type="number"
                                name={nameof(props.task.duration)}
                                inputRef={register}
                                defaultValue={props.task.duration}
                                fullWidth
                            />
                            <FormControl>
                                <InputLabel shrink={true}>Сложность</InputLabel>
                                <div style={{ position: "relative", marginTop: "16px", height: "32px" }}>
                                    <Controller as={Rating} name={nameof(props.task.difficulty)} defaultValue={props.task.difficulty} control={control} icon={<EmojiObjectsIcon />} />
                                </div>
                            </FormControl>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Box style={{ width: "100%" }}>
                            <Box>
                                <TextField
                                    label={
                                        <div className={classes.labelWithIconContainer}>
                                            <CommentIcon fontSize="small" color="secondary" />
                                            <span>Описание</span>
                                        </div>
                                    }
                                    name={nameof(props.task.description)}
                                    multiline
                                    inputRef={register}
                                    defaultValue={props.task.description}
                                    fullWidth
                                />
                            </Box>

                            <Button type="submit" variant="contained" color="primary">
                                Сохранить
                            </Button>
                        </Box>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </form>
        );
    } else {
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
                                props.onSave({ ...props.task, complete: e.target.checked });
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
                        <Button
                            type="button"
                            variant="contained"
                            onClick={(e) => {
                                e.preventDefault();
                                props.onToggleInEditMode(true);
                            }}
                        >
                            Edit
                        </Button>
                    </Box>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
};

export default TaskView;
