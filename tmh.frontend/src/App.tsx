import React from "react";
import "./App.css";
import TasksContainer from "./state/containers/TasksContainer";
import { CssBaseline } from "@material-ui/core";
import TaskListPage from "./pages/TaskListPage";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import routes from "./utils/routes";
import EditTaskPage from "./pages/EditTaskPage";

function App() {
    return (
        <div className="App">
            <CssBaseline />
            <BrowserRouter>
                <TasksContainer.Provider>
                    <Switch>
                        <Route path={routes.home.template} exact>
                            <TaskListPage />
                        </Route>
                        <Route path={routes.editTask.template} exact>
                            <EditTaskPage />
                        </Route>
                    </Switch>
                </TasksContainer.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
