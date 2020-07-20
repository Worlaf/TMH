import React from "react";
import { Box } from "@material-ui/core";

interface IPropertyEditorLayoutProps {
    label: string;
    children: React.ReactNode;
}

const PropertyEditorLayout: React.FC<IPropertyEditorLayoutProps> = (props) => {
    return (
        <Box>
            <Box>{props.label}</Box>
            <Box>{props.children}</Box>
        </Box>
    );
};

export default PropertyEditorLayout;
