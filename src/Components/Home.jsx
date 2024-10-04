import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../Router/SignInSignup.css';
import './Home.css';
import { apiCall } from '../Router/Api';

function Home() {
    const [promptText, setPromptText] = useState("Babies on horse");
    const [imageUrl, setImageUrl] = useState("https://mytestbucket96.s3.ap-south-1.amazonaws.com/generate/I4aYXpgxQi_generate_image.jpg");
    const notify = (message) => toast(message);
    
    const [state, setState] = useState({ Auth: null }); // Start with null

    // Function to get cookie value
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
        return null; // Return null if cookie is not found
    }

    // useEffect to set Auth state from cookie
    useEffect(() => {
        const token = getCookie('authToken');
        console.log('Fetched token:', token); // Debug log
        setState({ Auth: token }); // Update state with the token
    }, []); // Run once on mount

    const handleGenerateImage = async (e) => {
        e.preventDefault();
        try {
            console.log('Current Auth Token:', state.Auth); // Debug log
            if (!state.Auth) {
                throw new Error("Authentication token is not available.");
            }
            const data = await apiCall('image/generate', 'POST', { prompt: promptText }, {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.Auth}`
            });
            setImageUrl(data.data.url);
        } catch (error) {
            console.error('Image generation Failed!', error.response?.data || error);
            if (error.response?.data) {
                notify(error.response.data.message);
            } else {
                notify(error.message);
            }
        }
    };

    return (
        <div className="cont">
            <ToastContainer />
            <h2 className="welcome-text">Welcome to Text to Image Generator</h2>
            <div className='image-prompt'>
                <label>
                    <p>Please enter the prompt for image generation</p>
                    <input type="text" value={promptText} onChange={(e) => setPromptText(e.target.value)} required />
                </label>
                <button type="button" className="submit" onClick={handleGenerateImage}>Generate Image</button>
                <div className="image"><img className="image-size" src={imageUrl} alt="Generated" /></div>
            </div>
        </div>
    );
}

export default Home;
