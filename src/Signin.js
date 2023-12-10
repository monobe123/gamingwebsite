import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from './firebase';
import backgroundImage from './images/14.jpg'; // Replace 'your_image.jpg' with your image file path

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [buttonColor, setButtonColor] = useState('#4A90E2'); // Initial color for the button
  const [titleColor, setTitleColor] = useState('#ffffff'); // White color for the title
  const [borderColor, setBorderColor] = useState('#4A90E2'); // Initial color for the borders

  useEffect(() => {
    const buttonColors = ['#4A90E2', '#8A2BE2', '#32CD32']; // Array of colors for the button
    const borderColors = ['#4A90E2', '#8A2BE2', '#32CD32']; // Array of colors for the borders
    let buttonIndex = 0;
    let borderIndex = 0;

    const buttonIntervalId = setInterval(() => {
      setButtonColor(buttonColors[buttonIndex]);
      buttonIndex = (buttonIndex + 1) % buttonColors.length;
    }, 3800); // Change button color every 5 seconds (5000 milliseconds)

    const borderIntervalId = setInterval(() => {
      setBorderColor(borderColors[borderIndex]);
      borderIndex = (borderIndex + 1) % borderColors.length;
    }, 3500); // Change border color every 4 seconds (4000 milliseconds)

    return () => {
      clearInterval(buttonIntervalId);
      clearInterval(borderIntervalId);
    }; // Clean up intervals on component unmount
  }, []);

  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        setMessage('Passwords do not match.');
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Information confirmed!');
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <img
        src={backgroundImage}
        alt="Background"
        style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
      />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        <h2 style={{ color: titleColor }}>Sign In</h2>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '5px',
              borderColor: borderColor, // Border color
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '5px',
              borderColor: borderColor, // Border color
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '5px',
              borderColor: borderColor, // Border color
            }}
          />
        </div>
        <button
          onClick={handleSignUp}
          style={{
            padding: '10px 20px',
            fontSize: '1.1em',
            borderRadius: '5px',
            backgroundColor: buttonColor,
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          Sign In
        </button>
        {message && <p style={{ color: '#ffffff', fontSize: '1.2em' }}>{message}</p>}
        {message && (
          <p style={{ color: '#ffffff', fontSize: '1.2em' }}>
            Now you need to{' '}
            <Link to="/login" style={{ color: '#ffffff', textDecoration: 'underline' }}>log in</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Signin;
