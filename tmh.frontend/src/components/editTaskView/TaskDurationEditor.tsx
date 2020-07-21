import React, { useState, useEffect } from "react";
import PropertyEditorLayout from "./PropertyEditorLayout";
import { InputAdornment, IconButton, makeStyles, FilledInput, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import _ from "lodash";
import { resolveMinuteCountableRu, resolveHourCountableRu } from "../../utils/lang/resolveDurationRu";

const useStyles = makeStyles(() => ({
    durationInput: {
        width: "250px",
        marginRight: "1em",
        marginTop: "1em",
    },
    durationInputAdornment: {
        marginTop: "16px",
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
        const newDuration = (hours ?? 0) * minutesPerHour + (minutes ?? 0);
        if (newDuration > 0) props.onChange(newDuration);
    };

    const classes = useStyles();

    return (
        <PropertyEditorLayout label="Длительность">
            <FilledInput
                type="number"
                value={hours ?? ""}
                onChange={(event) => {
                    const hours = parseInt(event.target.value);
                    updateDuration(_.isNumber(hours) && !_.isNaN(hours) ? hours : 0, minutes);
                }}
                className={classes.durationInput}
                startAdornment={
                    <InputAdornment className={classes.durationInputAdornment} position="start">
                        <IconButton onClick={() => updateDuration((hours ?? 0) + 1, minutes)}>
                            <AddIcon />
                        </IconButton>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment className={classes.durationInputAdornment} position="end">
                        <Box>{resolveHourCountableRu(hours ?? 0)}</Box>
                        <IconButton onClick={() => updateDuration((hours ?? 0) - 1, minutes)}>
                            <RemoveIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FilledInput
                value={minutes ?? ""}
                type="number"
                onChange={(event) => {
                    const minutes = parseInt(event.target.value);
                    updateDuration(hours, _.isNumber(minutes) && !_.isNaN(minutes) ? minutes : 0);
                }}
                className={classes.durationInput}
                startAdornment={
                    <InputAdornment className={classes.durationInputAdornment} position="start">
                        <IconButton onClick={() => updateDuration(hours, (minutes ?? 0) + minuteStep)}>
                            <AddIcon />
                        </IconButton>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment className={classes.durationInputAdornment} position="end">
                        <Box>{resolveMinuteCountableRu(minutes ?? 0)}</Box>
                        <IconButton onClick={() => updateDuration(hours, (minutes ?? 0) - minuteStep)}>
                            <RemoveIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </PropertyEditorLayout>
    );
};

export default TaskDurationEditor;
