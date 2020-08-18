import React, { useEffect, useState } from "react";
import UserDataContainer from "../state/containers/UserDataContainer";
import FirebaseContainer from "../state/containers/FirebaseContainer";
import { IUserData } from "../state/data/UserData";
import CenteredPaper from "../layouts/CenteredPaper";
import { CircularProgress, Snackbar, Box } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import ProgressWithIcon from "../components/ProgressWithIcon";
import debounce from "../utils/debounce";
import appConfig from "../utils/appConfig";

function fixUserData(data: IUserData) {
    // data migration
    if (data.tags === null) data.tags = [];

    data.tasks = data.tasks.map((t) => (t.tagIds !== null && t.tagIds !== undefined ? t : { ...t, tagIds: [] }));
}

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
        if (appConfig.useLocalStorage) {
            const dataJson = window.localStorage.getItem(appConfig.localStorageKey!);
            updateUserData((dataJson && (JSON.parse(dataJson) as IUserData)) || { tasks: [], tags: [] });
            setIsDataReady(true);
        } else {
            getUserDoc()
                .get()
                .then((doc) => {
                    const result = (doc.data() as IUserData) ?? {
                        tasks: [],
                        tags: [],
                    };

                    fixUserData(result);

                    updateUserData(result);
                    setIsDataReady(true);
                });
        }
    }, []);

    useEffect(() => {
        if (appConfig.useLocalStorage) {
            window.localStorage.setItem(appConfig.localStorageKey!, JSON.stringify({ ...userData }));
        } else {
            debounce(() => {
                if (!isDataReady) return;

                setIsSaving(true);

                getUserDoc()
                    .set(userData, { merge: true })
                    .then(() => setIsSaving(false));
            }, 1000);
        }
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
