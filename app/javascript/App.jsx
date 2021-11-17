import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Posts from "./components/Posts"
import CreatePost from "./components/CreatePost"

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' exact element={<Posts/>} />
                <Route path='/create-post' exact element={<CreatePost />} />
            </Routes>
        </Router>
    );
};

export default App;