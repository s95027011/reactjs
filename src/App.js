import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

import Header from "./Header";
import Signin from "./pages/Signin";
import Posts from "./pages/Posts";
import NewPosts from "./pages/NewPosts";

function App() {
    const [userData, setUserData] = useState(null); // 保存用户数据的状态

    return (
        <BrowserRouter>
            {/* 将userData作为prop传递给Header组件 */}
            <Header userData={userData} />
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/signin" element={<Signin setUserData={setUserData} />} />
                <Route path="/new-post" element={<NewPosts />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
