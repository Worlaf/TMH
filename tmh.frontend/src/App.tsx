import React from "react";
import "./App.css";
import TasksContainer from "./state/containers/TasksContainer";
import { CssBaseline } from "@material-ui/core";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import routes from "./utils/routes";
import EditTaskPage from "./pages/EditTaskPage";
import TaskListPage from "./pages/TaskListPage";
import SignIn from "./services/SignIn";
import FirebaseContainer from "./state/containers/FirebaseContainer";
import CurrentUserContainer from "./state/containers/CurrentUserContainer";
import CommonLayout from "./layouts/CommonLayout";
import UserDataContainer from "./state/containers/UserDataContainer";
import UserDataSyncService from "./services/UserDataSyncService";
import { format } from "./utils/date";
import SchedulePage from "./pages/SchedulePage";
import ActivityContainer from "./state/containers/ActivityContainer";

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
                                        <ActivityContainer.Provider>
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
                                                    <Route path={routes.root.schedule.template} exact>
                                                        <Redirect to={routes.root.schedule.scheduleDay.build({ date: format(new Date(), "dd-MM-yyyy") })} />
                                                    </Route>
                                                    <Route path={routes.root.schedule.scheduleDay.template} exact>
                                                        <SchedulePage />
                                                    </Route>
                                                </Switch>
                                            </CommonLayout>
                                        </ActivityContainer.Provider>
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
