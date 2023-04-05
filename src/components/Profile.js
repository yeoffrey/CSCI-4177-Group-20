import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import book from "../images/book.svg";
import page from "../images/file-earmark-break.svg";
import clock from "../images/clock.svg";

const ID = "642dee8dbf65fe3873eb404a";
const [user, setUser] = useState();

useEffect(() => {
  // Grab user data.
  fetch(`http://localhost:8080/api/user/${ID}`)
  .then((response) => response.json())
  .then((data) => setUser(data))
  .catch((error) => console.log(error));
})

const Profile = () => {
  return (
    <div className="App">
      <div
        id="Content-Header"
        className="container p-2 my-1 text-white bg-secondary"
      >
        <div className="row">
          <div className="col">
            <img
              src={require("../images/pfp.jpg")}
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-9">
            <h1>{name}'s Profile</h1>
            <div className="container p-2 my-1 text-white">
              <div className="row">
                <div className="col">
                  <h1>
                    <img src={book} className="img-fluid" alt="" />
                  </h1>
                  <h2>{numOfReview} reviews written</h2>
                </div>
                <div className="col">
                  <h1>
                    <img src={page} className="img-fluid" alt="" />
                  </h1>
                  <h2>1388 Pages read</h2>
                </div>
                <div className="col">
                  <img src={clock} className="img-fluid" alt="" />
                  <h2>Approx. 46 Hours spent reading</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="Content-Main" className="container bg-secondary">
        <div className="d-flex justify-content-between">
          <h1>Reviews:</h1>
          <Link type="button" className="btn btn-info" to="/addReview">
            <h1>+</h1>
          </Link>
        </div>
        <div id="History" className="row p-5 text-center ">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <img
                    src={require("../images/dune.jpg")}
                    className="img-thumbnail img-fluid"
                    width="75%"
                    alt=""
                  />
                </div>
                <div className="col-10 text-start">
                  <h5 className="book-title">Dune</h5>
                  <h5 className="book-title">4.5/5</h5>
                  <h5 className="book-title">412 Pages</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <img
                    src={require("../images/dune2.jpg")}
                    className="img-thumbnail img-fluid"
                    width="75%"
                    alt=""
                  />
                </div>
                <div className="col-10 text-start">
                  <h5 className="book-title">Dune Messiah</h5>
                  <h5 className="book-title">4.5/5</h5>
                  <h5 className="book-title">352 Pages</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <img
                    src={require("../images/dune3.jpg")}
                    className="img-thumbnail img-fluid"
                    width="75%"
                    alt=""
                  />
                </div>
                <div className="col-10 text-start">
                  <h5 className="book-title">Children of Dune</h5>
                  <h5 className="book-title">4.5/5</h5>
                  <h5 className="book-title">624 Pages</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
