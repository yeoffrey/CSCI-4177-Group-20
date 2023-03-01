import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
/**
 * display all kinds of system messages
 */
const Message = () => {
    const navigate = useNavigate();
    return (
        <div className='myform'>
            <p >The username associated with this email is</p>
            <h2>user1</h2>

            <Button className="m-3" variant="primary"  type="button" onClick={() => {
                navigate("/reset-password");
            }}>Reset Password</Button>

            <Button className="m-3" variant="success"  type="button" onClick={() => {
                navigate("/login");
            }}>Login</Button>
        </div>
    );
}

// #endregion

export default Message;