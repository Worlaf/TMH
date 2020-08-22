import React from "react";
import PropertyEditorLayout from "../commonPropertyEditors/PropertyEditorLayout";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import Rating from "@material-ui/lab/Rating";

interface ITaskDifficultyEditorProps {
    difficulty: number | null;
    onChange: (value: number | null) => void;
}

const TaskDifficultyEditor: React.FC<ITaskDifficultyEditorProps> = (props) => {
    return (
        <PropertyEditorLayout label="Сложность">
            <Rating size="large" name="taskDifficulty" icon={<EmojiObjectsIcon fontSize="large" />} value={props.difficulty} onChange={(_, value) => props.onChange(value)} />
        </PropertyEditorLayout>
    );
};

export default TaskDifficultyEditor;
