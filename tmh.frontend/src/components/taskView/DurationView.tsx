import React from "react";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Box } from "@material-ui/core";
import { resolveDurationRu } from "../../utils/lang/resolveDurationRu";

library.add(faStopwatch);

export default function DurationView(props: { duration: number }) {
    return (
        <Box>
            <FontAwesomeIcon icon="stopwatch" />
            {" " + resolveDurationRu(props.duration)}
        </Box>
    );
}
