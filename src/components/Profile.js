import React, { useState, useEffect } from "react";
import "./../css/profile.css";

const Profile = () => {
  const [user, setUser] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const ID = "642dee8dbf65fe3873eb404a";

  const handlePasswordUpdate = () => {
    fetch(`localhost:8080/api/user/${user}/updatePassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        oldPassword: oldPassword,
        newPassword: newPassword
      }
    })
    .catch(error => console.error(error));;
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  }

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  }

  useEffect(() => {
    // Grab user data.
    fetch(`localhost:8080/api/user/${ID}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      {user ? (
        <div className="row">
          <h1 className="profile-header">Profile Settings</h1>
          <div className="col-6">
            <p className="profile-item">
              {oldPassword} {newPassword}
              Email: {user.email}{" "}
              {user.email_verified ? (
                <span>verified</span>
              ) : (
                <div className="alert alert-warning" role="alert">
                  Your email is not verified! Please check your inbox and junk/spam folders.
                </div>
              )}
            </p>
          </div>
          <div className="text-center">
            <div className="row">
              <div className="col-9">
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={handleOldPasswordChange}
                  />
                  <label>Old Password</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-9">
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={handleNewPasswordChange}
                  />
                  <label>New Password</label>
                </div>
              </div>
              <div className="col">
                <button
                  onClick={() => handlePasswordUpdate()}
                  className="btn btn-primary btn-lg p-2 m-2"
                >
                  Update Password
                </button>
              </div>
              <div>
                
                </div>
            </div>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Profile;
