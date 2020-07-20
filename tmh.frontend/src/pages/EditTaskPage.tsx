import React from "react";
import { useParams } from "react-router-dom";
import EditTaskView from "../components/editTaskView/EditTaskView";

const EditTaskPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return <EditTaskView taskId={id} />;
};

export default EditTaskPage;
