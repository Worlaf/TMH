import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CurrentUserContainer from "../../state/containers/CurrentUserContainer";
import FirebaseContainer from "../../state/containers/FirebaseContainer";

export default function TopMenu() {
    const { currentUser } = CurrentUserContainer.useContainer();
    const [userProfileMenuAnchorEl, setUserProfileMenuAnchorEl] = useState<HTMLElement | null>(null);
    const firebase = FirebaseContainer.useContainer();

    const handleOpenUserProfileMenu = (event: React.MouseEvent<HTMLButtonElement>) => setUserProfileMenuAnchorEl(event.currentTarget);
    const closeUserProfileMenu = () => setUserProfileMenuAnchorEl(null);

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton onClick={handleOpenUserProfileMenu}>{currentUser?.accountImageUrl ? <Avatar src={currentUser.accountImageUrl} /> : <AccountCircleIcon />}</IconButton>
            </Toolbar>
            <Menu id="userProfileMenu" anchorEl={userProfileMenuAnchorEl} keepMounted open={!!userProfileMenuAnchorEl} onClose={closeUserProfileMenu}>
                <MenuItem
                    onClick={() => {
                        firebase
                            .getApp()
                            .auth()
                            .signOut()
                            .then(() => {
                                window.location.reload();
                            });
                        closeUserProfileMenu();
                    }}
                >
                    Выйти
                </MenuItem>
            </Menu>
        </AppBar>
    );
}
