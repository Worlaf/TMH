import React from "react";
import { makeStyles, Paper, Box } from "@material-ui/core";
import CenteredContentLayout from "./centeredContentLayout";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "1em",
    },
}));

export default function CenteredPaper(props: { children: React.ReactElement | React.ReactElement[] | null }) {
    const styles = useStyles();

    return (
        <CenteredContentLayout>
            <Paper className={styles.paper}>
                <Box display="flex" alignItems="center">
                    {props.children}
                </Box>
            </Paper>
        </CenteredContentLayout>
    );
}
