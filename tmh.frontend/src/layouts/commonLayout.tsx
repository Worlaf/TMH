import React from "react";
import TopMenu from "../components/topMenu/topMenu";
import { Container } from "@material-ui/core";

export default function CommonLayout(props: { children: React.ReactElement | null }) {
    return (
        <>
            <TopMenu />
            <Container>{props.children}</Container>
        </>
    );
}
