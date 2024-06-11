import React, { useState, useEffect } from "react";
import { Menu, Form, Container, Message} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import { api } from '../api'
import { API_BASE } from '../constants'
import axios from 'axios';

function Signin({ setUserData }) {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const [activeItem, setActiveItem] = React.useState("register");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [sex, setSex] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [birthDate, setBirthDate] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const SEX_OPTIONS = [
        { key: 'female', text: '女性', value: '0' },
        { key: 'male', text: '男性', value: '1' },
        { key: 'not-selected', text: '不選擇', value: '2' }
    ];

    function onSubmit(){
        setIsLoading(true);
        if (activeItem === "register"){
            // Check if passwords match
            if (password !== confirmPassword) {
                setErrorMessage("密碼不一致");
                setIsLoading(false);
                return;
            }

            // Check if value matches the regex pattern
            if (!usernameRegex.test(username)) {
                setErrorMessage("使用者帳號只能包含英文和數字");
            } else {
                setErrorMessage(""); // Clear error message if value is valid
            }
            setUsername(username); // Update username state regardless of validation
        
            axios.post(API_BASE + 'api/login/', {
                username: username,
                password: password,
            })
            .then(response => {
                const token = response.data.token;
                window.localStorage.setItem("token", token);
                api().get(API_BASE + "/api/user/")
                    .then(userResponse => {
                        const userData = userResponse.data;
                        // 更新userData状态
                        setUserData(userData);
                        navigate("/");
                    })
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
                setErrorMessage(error.message || 'login failed');
            });
            
        //     firebase
        //         .auth()
        //         .createUserWithEmailAndPassword(email, password)
        //         .then(
        //             () => {
        //                 // Here you can handle additional user data saving if needed
        //                 navigate("/");
        //                 setIsLoading(false);
        //             }
        //         )
        //         .catch((e) => {
        //             switch(e.code) {
        //                 case "auth/email-already-in-use":
        //                     setErrorMessage("信箱已存在");
        //                     break;
        //                 case "auth/invalid-email":
        //                     setErrorMessage("信箱格式不正確");
        //                     break;
        //                 case "auth/weak-password":
        //                     setErrorMessage("密碼強度不足");
        //                     break;
        //                 default:
        //             }
        //             setIsLoading(false);
        //         });
        } else if (activeItem === "signin") {

            axios.post(API_BASE + 'api/login/', {
                username: username,
                password: password,
            })
            .then(response => {
                const token = response.data.token;
                window.localStorage.setItem("token", token);
                api().get(API_BASE + "/api/user/")
                    .then(userResponse => {
                        const userData = userResponse.data;
                        // 更新userData状态
                        setUserData(userData);
                        navigate("/");
                    })
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
                setErrorMessage(error.message || 'login failed');
            });
        }
    }

    return (<Container>
        <Menu widths='2'>
            <Menu.Item 
                active={activeItem === "register"}
                onClick={() => {
                    setErrorMessage("");
                    setActiveItem("register");
                }}
            >
                Register
            </Menu.Item>
            <Menu.Item 
                active={activeItem === "signin"}
                onClick={() => {
                    setErrorMessage("");
                    setActiveItem("signin");
                }}
            >
                Sign in
            </Menu.Item>
        </Menu>
        <Form onSubmit={onSubmit}>
            <Form.Input 
                label="使用者帳號"
                value={username}
                placeholder="Enter your username"
                // onChange={(e) => setUsername(e.target.value)} 
                onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
            />
            
            {activeItem === "register" && (
                <Form.Input 
                    label="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="ex: XXX@gmail.com"
                />
            )}
            <Form.Input 
                label="密碼" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                type="password"
            />
            {activeItem === "register" && (
                <Form.Input 
                    label="確認密碼" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    type="password"
                />
            )}
            {activeItem === "register" && (
                <Form.Dropdown
                    label="性別"
                    placeholder='Select your sex'
                    fluid
                    selection
                    options={SEX_OPTIONS}
                    value={sex}
                    onChange={(e, { value }) => setSex(value)}
                />
            )}
            {activeItem === "register" && (
                <Form.Input 
                    label="地址" 
                    value={address} 
                    placeholder="Enter your address"
                    onChange={(e) => setAddress(e.target.value)} 
                />
            )}
            {activeItem === "register" && (
                <Form.Input 
                    label="生日" 
                    value={birthDate} 
                    onChange={(e) => setBirthDate(e.target.value)} 
                    type='date'
                />
            )}
            {activeItem === "register" && (
                <Form.Input 
                    label="手機" 
                    value={phone} 
                    placeholder="Enter your cellphone or telephone number"
                    onChange={(e) => {
                        // 數字*10
                        const formattedValue = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setPhone(formattedValue);
                    }}
                />
            )}
            {errorMessage && <Message negative>{errorMessage}</Message>}
            <Form.Button loading={isLoading}>
                {activeItem === "register" ? "Register" : "Sign in"}
            </Form.Button>
        </Form>
    </Container>);
}

export default Signin;
