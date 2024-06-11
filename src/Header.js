import React, { useState, useEffect } from "react";
import { Menu, Search } from "semantic-ui-react";
import { Link } from "react-router-dom";

function Header({ userData }) {
    const [storedUserData, setStoredUserData] = useState(null);

    useEffect(() => {
        if (userData !== null) {
            localStorage.setItem("userData", JSON.stringify(userData));
        }
        
        const storedUserDataString = localStorage.getItem("userData");
        if (storedUserDataString) {
            setStoredUserData(JSON.parse(storedUserDataString));
        }
    }, [userData]);

    const handleSignOut = () => {
        localStorage.removeItem("userData");
        setStoredUserData(null);
    };

    return (
        <Menu>
            <Menu.Item as={Link} to="/">Yuxuan</Menu.Item>
            <Menu.Item style={{ flex: 1 }}>
                <Search placeholder="Search..." fluid/>
            </Menu.Item>
            <Menu.Menu position="right">
                {storedUserData ? (
                    <>
                        <Menu.Item as={Link} to="/new-post">Posting</Menu.Item>
                        <Menu.Item as={Link} to="/my">{storedUserData.member_name}</Menu.Item>
                        <Menu.Item onClick={handleSignOut}>Sign out</Menu.Item>
                    </>
                ) : (
                    <Menu.Item as={Link} to="/signin">
                        Register/Sign in
                    </Menu.Item>
                )}
            </Menu.Menu>
        </Menu>
    );
}

export default Header;
