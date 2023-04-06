import React, { useState, useEffect } from "react";
const ID = "642dee8dbf65fe3873eb404a";

const Profile = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    // Grab user data.
    fetch(`http://localhost:8080/api/user/${ID}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.log(error));
  }, []);

  console.log(user);

  return (
    <div className="container">
      {user ? (
        <div>
          <h1>Profile Settings</h1>
          <p>Email: {user.email} {user.email_verified ? (<p>verified</p>) : (<p>not verified</p>)}</p>
          
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Profile;
