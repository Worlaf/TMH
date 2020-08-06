import React, { useEffect, useState } from "react";
import UserDataContainer from "../state/containers/UserDataContainer";
import FirebaseContainer from "../state/containers/FirebaseContainer";
import { IUserData } from "../state/data/userData";
import CenteredPaper from "../layouts/centeredPaper";
import { CircularProgress, Snackbar, Box } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import ProgressWithIcon from "../components/progressWithIcon";
import debounce from "../utils/debounce";

export default function UserDataSyncService(props: { children: React.ReactElement | null }) {
    const { userData, updateUserData } = UserDataContainer.useContainer();
    const firebase = FirebaseContainer.useContainer();
    const [isDataReady, setIsDataReady] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const getUserDoc = () => {
        const user = firebase.getApp().auth().currentUser;
        if (user == null) throw Error("Пользователь не авторизован.");

        const db = firebase.getDb();
        return db.collection("users").doc(user.uid);
    };

    useEffect(() => {
        getUserDoc()
            .get()
            .then((doc) => {
                const result = (doc.data() as IUserData) ?? {
                    tasks: [],
                };

                console.log("Data loaded: ", result);

                updateUserData(result);
                setIsDataReady(true);
            });
    }, []);

    useEffect(() => {
        debounce(() => {
            if (!isDataReady) return;

            console.log("Save data", userData);

            setIsSaving(true);

            getUserDoc()
                .set(userData, { merge: true })
                .then(() => setIsSaving(false));
        }, 1000);
    }, [userData]);

    if (isDataReady) {
        return (
            <>
                {props.children}
                <Snackbar
                    open={isSaving}
                    message={
                        <Box alignItems="center" display="flex">
                            <ProgressWithIcon variant="indeterminate" color="secondary" icon={<SaveIcon fontSize="small" />} />
                            <Box paddingLeft="1em">Сохранение</Box>
                        </Box>
                    }
                />
            </>
        );
    } else {
        return (
            <CenteredPaper>
                <CircularProgress />
                <Box paddingLeft="1em">Загрузка данных</Box>
            </CenteredPaper>
        );
    }
}
