import React from "react";
import { Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";

export default function DifficultyView(props: { difficulty: number }) {
    return (
        <Box>
            <Rating size="small" readOnly icon={<EmojiObjectsIcon fontSize="small" />} value={props.difficulty} />
        </Box>
    );
}
