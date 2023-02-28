import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
    Navigation,
    Home,
    HistoryNone,
    History,
    AddBook
} from "./components";

ReactDOM.render(
    <Router>
        <Navigation />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/historyNone" element={<HistoryNone />} />
            <Route path="/history" element={<History />} />
            <Route path="/addBook" element={<AddBook />} />
        </Routes>
    </Router>,

    document.getElementById("root")
);