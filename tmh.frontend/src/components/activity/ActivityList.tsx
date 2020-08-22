import React, { useState } from "react";
import EditActivity from "./EditActivity";
import { Container, Button, makeStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Box, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ActivityContainer from "../../state/containers/ActivityContainer";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import markdownParser from "../../utils/markdownParser";
import EditIcon from "@material-ui/icons/Edit";
import Tags from "../Tags";
import TasksContainer from "../../state/containers/TasksContainer";
import TaskView from "../task/TaskView";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },
    activityHeader: {
        display: "flex",
        justifyContent: "space-between",
        justifySelf: "stretch",
        flexGrow: 1,
        alignItems: "center",
    },
    tags: {
        maxWidth: "250px",
    },
}));

export default function ActivityList() {
    const activityRepository = ActivityContainer.useContainer();
    const taskRepository = TasksContainer.useContainer();
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [activityToEditId, setActivityToEditId] = useState<string>();
    const [expanded, setExpanded] = useState<string>();

    const toggleExpandedActivity = (activityId: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => setExpanded(isExpanded ? activityId : undefined);
    const toggleEditMode = (edit: boolean, activityId: string | undefined = undefined) => {
        setIsInEditMode(edit);
        setActivityToEditId(activityId);
    };

    const classes = useStyles();

    if (isInEditMode)
        return (
            <EditActivity
                activityId={activityToEditId}
                onClose={() => {
                    setIsInEditMode(false);
                    setActivityToEditId(undefined);
                }}
            />
        );
    else {
        return (
            <>
                <Container className={classes.root}>
                    <Box marginBottom="1em">
                        {activityRepository.entities.map((a) => {
                            const task = a.taskId !== null ? taskRepository.safeGet(a.taskId) : undefined;

                            return (
                                <ExpansionPanel key={a.id} expanded={expanded === a.id} onChange={toggleExpandedActivity(a.id)}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Box className={classes.activityHeader}>
                                            <Box component="span">{task !== undefined ? `${task.title} [Задача]` : a.label}</Box>
                                            <Tags tagIds={task !== undefined ? task.tagIds : a.tagIds} className={classes.tags} />
                                            <IconButton size="small" onClick={() => toggleEditMode(true, a.id)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Box>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        {task !== undefined ? (
                                            <TaskView task={task} isExpanded={true} />
                                        ) : (
                                            <div dangerouslySetInnerHTML={{ __html: markdownParser.render(a.description ?? "") }}></div>
                                        )}
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            );
                        })}
                    </Box>
                    <Button variant="outlined" color="primary" onClick={() => toggleEditMode(true, undefined)}>
                        <AddIcon />
                        Добавить занятие
                    </Button>
                </Container>
            </>
        );
    }
}
