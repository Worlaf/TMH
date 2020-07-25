import React, { useState, useEffect } from "react";
import PropertyEditorLayout from "./PropertyEditorLayout";
import { InputAdornment, IconButton, makeStyles, FilledInput, Box, OutlinedInput } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import _ from "lodash";
import { resolveMinuteCountableRu, resolveHourCountableRu } from "../../utils/lang/resolveDurationRu";

const useStyles = makeStyles(() => ({
    durationInput: {
        width: "120px",
        marginTop: "1em",
    },
    durationInputAdornment: {},
    durationContainer: {
        display: "inline-block",
    },
}));

interface ITaskDurationEditorProps {
    duration: number | null;
    onChange: (value: number | null) => void;
}

const TaskDurationEditor: React.FC<ITaskDurationEditorProps> = (props) => {
    const [minutes, setMinutes] = useState<number>();
    const [hours, setHours] = useState<number>();
    const minutesPerHour: number = 60;
    const minuteStep: number = 10;

    useEffect(() => {
        if (props.duration) {
            const m = props.duration % minutesPerHour;
            const h = (props.duration - m) / minutesPerHour;

            setHours(h);
            setMinutes(m);
        } else {
            setHours(undefined);
            setMinutes(undefined);
        }
    }, [props.duration]);

    const updateDuration = (hours: number | undefined, minutes: number | undefined) => {
        if (minutes === undefined) minutes = 0;
        if (hours === undefined) hours = 0;

        let newDuration = hours * minutesPerHour + minutes;

        if (newDuration < 0) newDuration = 0;
        if (newDuration > 5999) newDuration = 5999;

        props.onChange(newDuration);
    };

    const classes = useStyles();

    return (
        <PropertyEditorLayout label="Длительность">
            <Box className={classes.durationContainer}>
                <IconButton onClick={() => updateDuration((hours ?? 0) + 1, minutes)}>
                    <AddIcon />
                </IconButton>
                <OutlinedInput
                    margin="dense"
                    value={hours ?? ""}
                    onChange={(event) => {
                        const newHours = event.target.value.length > 0 ? parseInt(event.target.value) : 0;
                        updateDuration(_.isNumber(newHours) && !_.isNaN(newHours) ? newHours : hours, minutes);
                    }}
                    endAdornment={
                        <InputAdornment className={classes.durationInputAdornment} position="end">
                            <Box>{resolveHourCountableRu(hours ?? 0)}</Box>
                        </InputAdornment>
                    }
                    className={classes.durationInput}
                />
                <IconButton onClick={() => updateDuration((hours ?? 0) - 1, minutes)}>
                    <RemoveIcon />
                </IconButton>
            </Box>
            <Box className={classes.durationContainer}>
                <IconButton onClick={() => updateDuration(hours, (minutes ?? 0) + minuteStep)}>
                    <AddIcon />
                </IconButton>
                <OutlinedInput
                    margin="dense"
                    value={minutes ?? ""}
                    onChange={(event) => {
                        const newMinutes = event.target.value.length > 0 ? parseInt(event.target.value) : 0;
                        updateDuration(hours, _.isNumber(newMinutes) && !_.isNaN(newMinutes) ? newMinutes : minutes);
                    }}
                    className={classes.durationInput}
                    endAdornment={
                        <InputAdornment className={classes.durationInputAdornment} position="end">
                            <Box>{resolveMinuteCountableRu(minutes ?? 0)}</Box>
                        </InputAdornment>
                    }
                />
                <IconButton onClick={() => updateDuration(hours, (minutes ?? 0) - minuteStep)}>
                    <RemoveIcon />
                </IconButton>
            </Box>
        </PropertyEditorLayout>
    );
};

export default TaskDurationEditor;
