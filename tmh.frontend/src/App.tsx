import React from "react";
import "./App.css";
import TasksContainer from "./state/containers/TasksContainer";
import TaskList from "./components/taskList/TaskList";
import { CssBaseline } from "@material-ui/core";

function App() {
    return (
        <div className="App">
            <CssBaseline />
            <TasksContainer.Provider>
                <TaskList />
            </TasksContainer.Provider>
        </div>
    );
}

export default App;
