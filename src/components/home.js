import React from "react";

function Home() {
    return (
        <div className="row">
            <h1 className="text-center">Home</h1>
            <div className="text-center">
                <p>
                    The feature that i chose for my assignment is the User history/stats section. I have created 3 pages
                    filled with dummy data for this.<br/>
                    The History(None) page if the user has no data (no previous books have been read through the
                    application / no books have been uploaded as read.<br/>
                    The History (book added) which shows what it would look like if the user had data added either from
                    the website itself or uploaded.<br/>
                    Lastly the Add book page, denoted by the "+" button on the History pages. <br/>
                    This page is used to allow the user to upload book data that will add to the history page.
                </p>
            </div>
        </div>
    );
}

export default Home;