import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
    Navigation,
    HistoryNone,
    History,
    AddBook,
} from "./components";
import BookSearch from "./bookSearch";
import Filter from "./Filter";

ReactDOM.render(
    <Router>
        <Navigation />
        <Routes>
            <Route path="/" element={ <Filter />} />
            <Route path="/historyNone" element={<HistoryNone />} />
            <Route path="/history" element={<History />} />
            <Route path="/addBook" element={<AddBook />} />
        </Routes>
    </Router>,

    document.getElementById("root")
);
reportWebVitals();