import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Posts from "./components/Posts"

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' exact element={<Posts/>} />
            </Routes>
        </Router>
    );
};

export default App;