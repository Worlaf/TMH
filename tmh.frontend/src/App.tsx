import React from "react";
import "./App.css";
import TasksContainer from "./state/containers/TasksContainer";
import RootTaskList from "./components/taskList/RootTaskList";
import { CssBaseline } from "@material-ui/core";

function App() {
    return (
        <div className="App">
            <CssBaseline />
            <TasksContainer.Provider>
                <RootTaskList />
            </TasksContainer.Provider>
        </div>
    );
}

export default App;
