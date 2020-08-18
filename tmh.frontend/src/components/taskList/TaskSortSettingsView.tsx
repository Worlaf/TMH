import React from "react";
import { Button, Box, makeStyles, Paper } from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import TimerIcon from "@material-ui/icons/Timer";
import PriorityIcon from "../PriorityIcon";

export enum SortDirection {
    None = 0,
    Ascending = 1,
    Descending = -1,
}

export enum SortModeType {
    Priority,
    Difficulty,
    Duration,
}

export interface ISortMode {
    mode: SortModeType;
    direction: SortDirection;
}

const useStyles = makeStyles(() => ({
    container: {
        padding: "0.5em",
        paddingBottom: "0.5em",
    },
    sortDirectionContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr",
    },
    sortButtonInner: {
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        justifyItems: "center",
        alignItems: "center",
    },
}));

function SortButton(props: { icon: React.ReactNode; direction: SortDirection; onSortDirectionChange: (direction: SortDirection) => void }) {
    const styles = useStyles();

    return (
        <Button
            size="small"
            onClick={() => {
                const direction = ((((props.direction as number) - 2) % 3) + 1) as SortDirection;

                props.onSortDirectionChange(direction);
            }}
        >
            <Box className={styles.sortButtonInner}>
                {props.icon}
                <Box className={styles.sortDirectionContainer}>
                    <ArrowDropUpIcon fontSize="small" color={props.direction === SortDirection.Ascending ? "primary" : "disabled"} />
                    <ArrowDropDownIcon fontSize="small" color={props.direction === SortDirection.Descending ? "primary" : "disabled"} />
                </Box>
            </Box>
        </Button>
    );
}

export function TaskSortSettingsView(props: { activeSortModes: ISortMode[]; activeSortModesChanged: (activeSortModes: ISortMode[]) => void }) {
    const sortModeInfos: { mode: SortModeType; renderIcon: () => React.ReactNode }[] = [
        {
            mode: SortModeType.Priority,
            renderIcon: () => <PriorityIcon priority={2} />,
        },
        {
            mode: SortModeType.Difficulty,
            renderIcon: () => <EmojiObjectsIcon fontSize="small" />,
        },
        {
            mode: SortModeType.Duration,
            renderIcon: () => <TimerIcon fontSize="small" />,
        },
    ];

    const styles = useStyles();

    return (
        <Box>
            <Paper variant="outlined" className={styles.container}>
                {sortModeInfos.map((m, i) => (
                    <SortButton
                        key={i}
                        icon={m.renderIcon()}
                        direction={props.activeSortModes.find((am) => am.mode === m.mode)?.direction ?? SortDirection.None}
                        onSortDirectionChange={(direction) => {
                            if (direction === SortDirection.None) props.activeSortModesChanged([...props.activeSortModes.filter((am) => am.mode !== m.mode)]);
                            else props.activeSortModesChanged([{ mode: m.mode, direction: direction }, ...props.activeSortModes.filter((am) => am.mode !== m.mode)]);
                        }}
                    />
                ))}
            </Paper>
        </Box>
    );
}
