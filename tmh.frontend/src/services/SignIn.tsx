import React, { useState, useEffect } from "react";
import FirebaseContainer from "../state/containers/FirebaseContainer";
import { Button, CircularProgress, Typography, Box } from "@material-ui/core";
import CurrentUserContainer from "../state/containers/CurrentUserContainer";
import CenteredPaper from "../layouts/centeredPaper";
import appConfig from "../utils/appConfig";

export default function SignIn(props: { children: React.ReactElement }) {
    const firebase = FirebaseContainer.useContainer();
    const { setCurrentUser } = CurrentUserContainer.useContainer();
    var auth = firebase.getApp().auth();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (appConfig.skipAuthorization) {
            setCurrentUser({ accountImageUrl: null, email: "anonymous" });
            setIsLoading(false);
        } else {
            auth.getRedirectResult()
                .then((result) => {
                    const user = result.user ?? auth.currentUser;
                    setCurrentUser(
                        user && {
                            email: user.email!,
                            accountImageUrl: user.photoURL,
                        }
                    );

                    setIsLoading(false);
                })
                .catch((reason) => {
                    console.log("Redirect auth failed: ", reason);

                    setIsLoading(false);
                });
        }
    }, []);

    if (!appConfig.skipAuthorization && (isLoading || auth.currentUser == null)) {
        return (
            <CenteredPaper>
                {isLoading ? (
                    <>
                        <CircularProgress />
                        <Box paddingLeft="1em">Авторизация</Box>
                    </>
                ) : (
                    <>
                        <Typography>Войти:</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setIsLoading(true);
                                auth.signInWithRedirect(firebase.getGoogleAuthProvider());
                            }}
                        >
                            Google
                        </Button>
                    </>
                )}
            </CenteredPaper>
        );
    } else {
        return props.children;
    }
}
