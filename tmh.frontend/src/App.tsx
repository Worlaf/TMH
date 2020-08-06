import React from "react";
import "./App.css";
import TasksContainer from "./state/containers/TasksContainer";
import { CssBaseline } from "@material-ui/core";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import routes from "./utils/routes";
import EditTaskPage from "./pages/EditTaskPage";
import TaskListPage from "./pages/TaskListPage";
import SignIn from "./services/SignIn";
import FirebaseContainer from "./state/containers/FirebaseContainer";
import CurrentUserContainer from "./state/containers/CurrentUserContainer";
import CommonLayout from "./layouts/commonLayout";
import UserDataContainer from "./state/containers/UserDataContainer";
import UserDataSyncService from "./services/UserDataSyncService";

function App() {
    return (
        <div className="App">
            <CssBaseline />
            <BrowserRouter>
                <FirebaseContainer.Provider>
                    <CurrentUserContainer.Provider>
                        <SignIn>
                            <UserDataContainer.Provider>
                                <UserDataSyncService>
                                    <TasksContainer.Provider>
                                        <CommonLayout>
                                            <Switch>
                                                <Route path={routes.root.template} exact>
                                                    <TaskListPage />
                                                </Route>
                                                <Route path={routes.root.tasks.template} exact>
                                                    <TaskListPage />
                                                </Route>
                                                <Route path={routes.root.tasks.edit.template} exact>
                                                    <EditTaskPage />
                                                </Route>
                                            </Switch>
                                        </CommonLayout>
                                    </TasksContainer.Provider>
                                </UserDataSyncService>
                            </UserDataContainer.Provider>
                        </SignIn>
                    </CurrentUserContainer.Provider>
                </FirebaseContainer.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
