import React from "react";
import PropertyEditorLayout from "./PropertyEditorLayout";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import markdownParser from "../../utils/markdownParser";

interface ITaskDescriptionEditorProps {
    description: string | null;
    onChange: (value: string | null) => void;
}

const DescriptionEditor: React.FC<ITaskDescriptionEditorProps> = (props) => {
    return (
        <PropertyEditorLayout label="Описание">
            <MdEditor style={{ height: "300px" }} value={props.description ?? ""} renderHTML={(md) => markdownParser.render(md)} onChange={(e) => props.onChange(e.text)} />
        </PropertyEditorLayout>
    );
};

export default DescriptionEditor;
