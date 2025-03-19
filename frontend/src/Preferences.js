import "./App.css";
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Icons} from "./assets/icons";

// Sample images for testing
import shirt1 from "./sampleImages/shirt_1.jpg";
import pants1 from "./sampleImages/pants_1.jpg";
import shoes1 from "./sampleImages/shoes_1.jpg";

const Preferences = () => {
    const navigate = useNavigate();
    const [isGenerating, setIsGenerating] = useState(false);
    const [weather, setWeather] = useState('');
    const [occasion, setOccasion] = useState('');

    const weather_options = [
        "hot", "warm", "cool", "cold", "rainy"
    ];

    const occasions = [
        "casual", "work", "formal", "athletic", "outdoor", "lounge", "party", "special event"
    ];

    const handleGenerate = async () => {
        setIsGenerating(true);

        try {
            const generateResponse = await fetch("http://127.0.0.1:5000/outfits/generate", {
                method: "POST",
            });

            if (!generateResponse.ok) {
                throw new Error("Failed to generate outfit.");
            }

            const outfitData = await generateResponse.json();

            setIsGenerating(false);

            /* testing purposes only, simulates delay of API call with dummy outfit
            const dummyOutfit = [
                {id: 1, image: shirt1},
                {id: 2, image: pants1},
                {id: 3, image: shoes1},
            ];

            setTimeout(() => {
                setIsGenerating(false);
                navigate("/generated-outfit", {state: {outfit: dummyOutfit}});
            }, 1000);
            */

            navigate("/generated-outfit", {state: {outfit: outfitData.outfit}});
        } catch (error) {
            console.error("Error during outfit generation:", error);
            setIsGenerating(false);
        }
    };

    return (
        <div className="preferences-container">
            <h1>Select Your Preferences</h1>

            <div className="preference-container">
                <h2>Weather:</h2>
                <select value={weather} onChange={(e) => setWeather(e.target.value)}>
                    <option value="" disabled>Select</option>
                    {weather_options.map((wea) => (
                        <option key={wea} value={wea}>{wea}</option>
                    ))}
                </select>
            </div>

            <div className="preference-container">
                <h2>Occasion:</h2>
                <select value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                    <option value="" disabled>Select</option>
                    {occasions.map((occ) => (
                        <option key={occ} value={occ}>{occ}</option>
                    ))}
                </select>
            </div>

            <button className="generate-btn" onClick={handleGenerate} disabled={isGenerating}>
                <Icons.Generate className="generate"/> Generate
            </button>

            {/* "generating" popup */}
            {isGenerating && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <Icons.Loading className="spinner"/>
                        <p id="popup-text">Generating your outfit...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Preferences;
