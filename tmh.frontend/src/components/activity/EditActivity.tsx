import React, { useState } from "react";
import { TextField, Container, Box, Button, Typography, IconButton } from "@material-ui/core";
import ActivityContainer from "../../state/containers/ActivityContainer";
import { IActivity } from "../../state/data/Activity";
import DescriptionEditor from "../commonPropertyEditors/DescriptionEditor";
import TagsEditor from "../commonPropertyEditors/TagsEditor";
import _ from "lodash";
import PropertyEditorLayout from "../commonPropertyEditors/PropertyEditorLayout";
import TaskList from "../taskList/TaskList";
import TasksContainer from "../../state/containers/TasksContainer";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import TaskView from "../task/TaskView";

function TaskSelector(props: { onTaskSelected: (taskId: string) => void }) {
    const taskRepository = TasksContainer.useContainer();

    return (
        <TaskList
            tasks={taskRepository.entities.filter((t) => t.parentId === null && !t.complete)}
            renderTaskCustomIcon={(task) => (
                <IconButton onClick={() => props.onTaskSelected(task.id)}>
                    <CheckCircleIcon />
                </IconButton>
            )}
        />
    );
}

export default function EditActivity(props: { activityId: string | undefined; onClose: () => void }) {
    const activityRepository = ActivityContainer.useContainer();
    const taskRepository = TasksContainer.useContainer();
    const [showTaskSelector, setShowTaskSelector] = useState<boolean>(false);
    const [activity, setActivity] = useState<Omit<IActivity, "id"> & { id?: string }>(
        props.activityId !== undefined
            ? activityRepository.get(props.activityId)
            : {
                  description: null,
                  id: undefined,
                  isMandatory: false,
                  label: "New Activity",
                  tagIds: [],
                  taskId: null,
              }
    );

    const isChanged = props.activityId === undefined || !_.isEqual(activityRepository.get(props.activityId), activity);

    if (showTaskSelector) {
        return (
            <Container>
                <Typography variant="h5">Выбрать задачу для "{activity.label}"</Typography>
                <Box>
                    <Button variant="outlined" color="secondary" onClick={() => setShowTaskSelector(false)}>
                        Отмена
                    </Button>
                </Box>
                <TaskSelector
                    onTaskSelected={(taskId) => {
                        setShowTaskSelector(false);
                        setActivity({ ...activity, taskId: taskId });
                    }}
                />
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h5">{props.activityId === undefined ? "Создание занятия" : "Редактирование занятия"}</Typography>
            <PropertyEditorLayout label="Связанная задача">
                {activity.taskId === null ? (
                    <Button variant="contained" color="secondary" onClick={() => setShowTaskSelector(true)}>
                        Выбрать
                    </Button>
                ) : (
                    <TaskView task={taskRepository.safeGet(activity.taskId)} isExpanded={true} />
                )}
            </PropertyEditorLayout>

            {activity.taskId === null && (
                <>
                    <TextField fullWidth size="medium" value={activity.label} onChange={(event) => setActivity({ ...activity, label: event.target.value })} />
                    <DescriptionEditor description={activity.description} onChange={(description) => setActivity({ ...activity, description: description })} />
                    <TagsEditor tagIds={activity.tagIds} onChange={(tagIds) => setActivity({ ...activity, tagIds: tagIds })} />
                </>
            )}

            <hr />
            <Box paddingTop="1em" display="grid" gridAutoFlow="column" gridColumnGap="1em" gridTemplateColumns="min-content">
                <Button variant="outlined" color="secondary" onClick={props.onClose}>
                    Назад
                </Button>
                {isChanged && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            activityRepository.save(activity);
                            props.onClose();
                        }}
                    >
                        Сохранить и закрыть
                    </Button>
                )}
            </Box>
        </Container>
    );
}
