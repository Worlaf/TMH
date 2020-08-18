import React from "react";
import { Priority, getPriorityColor, getPriorityLabel } from "../state/data/Task";
import { faAngleDoubleDown, faAngleDown, faMinus, faAngleUp, faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faAngleDoubleDown, faAngleDown, faMinus, faAngleUp, faAngleDoubleUp);

export default function PriorityIcon(props: { priority: Priority }) {
    const color = getPriorityColor(props.priority);
    const title = "Приоритет: " + getPriorityLabel(props.priority).toLowerCase();
    switch (props.priority) {
        case -2:
            return <FontAwesomeIcon icon="angle-double-down" color={color} title={title} />;
        case -1:
            return <FontAwesomeIcon icon="angle-down" color={color} title={title} />;
        case 0:
            return <FontAwesomeIcon icon="minus" color={color} title={title} />;
        case 1:
            return <FontAwesomeIcon icon="angle-up" color={color} title={title} />;
        case 2:
            return <FontAwesomeIcon icon="angle-double-up" color={color} title={title} />;
        default:
            throw Error(`Не поддерживаемый приоритет: ${props.priority}`);
    }
}
