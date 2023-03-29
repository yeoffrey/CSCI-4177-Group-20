import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
/**
 * display a success message when reset password is done,
 *  then take user back to the login page after 10seconds
 */
const Resetsuccess = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate('/login')
        }, 5000)
    }, [])

    return (
        <div>
            <h2>Cheers! Password reset done!</h2>
            <p>We will take you back to the login page in 5 seconds</p>
            <Link to="/login">or click HERE to login</Link>
        </div>
    );
}

export default Resetsuccess;