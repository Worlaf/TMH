import React from "react";
import { getPriorityColor, Priority } from "../../state/data/Task";
import { Box } from "@material-ui/core";
import PriorityIcon from "../PriorityIcon";

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
