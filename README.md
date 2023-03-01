<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use ---> 
<!--- You may delete any comments in this sample README.md file. If needing to use as a .txt file then simply delete all comments, edit as needed, and save as a README.txt file --->

# 4177 group 20 project

**[Optional]** If what is being submitted is an individual Lab or Assignment. Otherwise, include a brief one paragraph description about the project.

* *Date Created*: 27 JAN 2023
* *Last Modification Date*: DD MMM YYYY
* *Gitlab URL*: <https://git.cs.dal.ca/dhamodaran/4177-group-project>
* *Netlify URL*: <http://example.com/>

## Authors

* [Kaushik Dhamodaran](ks695041@dal.ca) - *(Maintainer)*
* [Bryce Wiedemann](br664676@dal.ca) - *(Maintainer)*
* [Geoffrey Belcher](Gbelcher@dal.ca) - *(Maintainer)*
* [Yuchen Ye](Yc786880@dal.ca) - *(Maintainer)*
* [Yuxuan Wang](yx703587@dal.ca) - *(Maintainer)*


## Getting Started

**[Optional]** If needing to provide the marker with a copy of the project that should run on their local machine for development, testing and/or marking purposes. Please include the following sections.

See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To have a local copy of this lab / assingnment / project up and running on your local machine, you will first need to install the following software / libraries / plug-ins

```
Give examples or provide a list of the required software / libraries / plug-ins

```

See the following section for detailed step-by-step instructions on how to install this software / libraries / plug-ins

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be, assume the marker just acquired a computer

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo. You may also include a quick example of what the marker should see if the installation of all required software / libraries / plug-ins was successful.


## Running the tests

If needing to run automated tests, then explain how to run the automated tests for this system. If this section is not needed, ** you may delete **.

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```


## Deployment

Add additional notes about how to deploy this on a live system

## Built With

<!--- Provide a list of the frameworks used to build this application, your list should include the name of the framework used, the url where the framework is available for download and what the framework was used for, see the example below --->

* [Google Books API](https://developers.google.com/books) - API used to collect book information
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

*Repeat as needed*

### File Name

*Lines ## - ##*

```
Copy and paste your code on lines mentioned 

```

The code above was created by adapting the code in [NAME](link) as shown below: 

```
Copy and paste the snippet of code you are referencing

```

- <!---How---> The code in [NAME](link) was implemented by...
- <!---Why---> [NAME](link)'s Code was used because...
- <!---How---> [NAME](link)'s Code was modified by...

*Repeat as needed*

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
