import React from "react";
import { ColorPicker as MuiColorPicker, ColorPickerProps } from "material-ui-color";

// temporary proxy to inject missing properties
// remove after https://github.com/mikbry/material-ui-color/issues/76 is fixed
export function ColorPicker(props: ColorPickerProps & { hideTextfield?: boolean; disableAlpha?: boolean }) {
    return <MuiColorPicker {...props} />;
}
