import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    container: {
        marginTop: "1em",
    },
}));

interface IPropertyEditorLayoutProps {
    label: string;
    children: React.ReactNode | React.ReactNode[] | null;
}

const PropertyEditorLayout: React.FC<IPropertyEditorLayoutProps> = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Typography variant="h6">{props.label}</Typography>
            <Box>{props.children}</Box>
        </Box>
    );
};

export default PropertyEditorLayout;
