import React from "react";
import { getPriorityColor, Priority } from "../../state/data/task";
import { Box } from "@material-ui/core";
import PriorityIcon from "../priorityIcon";

interface IPriorityViewProps {
    priority: Priority;
}

const PriorityView: React.FC<IPriorityViewProps> = (props) => {
    return (
        <Box color={getPriorityColor(props.priority)}>
            <PriorityIcon priority={props.priority} />
        </Box>
    );
};

export default PriorityView;
