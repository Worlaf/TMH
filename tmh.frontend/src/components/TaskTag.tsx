import React from "react";
import { ITag } from "../state/data/Tag";
import { Chip, ChipProps } from "@material-ui/core";

export default function TaskTag(props: { tag: ITag; className?: string; onClick?: () => void } & ChipProps) {
    return (
        <Chip
            label={props.tag.label}
            style={{
                backgroundColor: props.tag.backColor,
                color: props.tag.fontColor,
                width: "max-content",
            }}
            {...props}
        />
    );
}
