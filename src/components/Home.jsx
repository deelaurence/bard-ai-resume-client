import axios from "axios";
import React, { useState } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
const Home = ({setResult}) => {
    const navigate = useNavigate()
    const [fullName, setFullName] = useState("");
    const [currentPosition, setCurrentPosition] = useState("");
    const [currentLength, setCurrentLength] = useState(0);
    const [currentTechnologies, setCurrentTechnologies] = useState("");
    const [companyInfo, setCompanyInfo] = useState([{ name: "", position: "" }]);
    const [headshot, setHeadshot] = useState(null);
    const [loading, setLoading] = useState(false);
    //👇🏻 updates the state with user's input
const handleAddCompany = () =>
    setCompanyInfo([...companyInfo, { name: "", position: "" }]);

//👇🏻 removes a selected item from the list
const handleRemoveCompany = (index) => {
    const list = [...companyInfo];
    list.splice(index, 1);
    setCompanyInfo(list);
};
//👇🏻 updates an item within the list
const handleUpdateCompany = (e, index) => {
    const { name, value } = e.target;
    const list = [...companyInfo];
    list[index][name] = value;
    setCompanyInfo(list);
};

const handleFormSubmit = (e) => {
    e.preventDefault();
    
    setLoading(true);
    const formData = new FormData();
    formData.append("headshotImage", headshot, headshot.name);
    formData.append("fullName", fullName);
    formData.append("currentPosition", currentPosition);
    formData.append("currentLength", currentLength);
    formData.append("currentTechnologies", currentTechnologies);
    formData.append("workHistory", JSON.stringify(companyInfo));
    axios
        .post("https://bard-resume-ai.onrender.com/resume/create", formData, {})
        .then((res) => {
            if (res.data.message) {
                console.log(res.data);
                console.log(res.data.data);
                setLoading(false)
                //👇🏻 updates the result object
                setResult(res.data.data);
                navigate("/resume");

            }
        })
        .catch((err) => console.error(err));
};
    //👇🏻 Renders the Loading component you submit the form
    if (loading) {
        return <Loading />;
    }


    return (
        <div className='app'>
            <h1>Resume Builder</h1>
            <p>Generate a resume with ChatGPT in few seconds</p>
            <form
                onSubmit={handleFormSubmit}
                method='POST'
                encType='multipart/form-data'
            >
                <label htmlFor='fullName'>Enter your full name</label>
                <input
                    type='text'
                    required
                    name='fullName'
                    id='fullName'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <div className='nestedContainer-1'>
                    <div>
                        <label htmlFor='currentPosition'>Current Position</label>
                        <input
                            type='text'
                            required
                            name='currentPosition'
                            className='currentInput'
                            value={currentPosition}
                            onChange={(e) => setCurrentPosition(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='currentLength'>For how long? (year)</label>
                        <input
                            type='number'
                            required
                            name='currentLength'
                            className='currentInput'
                            value={currentLength}
                            onChange={(e) => setCurrentLength(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='currentTechnologies'>Technologies used</label>
                        <input
                            type='text'
                            required
                            name='currentTechnologies'
                            className='currentInput'
                            value={currentTechnologies}
                            onChange={(e) => setCurrentTechnologies(e.target.value)}
                        />
                    </div>
                </div>
                <label htmlFor='photo'>Upload your headshot image</label>
                <input
                    type='file'
                    name='photo'
                    required
                    id='photo'
                    accept='image/x-png,image/jpeg'
                    onChange={(e) => setHeadshot(e.target.files[0])}
                />
                {companyInfo.map((company, index) => (
                <div className='nestedContainer' key={index}>
                    <div className='companies'>
                        <label htmlFor='name'>Company Name</label>
                        <input
                            type='text'
                            name='name'
                            required
                            onChange={(e) => handleUpdateCompany(e, index)}
                        />
                    </div>
                    <div className='companies'>
                        <label htmlFor='position'>Position Held</label>
                        <input
                            type='text'
                            name='position'
                            required
                            onChange={(e) => handleUpdateCompany(e, index)}
                        />
                    </div>

                    <div className='btn__group'>
                        {companyInfo.length - 1 === index && companyInfo.length < 4 && (
                            <button id='addBtn' onClick={handleAddCompany}>
                                Add
                            </button>
                        )}
                        {companyInfo.length > 1 && (
                            <button id='deleteBtn' onClick={() => handleRemoveCompany(index)}>
                                Del
                            </button>
                        )}
                    </div>
                </div>
            ))}
                <button>CREATE RESUME</button>
            </form>
        </div>
    );
};

export default Home;