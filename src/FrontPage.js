import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import backgroundVideo from './videos/11.mp4'; // Update the path based on your folder structure

const FrontPage = () => {
  const [buttonColor, setButtonColor] = useState('#4A90E2'); // Initial color for the buttons
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const colors = ['#4A90E2', '#8A2BE2', '#32CD32']; // Array of colors for the buttons
    let index = 0;

    const intervalId = setInterval(() => {
      setButtonColor(colors[index]);
      index = (index + 1) % colors.length;
    }, 5000); // Change color every 5 seconds (5000 milliseconds)

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  const handleButtonClick = () => {
    setButtonClicked(true);
    // Perform other actions upon button click if needed
  };

  const handleButtonMouseEnter = () => {
    if (!buttonClicked) {
      setButtonClicked(false);
    }
  };

  const handleButtonMouseLeave = () => {
    if (!buttonClicked) {
      setButtonClicked(false);
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
    }}>
      <video
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        autoPlay
        loop
        muted
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        fontFamily: 'Arial, sans-serif',
        color: '#fff',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '2.5em', marginTop: '20px' }}>Welcome to Online Gaming Arena!</h1>
        <p style={{ fontSize: '1.2em', margin: '20px 0' }}>Play your favorite games now:</p>
        <div>
          <Link to="/Signin">
            <button
              style={{
                marginRight: '10px',
                padding: '10px 20px',
                fontSize: '1.1em',
                borderRadius: '5px',
                backgroundColor: buttonColor,
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
              onClick={handleButtonClick}
            >
              Signin
            </button>
          </Link>
          <Link to="/Login">
            <button
              style={{
                padding: '10px 20px',
                fontSize: '1.1em',
                borderRadius: '5px',
                backgroundColor: buttonColor === '#4A90E2' ? '#32CD32' : buttonColor === '#32CD32' ? '#8A2BE2' : '#4A90E2',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
              onClick={handleButtonClick}
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;