import React from "react";
import {Link} from "react-router-dom";
import book from '../images/book.svg';
import page from '../images/file-earmark-break.svg';
import clock from '../images/clock.svg';
function History() {
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
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <img src={require('../images/dune.jpg')} className="img-thumbnail img-fluid" width="75%" alt=""/>
                                </div>
                                <div className="col-10 text-start">
                                    <h5 className="book-title">Dune</h5>
                                    <h5 className="book-title">4.5/5</h5>
                                    <h5 className="book-title">412 Pages</h5>
                                    <p className="card-text">Set on the desert planet Arrakis, Dune is the story of the boy Paul
                                        Atreides, heir to a noble family tasked with ruling an inhospitable world where the only
                                        thing of value is the “spice” melange, a drug capable of extending life and enhancing
                                        consciousness.Some quick example text to build on the card title and make up the bulk of
                                        the card's content.</p>
                                    <button className="btn btn-primary">Go to book page</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <img src={require('../images/dune2.jpg')} className="img-thumbnail img-fluid" width="75%" alt=""/>
                                </div>
                                <div className="col-10 text-start">
                                    <h5 className="book-title">Dune Messiah</h5>
                                    <h5 className="book-title">4.5/5</h5>
                                    <h5 className="book-title">352 Pages</h5>
                                    <p className="card-text">Dune Messiah continues the story of Paul Atreides, better
                                        known—and feared—as the man christened Muad’Dib. As Emperor of the known universe,
                                        he possesses more power than a single man was ever meant to wield. Worshipped as
                                        a religious icon by the fanatical Fremen, Paul faces the enmity of the political
                                        houses he displaced when he assumed the throne—and a conspiracy conducted within
                                        his own sphere of influence.</p>
                                    <button className="btn btn-primary">Go to book page</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <img src={require('../images/dune3.jpg')} className="img-thumbnail img-fluid" width="75%" alt=""/>
                                </div>
                                <div className="col-10 text-start">
                                    <h5 className="book-title">Children of Dune</h5>
                                    <h5 className="book-title">4.5/5</h5>
                                    <h5 className="book-title">624 Pages</h5>
                                    <p className="card-text">The Children of Dune are twin siblings Leto and Ghanima Atreides,
                                        whose father, the Emperor Paul Muad’Dib, disappeared in the desert wastelands of Arrakis
                                        nine years ago. Like their father, the twins possess supernormal abilities—making them
                                        valuable to their manipulative aunt Alia, who rules the Empire in the name of House Atreides.
                                    </p>
                                    <button className="btn btn-primary">Go to book page</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default History;