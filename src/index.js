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
import Login from './components/Login';
import { Recover } from './components/credentials_recover/Recover';
import 'bootstrap/dist/css/bootstrap.min.css';
import Message from './components/credentials_recover/Message';
import Reset from './components/credentials_recover/Reset';
import Register from './components/Register';
import Resetsuccess from './components/credentials_recover/Resetsuccess';
import Profile from './components/Profile';
import AddReview from './components/addReview';

ReactDOM.render(
    <Router>
        <Navigation />
        <Routes>
            <Route path="/" element={<Filter />} />
            <Route path="/historyNone" element={<HistoryNone />} />
            <Route path="/history" element={<History />} />
            <Route path="/addBook" element={<AddBook />} />

            <Route path="/login" element={<Login />} />
            <Route path="/recover" element={<Recover />} />
            <Route path="/reset-password" element={<Reset />} />
            <Route path="/reset-success" element={<Resetsuccess />} />
            <Route path="/message" element={<Message />} />
            <Route path="/register" element={<Register />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/addReview" element={<AddReview />}></Route>

        </Routes>
    </Router>,

    document.getElementById("root")
);
reportWebVitals();