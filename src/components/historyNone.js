import React from "react";
import {Link} from "react-router-dom";
import book from "../images/book.svg";
import page from "../images/file-earmark-break.svg";
import clock from "../images/clock.svg";

function HistoryNone() {
    return (
        <div className="App">
            <div id="Content-Header" className="container p-2 my-1 text-white bg-secondary">
                <div className="row">
                    <div className="col">
                        <img src={require('../images/pfp.jpg')} className="img-fluid" alt=""/>
                    </div>
                    <div className="col-9">
                        <h1>$(USERNAME)'s Statistics</h1>
                        <div className="container p-2 my-1 text-white">
                            <div className="row">
                                <div className="col">
                                    <h1><img src={book} className="img-fluid" alt=""/></h1>
                                    <h2>3 Books read</h2>
                                </div>
                                <div className="col">
                                    <h1><img src={page} className="img-fluid" alt=""/></h1>
                                    <h2>1388 Pages read</h2>
                                </div>
                                <div className="col">
                                    <img src={clock} className="img-fluid" alt=""/>
                                    <h2>Approx. 46 Hours spent reading</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="Content-Main" className="container bg-secondary">
                <div className="d-flex justify-content-between">
                    <h1>Previous Reads:</h1>
                    <Link type="button" className="btn btn-info" to='/addbook'><h1>+</h1></Link>
                </div>
                <div id="History" className="row p-5 text-center ">
                    <h3>No Previous books associated with this account.</h3>
                    <h5>You can add books you have read on your own time by pressing the
                        "+" icon in the top right.</h5>
                </div>
            </div>
        </div>
    );
}

export default HistoryNone;