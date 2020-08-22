import React, { useState } from "react";
import PropertyEditorLayout from "./PropertyEditorLayout";
import { makeStyles, Box, Button } from "@material-ui/core";
import UserDataContainer from "../../state/containers/UserDataContainer";
import ListAltIcon from "@material-ui/icons/ListAlt";
import TagManager from "../tagManager/TagManager";
import Tag from "../Tag";
import classNames from "classnames";
import AddIcon from "@material-ui/icons/Add";
import _ from "lodash";

interface ITagsEditorProps {
    tagIds: string[];
    onChange: (tagIds: string[]) => void;
}

const useStyles = makeStyles(() => ({
    tag: {
        margin: "2px",
    },
    unselectedTag: {
        opacity: 0.7,
    },
}));

export default function TagsEditor(props: ITagsEditorProps) {
    const { userData } = UserDataContainer.useContainer();
    const [openTagManager, setOpenTagManager] = useState(false);

    const classes = useStyles();

    return (
        <PropertyEditorLayout label="Теги">
            <Box paddingBottom={"1em"}>
                {_(userData.tags)
                    .orderBy((t) => t.label)
                    .map((t) => {
                        const isTagSelected = props.tagIds.indexOf(t.id) >= 0;
                        const tag = isTagSelected ? t : { ...t, backColor: "#f0f0f0", fontColor: "#aaaaaa" };

                        return (
                            <Tag
                                key={tag.id}
                                tag={tag}
                                className={classNames(classes.tag, { [classes.unselectedTag]: !isTagSelected })}
                                onDelete={() => props.onChange(isTagSelected ? [...props.tagIds.filter((id) => id !== tag.id)] : [...props.tagIds, tag.id])}
                                deleteIcon={isTagSelected ? undefined : <AddIcon style={{ color: tag.fontColor }} />}
                            />
                        );
                    })
                    .value()}
            </Box>
            <Button onClick={() => setOpenTagManager(true)} variant="outlined" color="primary">
                <ListAltIcon />
                Редактировать теги
            </Button>
            <TagManager openDialog={openTagManager} onDialogClose={() => setOpenTagManager(false)} />
        </PropertyEditorLayout>
    );
}
