import React from "react";
import { Typography, Drawer, makeStyles, Divider } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { format } from "../utils/date";
import ActivityList from "../components/activity/ActivityList";

const drawerWidth = 480;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
}));

export default function SchedulePage() {
    const routeParams = useParams<{ date: string }>();
    const dateTokens = routeParams.date.split("-");
    const day = parseInt(dateTokens[0]);
    const month = parseInt(dateTokens[1]);
    const year = parseInt(dateTokens[2]);

    const date = new Date(year, month - 1, day);

    const classes = useStyles();

    return (
        <>
            <Typography>{format(date, "PPPP")}</Typography>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={true}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar}></div>
                <Divider />
                <ActivityList />
            </Drawer>
        </>
    );
}
