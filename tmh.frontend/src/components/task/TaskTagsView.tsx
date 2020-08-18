import React from "react";
import UserDataContainer from "../../state/containers/UserDataContainer";
import TaskTag from "../TaskTag";
import { makeStyles } from "@material-ui/core";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
    tag: {
        marginLeft: "2px",
        marginBottom: "2px",
    },
}));

export default function TaskTagsView(props: { tagIds: string[] }) {
    const { userData } = UserDataContainer.useContainer();

    const classes = useStyles();

    return (
        <div>
            {_(props.tagIds)
                .map((id) => {
                    const tag = userData.tags.find((t) => t.id === id);
                    if (!tag) {
                        debugger;
                        throw Error(`Не удалось найти тег по идентификатору ${id}`);
                    }

                    return tag;
                })
                .orderBy((tag) => tag.label)
                .map((tag) => <TaskTag key={tag.id} tag={tag} size="small" className={classes.tag} />)
                .value()}
        </div>
    );
}
