import React, { useEffect, useState, useRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Chip, makeStyles, IconButton, InputAdornment } from "@material-ui/core";
import UserDataContainer from "../../state/containers/UserDataContainer";
import { ITag } from "../../state/data/Tag";
import * as uuid from "uuid";
import _ from "lodash";
import CreateIcon from "@material-ui/icons/Create";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
import classNames from "classnames";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import TaskTag from "../TaskTag";
import { ColorPicker } from "../ColorPicker";

interface ITagManagerProps {
    openDialog: boolean;
    onDialogClose: () => void;
}

const useStyles = makeStyles((theme) => ({
    tagContainer: {
        display: "grid",
        gridTemplateColumns: "auto 36px 36px 30px 30px",
        alignItems: "center",
        height: "36px",
    },
    deletedChip: {
        backgroundColor: theme.palette.grey["400"],
        opacity: 0.5,
        textDecoration: "line-through",
    },
}));

interface ITagViewProps {
    tag: ITag;
    onChange: (tag: ITag) => void;
    editLabel: boolean;
    deleted: boolean;
    isNew: boolean;
    onEditLabelClicked: () => void;
    onDeleteClicked: () => void;
    onRestoreClicked: () => void;
    onFinishLabelEditingClicked: () => void;
}

function TagView(props: ITagViewProps) {
    const classes = useStyles();
    const inputRef = useRef<HTMLInputElement>();

    const saveLabelAndFinishEditing = () => {
        props.onChange({ ...props.tag, label: inputRef.current!.value });
        props.onFinishLabelEditingClicked();
    };

    return (
        <div key={props.tag.id} className={classes.tagContainer}>
            {props.editLabel ? (
                <TextField
                    value={undefined}
                    defaultValue={props.tag.label}
                    inputRef={inputRef}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") saveLabelAndFinishEditing();
                        else if (e.key === "Escape") props.onFinishLabelEditingClicked();
                    }}
                />
            ) : (
                // <Chip
                //     label={props.tag.label}
                //     className={classNames({ [classes.deletedChip]: props.deleted })}
                //     style={{
                //         backgroundColor: props.tag.backColor,
                //         color: props.tag.fontColor,
                //         width: "max-content",
                //     }}
                // />
                <TaskTag tag={props.tag} className={classNames({ [classes.deletedChip]: props.deleted })} />
            )}
            {props.deleted ? (
                <>
                    <span></span>
                    <span></span>
                    <span></span>
                </>
            ) : (
                <>
                    <ColorPicker
                        value={props.tag.backColor}
                        onChange={(color) => props.onChange({ ...props.tag, backColor: "#" + color.hex })}
                        hideTextfield
                        disableAlpha
                        deferred
                    />
                    <ColorPicker
                        value={props.tag.fontColor}
                        onChange={(color) => props.onChange({ ...props.tag, fontColor: "#" + color.hex })}
                        hideTextfield
                        disableAlpha
                        deferred
                    />
                    {props.editLabel ? (
                        <IconButton size="small" onClick={saveLabelAndFinishEditing}>
                            <DoneIcon />
                        </IconButton>
                    ) : (
                        <IconButton size="small" onClick={() => props.onEditLabelClicked()}>
                            <CreateIcon />
                        </IconButton>
                    )}
                </>
            )}

            {props.deleted ? (
                <IconButton size="small" onClick={() => props.onRestoreClicked()}>
                    <RestoreFromTrashIcon />
                </IconButton>
            ) : props.editLabel ? (
                <IconButton size="small" onClick={() => props.onFinishLabelEditingClicked()}>
                    <CloseIcon />
                </IconButton>
            ) : (
                <IconButton size="small" onClick={() => props.onDeleteClicked()}>
                    {props.isNew ? <DeleteForeverIcon /> : <DeleteIcon />}
                </IconButton>
            )}
        </div>
    );
}

