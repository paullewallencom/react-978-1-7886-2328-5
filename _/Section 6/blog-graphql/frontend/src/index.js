import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CreatePost from "./components/CreatePost";
import registerServiceWorker from "./registerServiceWorker";
import Login from "./components/Login";

import { BrowserRouter, Switch } from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <App path="/" exact={true} />
            <CreatePost path="/create-post" exact={true} />
            <Login path="/login" exact={true} />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
registerServiceWorker();
