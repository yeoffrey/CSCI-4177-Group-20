<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use ---> 
<!--- You may delete any comments in this sample README.md file. If needing to use as a .txt file then simply delete all comments, edit as needed, and save as a README.txt file --->

# 4177 group 20 project

**[Optional]** If what is being submitted is an individual Lab or Assignment. Otherwise, include a brief one paragraph description about the project.

* *Date Created*: 27 JAN 2023
* *Last Modification Date*: 31 MAR 2023
* *Gitlab URL*: <https://git.cs.dal.ca/dhamodaran/4177-group-project>
* *Host URL*: <https://four177-group-20-project.onrender.com/>
## Authors

* [Kaushik Dhamodaran](ks695041@dal.ca) - *(Maintainer)*
* [Bryce Wiedemann](br664676@dal.ca) - *(Maintainer)*
    * Handled User stats and History (history.js)
* [Geoffrey Belcher](Gbelcher@dal.ca) - *(Maintainer)*
    * Handled Profile page and adding a review modal (profile.js and addReview.js)
* [Yuchen Ye](Yc786880@dal.ca) - *(Maintainer)*
* [Yuxuan Wang](yx703587@dal.ca) - *(Maintainer)*


## Getting Started

Find our deployment here -> https://four177-group-20-project.onrender.com/
Find our repository here -> https://git.cs.dal.ca/dhamodaran/4177-group-project 

## Built With

<!--- Provide a list of the frameworks used to build this application, your list should include the name of the framework used, the url where the framework is available for download and what the framework was used for, see the example below --->

