import React from "react";
import TasksContainer from "../../state/containers/TasksContainer";
import { Container, TextField, makeStyles } from "@material-ui/core";
import TaskDifficultyEditor from "./TaskDifficultyEditor";
import TaskPriorityEditor from "./TaskPriorityEditor";
import TaskDurationEditor from "./TaskDurationEditor";
import TaskDescriptionEditor from "./TaskDescriptionEditor";
import PropertyEditorLayout from "./PropertyEditorLayout";
import TaskList from "../taskList/TaskList";
import TaskTagsEditor from "./TaskTagsEditor";

const useStyles = makeStyles((theme) => ({
    taskTitleInput: {
        "& input": {
            fontSize: theme.typography.h6.fontSize,
        },
    },
}));

interface IEditTaskViewProps {
    taskId: string;
}

const EditTaskView: React.FC<IEditTaskViewProps> = (props) => {
    const { tasks, updateTask } = TasksContainer.useContainer();
    const task = tasks.find((t) => t.id === props.taskId);

    const styles = useStyles();

    if (task)
        return (
            <Container>
                <TextField className={styles.taskTitleInput} fullWidth size="medium" value={task.title} onChange={(event) => updateTask({ ...task, title: event.target.value })} />
                <TaskDifficultyEditor difficulty={task.difficulty} onChange={(value) => updateTask({ ...task, difficulty: value })} />
                <TaskPriorityEditor priority={task.priority} onChange={(value) => updateTask({ ...task, priority: value })} />
                <TaskDurationEditor duration={task.duration} onChange={(value) => updateTask({ ...task, duration: value })} />
                <TaskTagsEditor tagIds={task.tagIds} onChange={(value) => updateTask({ ...task, tagIds: value })} />
                {task.parentId === null ? (
                    <PropertyEditorLayout label="Подзадачи">
                        <TaskList parentTaskId={task.id} tasks={tasks.filter((t) => t.parentId === task.id)} allowAdding={true} />
                    </PropertyEditorLayout>
                ) : null}
                <TaskDescriptionEditor description={task.description} onChange={(value) => updateTask({ ...task, description: value })} />
            </Container>
        );
    else throw Error(`Не удалось найти задачу с указанным идентификатором: '${props.taskId}'.`);
};

export default EditTaskView;