export default function TagManager(props: ITagManagerProps) {
    const { userData, updateUserData } = UserDataContainer.useContainer();
    const [tags, setTags] = useState<ITag[]>([]);
    const [tagToDeleteIds, setTagToDeleteIds] = useState<string[]>([]);
    const [tagInEditLabelStateId, setTagInEditLabelStateId] = useState<string>();
    const [showDeleteTagsAlert, setShowDeleteTagsAlert] = useState(false);
    const inputRef = useRef<HTMLInputElement>();

    useEffect(() => setTags([...userData.tags]), [userData]);

    const addTag = () => {
        const inputEl = inputRef.current;
        if (inputEl === undefined || inputEl.value.trim().length === 0) return;

        setTags([...tags, { id: uuid.v4(), label: inputEl.value, backColor: "#aaaaaa", fontColor: "#000000" }]);

        inputEl.value = "";
    };

    const saveTags = () => {
        const deleteTags = (tagIds: string[]) => tagIds.filter((id) => tagToDeleteIds.indexOf(id) < 0);

        if (tagToDeleteIds.length > 0) {
            updateUserData({ tasks: userData.tasks.map((task) => ({ ...task, tagIds: deleteTags(task.tagIds) })) });
        }

        updateUserData({ tags: [...tags] });
    };

    return (
        <>
            <Dialog maxWidth="sm" fullWidth={true} open={props.openDialog} onClose={props.onDialogClose}>
                <DialogTitle>Теги</DialogTitle>
                <DialogContent>
                    <Box>
                        {_(tags)
                            .orderBy((tag) => tag.label)
                            .map((tag) => (
                                <TagView
                                    key={tag.id}
                                    tag={tag}
                                    isNew={userData.tags.find((t) => t.id === tag.id) === undefined}
                                    onChange={(tag) => setTags([...tags.filter((t) => t.id !== tag.id), tag])}
                                    editLabel={tag.id === tagInEditLabelStateId}
                                    onEditLabelClicked={() => setTagInEditLabelStateId(tag.id)}
                                    onDeleteClicked={() => {
                                        if (tagInEditLabelStateId === tag.id) setTagInEditLabelStateId(undefined);
                                        //if (userData.tags.find((t) => t.id === tag.id) !== undefined) {
                                        setTagToDeleteIds([...tagToDeleteIds, tag.id]);
                                        // } else {
                                        //     setTags([...tags.filter((t) => t.id !== tag.id)]);
                                        // }
                                    }}
                                    deleted={tagToDeleteIds.indexOf(tag.id) >= 0}
                                    onRestoreClicked={() => setTagToDeleteIds([...tagToDeleteIds.filter((id) => id !== tag.id)])}
                                    onFinishLabelEditingClicked={() => setTagInEditLabelStateId(undefined)}
                                />
                            ))

                            .value()}
                    </Box>
                    <Box>
                        {tags.length > 0 ? <hr /> : null}
                        <TextField
                            inputRef={inputRef}
                            fullWidth
                            label="Новый тег"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton size="small" onClick={addTag}>
                                            <AddIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            value={undefined}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    addTag();
                                }
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            if (tagToDeleteIds.length > 0) {
                                setShowDeleteTagsAlert(true);
                            } else {
                                saveTags();
                                props.onDialogClose();
                            }
                        }}
                        color="primary"
                    >
                        Сохранить
                    </Button>
                    <Button onClick={props.onDialogClose} color="primary">
                        Отмена
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={showDeleteTagsAlert} onClose={() => setShowDeleteTagsAlert(false)}>
                <DialogTitle>Подтвердите удаление тегов</DialogTitle>
                <DialogContent>
                    Следующие ужк используются:{" "}
                    {_(userData.tags)
                        .filter((tag) => tagToDeleteIds.indexOf(tag.id) >= 0)
                        .map((tag) => tag.label)
                        .join(", ")}
                    . Вы уверены что хотите их удалить?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDeleteTagsAlert(false)} color="primary">
                        Отмена
                    </Button>
                    <Button
                        onClick={() => {
                            saveTags();
                            setShowDeleteTagsAlert(false);
                            props.onDialogClose();
                        }}
                        color="primary"
                        autoFocus
                    >
                        Продолжить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