* [Google Books API](https://developers.google.com/books) - API used to collect book information.
* [MongoDB](https://www.mongodb.com/) - Back end framework with [Mongoose](https://mongoosejs.com/).
* [React](https://react.dev/) - Front end framework of choice.
* [Render.com](render.com) - Deployment.
* [bootstrap](https://getbootstrap.com) - Styles for frontend framework
**

## Sources Used

If in completing your lab / assignment / project you used any interpretation of someone else's code, then provide a list of where the code was implement, how it was implemented, why it was implemented, and how it was modified. See the sections below for more details.

### booksearch.js

*Lines 1 - 43

```
import React, { useState } from "react";
import axios from "axios";

const bookSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [apiKey, setApiKey] = useState("AIzaSyDayUQL9JZHgC_Yk5rQFtFgfK59208X2JY")

  const handleSearch = async (e) => {
    e.preventDefault();
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`;
    const response = await axios.get(url);
    setBooks(response.data.items);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Books"
        />
        <button type="submit">Search</button>
      </form>
      {books.map((book) => (
        <div key={book.id}>
          <img
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt={`${book.volumeInfo.title} cover`}
          />
          <h2>{book.volumeInfo.title}</h2>
          <p>{book.volumeInfo.subtitle}</p>
          <p>{book.volumeInfo.authors?.join(", ")}</p>
          <p>Price: {book.saleInfo.listPrice?.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default bookSearch;

```

The code above was created by adapting the code in [webninjadeveloper](https://webninjadeveloper.com/react/build-a-react-book-search-app-using-google-books-api-v3-in-browser-using-typescript/) as shown below: 

```
import React, { useState } from "react";  
import axios from 'axios';  
import { Card } from 'react-bootstrap';  
function googleBooksSearch() {  
    const [book, setBook] = useState("");  
    const [result, setResult] = useState([]);  
    const [apiKey, setApiKey] = useState("AIzaSyCqi37mzRrzkBrDZDb0BX9_IarX5iMOT88")  
  
    function handleChange(event) {  
        const book = event.target.value;  
        setBook(book);  
    }  
    function handleSubmit(event) {  
        event.preventDefault();  
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=" + apiKey + "&maxResults=40")  
            .then(data => {  
                console.log(data.data.items);  
                setResult(data.data.items);  
            })  
    }  
    return (  
        <form onSubmit={handleSubmit}>  
            <div className="card-header main-search">  
                <div className="row">  
                    <div className="col-12 col-md-3 col-xl-3">  
                        <input onChange={handleChange} className="AutoFocus form-control" placeholder="Type something..." type="text" />  
                    </div>  
                    <div className="ml-auto">  
                        <input type="submit" value="Search" className="btn btn-primary search-btn" />  
                    </div>  
                </div>  
            </div>  
            <div className="container">  
                <div className="row">  
                    {result.map(book => (  
                        <div className="col-sm-2">  
                            <Card style={{ 'marginTop': '10px' }}>  
  
                                <Card.Img variant="top" src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : ''} alt={book.title} />  
                                <Card.Body>  
                                    <h5 className="card-title">Card title</h5>  
                                    <a className="btn btn-primary">Know more</a>  
                                </Card.Body>  
                            </Card>  
                        </div>  
                    ))}  
                </div>  
            </div>  
        </form>  
  
    )  
}  
  
export default googleBooksSearch

```

- <!---How---> The code in [webninjadeveloper](https://webninjadeveloper.com/react/build-a-react-book-search-app-using-google-books-api-v3-in-browser-using-typescript/) was implemented by Kaushik Dhamodaran
- <!---Why---> [webninjadeveloper](https://webninjadeveloper.com/react/build-a-react-book-search-app-using-google-books-api-v3-in-browser-using-typescript/)'s Code was used because it shows how to use google books api to search and display books
- <!---How---> [webninjadeveloper](https://webninjadeveloper.com/react/build-a-react-book-search-app-using-google-books-api-v3-in-browser-using-typescript/)'s Code was modified by Kaushik Dhamodaran


## Individual Work
* Bryce Wiedemann - B00828649 - br664676@dal.ca
  *  User History and Stats Feature
I worked on created the user history and stats. This feature entails the user clicking on the history and stats section of the navbar (My Account > History & Stats). This feature allows for a user to press the borrow button on the main page (homepage) and the book that borrow was pressed on will automatically be added to the database as a book that the user has read/is reading. the information that is added to the database and then pulled and displayed for the user to see the stats like books read in all, how many total pages, and approximately how many hours have been/would have been read (if the books were read). This is based on the average rate that i found people read at which is 1/2 page per minute. 
** Files edited for to create this feature
  - history.js
  * this is the main file that i was using the create this feature. this shows the css and main calcultations for the stats. On top of this it shows the books read in seperate cards that can be expanded (click the more info button) that will bring you to the reviews page done by another group memeber.
  - Navigation.js
  * this file was used to create the navbar that was a secondary goal for me, creating the dropdown that will house the profile, history and stats, aswell as aynthing else that is deemed needed when the demo time comes.
  - backend/server.js
  * This file i added the backend schema for saving the information to the database and allowing for data to be added (books to be borrowed) and retrieved using the proper schema. This makes sure that all information that is requied is present.



* Yuchen Ye - B00883812 -yc786880@dal.ca
  * File I created
  1. server.js
  2. BookDetails.js (and css)
  3. Backend folder
  4. Filter.js (and css)
  * Feature I made
In this group project, I implemented MongoDB link (server.js) and each book review (BookDetails.js).

In the previous proposal and assignment. I am mainly responsible for the implementation of filter function and review function. But later in the programming, my team used the    Google api to replace the database as the book display function. Since I am not familiar with the Google api usage, I cannot complete the filter function. Therefore, I fully implemented the review function. As the user clicks through each book, BookDetails puts the author and biography of each book on top. And add a form below that allows users to enter their name and comments. When the form is submitted, user comments are uploaded to the database and displayed below. You can search for one in the search bar and click on the first book to see reviews.

Another feature I've done is connect to mongoDB. I used some dependencies to connect (e.g. mongoose,express) and then created the schema and model for Review below. Use the get method and post method in YouTube 5. If you want to check your database connection, you can view my review collection by typing "local host:8080/api/review" into the URL bar

* Yuxuan(Hardison) Wang - B00880845 - yx703587@dal.ca
  * File I created
  1. Message.js
  2. Recover.js
  3. Reset.js
  4. Resetsuccess.js
  5. auth.js
  6. Login.js
  7. Register.js
  8. schemas.js
  9. CSS files of all above.

> In this group project, I implemented registeration, login, credentials recover/reset and user authentication. 
> In the previous assignments and proposal, I was always doing the authentication and authorization features. But in previous works, I use self-implemented API for retrieving contents from server. In this assignment, I tried to use auth0 to implement better authentication. However, all the funstions are tested working on the auth0 testbed (data can actually go into our database and retrieved), but not functioning while hook up the api to pages in our project due to dependencies issues. The features will be refined and connected to each page later in the project.
