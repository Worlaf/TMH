import React from "react";
import PropertyEditorLayout from "./PropertyEditorLayout";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt({
    linkify: true,
});

interface ITaskDescriptionEditorProps {
    description: string | null;
    onChange: (value: string | null) => void;
}

const TaskDescriptionEditor: React.FC<ITaskDescriptionEditorProps> = (props) => {
    return (
        <PropertyEditorLayout label="Описание">
            <MdEditor style={{ height: "500px" }} value={props.description ?? ""} renderHTML={(md) => mdParser.render(md)} onChange={(e) => props.onChange(e.text)} />
        </PropertyEditorLayout>
    );
};

export default TaskDescriptionEditor;
