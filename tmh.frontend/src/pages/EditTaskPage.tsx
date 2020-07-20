import React from "react";
import { useParams } from "react-router-dom";
import EditTaskView from "../components/editTaskView/EditTaskView";
import BreadCrumbs from "../components/breadCrumb/BreadCrumbs";
import routes from "../utils/routes";
import TasksContainer from "../state/containers/TasksContainer";
import { Typography } from "@material-ui/core";

const EditTaskPage: React.FC = () => {
    const routeParams = useParams<{ taskId: string }>();
    const task = TasksContainer.useContainer().getTask(routeParams.taskId);
    const route = routes.root.tasks.edit;

    return (
        <>
            <BreadCrumbs route={route} customRouteBreadCrumbs={{ [route.key]: <Typography>{task!.title}</Typography> }} routeData={routeParams} />
            <EditTaskView taskId={routeParams.taskId} />
        </>
    );
};

export default EditTaskPage;
