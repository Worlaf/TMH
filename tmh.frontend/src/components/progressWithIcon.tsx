import React from "react";
import { Box, CircularProgress, CircularProgressProps } from "@material-ui/core";

export default function ProgressWithIcon(props: CircularProgressProps & { icon: React.ReactElement }) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="static" {...props} />
            <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
                {props.icon}
            </Box>
        </Box>
    );
}
