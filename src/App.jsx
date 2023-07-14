import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Resume from "./components/Resume";

const App = () => {

    const fetchData = async () => {
    try {
      const response = await fetch('https://bard-resume-ai.onrender.com'); // Replace with the actual API URL
      const jsonData = await response.json();
      console.log(jsonData)
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  fetchData()
    //👇🏻 state holding the result
    const [result, setResult] = useState({});

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home setResult={setResult} />} />
                    <Route path='/resume' element={<Resume result={result} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;