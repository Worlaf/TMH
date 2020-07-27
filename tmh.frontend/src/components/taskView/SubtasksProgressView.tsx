import React from "react";
import { ITask } from "../../state/data/task";
import { Box } from "@material-ui/core";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faTasks);

export default function SubtasksProgressView(props: { children: ITask[] }) {
    const taskCount = props.children.length;
    const completeTaskCount = props.children.filter((c) => c.complete).length;

    return (
        <Box>
            <FontAwesomeIcon icon="tasks" />
            {` ${completeTaskCount}/${taskCount}`}
        </Box>
    );
}
