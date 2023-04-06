import React, {useEffect, useState} from "react";
import {Link, useNavigate } from "react-router-dom";
import bookImg from '../images/book.svg';
import page from '../images/file-earmark-break.svg';
import clock from '../images/clock.svg';


function History() {
    /*TESTING WITH HARDCODED BOOKS
    const bookHistory =
        [{"title": "The Google Story",
            "pageCount": 326,
            "description": "Here is the story behind one of the most remarkable Internet successes of our time. Based on scrupulous research and extraordinary access to Google, the book takes you inside the creation and growth of a company whose name is a favorite brand and a standard verb recognized around the world.Its stock is worth more than General Motors' and Ford's combined, its staff eats for free in a dining room that used to be run by the Grateful Dead's former chef, and its employees traverse the firm' s colorful Silicon Valley campus on scooters and inline skates.\u003cbr\u003eTHE GOOGLE STORY is the definitive account of the populist media company powered by the world's most advanced technology that in a few short years has revolutionized access to information about everything for everybody everywhere. \u003cbr\u003eIn 1998, Moscow-born Sergey Brin and Midwest-born Larry Page dropped out of graduate school at Stanford University to, in their own words, \"change the world\" through a search engine that would organize every bit of information on the Web for free. \u003cbr\u003eWhile the company has done exactly that in more than one hundred languages, Google' s quest continues as it seeks to add millions of library books,  television broadcasts,  and more to its searchable database.\u003cbr\u003eReaders will learn about the amazing business acumen and computer wizardry that started the company on its astonishing course; the secret network of computers delivering lightning-fast search results; the unorthodox approach that has enabled it to challenge Microsoft's dominance and shake up Wall Street. Even as it rides high, Google wrestles with difficult choices that will enable it to continue expanding while sustaining the guiding vision of its founders' mantra: DO NO EVIL.",
            "averageRating": 4,
            "previewLink": "http://books.google.ca/books?id=F_9SAAAAMAAJ&hl=&source=gbs_api",
            "thumbnail": "http://books.google.com/books/content?id=F_9SAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71BVWpdB3p3OaZ5hi0Y23wsCK8vIO3xQ91WQmO9OzQGz0TGq_EudqsQx10aaE4JSlADqSif8YOO2XptkiOnCe6y08D75eMc6G77OUpamPPSFk3BmQIuSDFfpO34WboZ5hWhK7Xe"
        }, {"title": "Flowers",
            "pageCount": 24,
            "description": "Discover the beautiful science of flowers! Through full-color photos and simple, easy-to-follow text, this nonfiction book introduces emergent readers to the basics of botany, including information on how flowers grow, along with their uses. All Pebble Plus books align with national and state standards and are designed to help new readers read independently, making them the perfect choice for every child.",
            "averageRating": "N/A",
            "previewLink": "https://play.google.com/store/books/details?id=_ojXNuzgHRcC&source=gbs_api",
            "thumbnail": "http://books.google.com/books/content?id=_ojXNuzgHRcC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72XJQIKbEALD3DBXtK3HapO7uy_y6eRodbY6nmDaImoDNgFYvyzGE-mt3VxK8NLhp1YN-par32T-crvbif4oNj6IjvY5oPZRVshURUb7sxBzUwc32JET-WKFoXGy1mO4XuTq5vO&source=gbs_api"
        }]*/
    const id = ("test@test.ca");
    let hasData = false;
    let totalPages = 0;
    let timeSpent = 0;
    const [history, setHistory] = useState([]);
    useEffect(() => {
        // Fetch bookHistory
        fetch(`https://cyberlibtest.onrender.com/api/bookHistory/${id}`)
            .then((response) => response.json())
            .then((data) => setHistory(data))
            .catch((error) => console.log(error));
    }, [id]);

    history.map(bookHist => {
        bookHist.bookHistory.map(book => {
            totalPages += book.pageCount
            timeSpent = Math.round((totalPages * 2) / 60)
            if (bookHist.bookHistory.length > 0){hasData = true}
        });
    })

    return (
        <div>{hasData ? (
            <div>{history.map((bookHist) => (
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
                                            <h1><img src={bookImg} className="img-fluid" alt=""/></h1>
                                            <h2>{bookHist.bookHistory.length} Books read</h2>
                                        </div>
                                        <div className="col">
                                            <h1><img src={page} className="img-fluid" alt=""/></h1>
                                            <h2>{totalPages} Pages read</h2>
                                        </div>
                                        <div className="col">
                                            <img src={clock} className="img-fluid" alt=""/>
                                            <h2>Approx. {timeSpent} Hours spent reading</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="Content-Main" className="container bg-secondary">
                        <div className="d-flex justify-content-between">
                            <h1>Previous Reads:</h1>
                            {/*<Link type="button" className="btn btn-info" to='/addbook'><h1>+</h1></Link>*/}
                        </div>
                        <div id="History" className="row p-5 text-center ">
                            {bookHist.bookHistory.map(book => (
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <img src={book.thumbnail} className="img-thumbnail img-fluid"
                                                     alt={book.title}/>
                                            </div>
                                            <div className="col-10 text-start">
                                                <h5 className="book-title" key={book._id + "title"}>{book.title}</h5>
                                                <h5 className="book-rating" key={book._id + "avgRating"}>Average
                                                    Rating: {!book.averageRating ?  ("N/A") : (book.averageRating)}</h5>
                                                <h5 className="book-pages"
                                                    key={book._id + "pageCount"}>Pages: {book.pageCount}</h5>
                                                <p className="book-desc"
                                                   key={book._id + "desc"}>{dataTrim(book.description)}</p>
                                                <Link type="button" className="btn btn-primary" to={'/books/'+book.bookID}><h6>Go to book page</h6></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>))}
            </div>
        ) : (
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
                                        <h1><img src={bookImg} className="img-fluid" alt=""/></h1>
                                        <h2>0 Books read</h2>
                                    </div>
                                    <div className="col">
                                        <h1><img src={page} className="img-fluid" alt=""/></h1>
                                        <h2>0 Pages read</h2>
                                    </div>
                                    <div className="col">
                                        <img src={clock} className="img-fluid" alt=""/>
                                        <h2>Approx. 0 Hours spent reading</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="Content-Main" className="container bg-secondary">
                    <div className="d-flex justify-content-between">
                        <h1>Previous Reads:</h1>
                        {/*<Link type="button" className="btn btn-info" to='/addbook'><h1>+</h1></Link>*/}
                    </div>
                    <div id="History" className="row p-5 text-center ">
                        <h3>No Previous books associated with this account.</h3>
                        <h5>You can add books by pressing the borrow button on the homepage!</h5>
                    </div>
                </div>
            </div>
        )}
        </div>
    )
}
function dataTrim(desc)
{   let text = desc;
    if (desc.length > 500) {
        text = desc.substring(0,(500))+"...";
    }
    return text;
}
export default History;