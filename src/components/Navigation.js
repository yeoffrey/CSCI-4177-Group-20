import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation() {
    const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
    const [show, setShow] = useState(false);
    const showDropdown = (e)=>{
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }
    return (
        <div className="navigation">
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        Cyber Library
                    </NavLink>
                    <div>
                        <ul className="navbar-nav ml-auto">
                            <Nav onSelect={handleSelect} >
                                <Nav.Item>
                                    <NavLink className="nav-link" to="/">
                                        Home
                                    </NavLink>
                                </Nav.Item>
                                <NavDropdown title="Account" id="nav-dropdown" menuVariant="dark"
                                             show={show}
                                             onMouseEnter={showDropdown}
                                             onMouseLeave={hideDropdown}>
                                    <NavDropdown.Item>
                                        <NavLink className="nav-link" to="/profile">
                                            Profile
                                        </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <NavLink className="nav-link" to="/history">
                                            History & Stats
                                        </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <NavLink className="nav-link" to="/addBook">
                                            Add Book
                                        </NavLink>
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <NavLink className="nav-link" to="/login">
                                    Login
                                </NavLink>
                            </Nav>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navigation;
