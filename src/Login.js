import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from './firebase';
import backgroundImage from './images/15.jpg'; // Replace 'your_image.jpg' with your image file path

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [buttonColor, setButtonColor] = useState('#4A90E2'); // Initial color for the button
  const [titleColor, setTitleColor] = useState('#ffffff'); // White color for the title
  const [borderColor, setBorderColor] = useState('#4A90E2'); // Initial color for the borders

  useEffect(() => {
    const colors = ['#4A90E2', '#8A2BE2', '#32CD32']; // Colors for transition
    let colorIndex = 0;

    const colorIntervalId = setInterval(() => {
      setTitleColor(colors[colorIndex]);
      setButtonColor(colors[colorIndex]);
      setBorderColor(colors[colorIndex]);
      colorIndex = (colorIndex + 1) % colors.length;
    }, 2000); // Change colors every 2 seconds (2000 milliseconds)

    return () => {
      clearInterval(colorIntervalId);
    }; // Clean up interval on component unmount
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Account valid!');
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
        <h2 style={{ color: titleColor, transition: 'color 0.3s ease' }}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            borderColor: borderColor, // Border color
            marginBottom: '15px',
            transition: 'border-color 0.3s ease',
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            borderColor: borderColor, // Border color
            marginBottom: '15px',
            transition: 'border-color 0.3s ease',
          }}
        />
        <br />
        <button
          onClick={handleLogin}
          style={{
            padding: '10px 20px',
            fontSize: '1.1em',
            borderRadius: '5px',
            backgroundColor: buttonColor,
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            marginRight: '10px',
          }}
        >
          Login
        </button>
        <Link to="/signin"> {/* Redirects to the sign-in page */}
          <button
            style={{
              padding: '10px 20px',
              fontSize: '1.1em',
              borderRadius: '5px',
              backgroundColor: 'red', // Red color for the Sign In button
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            Sign In
          </button>
        </Link>
        {message && (
          <p style={{ color: '#ffffff', fontSize: '1.2em', transition: 'color 0.3s ease' }}>
            {message}{' '}
            {message === 'Account valid!' && (
              <Link to="/home" style={{ color: '#ffffff', textDecoration: 'underline' }}>Now you can access the home page</Link>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
