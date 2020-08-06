import React from "react";
import { makeStyles, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: "5em",
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
    },
}));

export default function CenteredContentLayout(props: { children: React.ReactElement | React.ReactElement[] | null }) {
    const styles = useStyles();

    return <Container className={styles.container}>{props.children}</Container>;
}
