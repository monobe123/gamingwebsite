import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import tictactoeImage from './images/tictactoe.png';
import power4Image from './images/power4.png';
import memoryGameImage from './images/memorygame.png';

const Home = () => {
  const [userEmail, setUserEmail] = useState('');
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [titleColor, setTitleColor] = useState('#000');
  const [buttonColor, setButtonColor] = useState('#3498db'); // Initial button color
  const [secondaryTitleColor, setSecondaryTitleColor] = useState('#000'); // Secondary title color

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setUserEmail(user.email);
          // Fetch and set history from localStorage on login
          const storedHistory = localStorage.getItem('gameHistory');
          setHistoryList(storedHistory ? JSON.parse(storedHistory) : []);
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    fetchUserEmail();

    // Smoothly change main title color
    const titleInterval = setInterval(() => {
      setTitleColor(generateRandomColor());
    }, 2000); // Change every 2 seconds

    // Smoothly change secondary title color
    const secondaryTitleInterval = setInterval(() => {
      setSecondaryTitleColor(generateRandomColor());
    }, 1500); // Change every 1.5 seconds

    // Clean up intervals on unmount
    return () => {
      clearInterval(titleInterval);
      clearInterval(secondaryTitleInterval);
    };
  }, []);

  // Function to generate a random color
  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setHistoryList([]); // Clear history on sign-out
      localStorage.removeItem('gameHistory');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: 'yellow', color: 'black', minHeight: '100vh' }}>
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <div
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: 'lightblue',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setShowUserInfo(!showUserInfo)}
        >
          <span role="img" aria-label="user" style={{ fontSize: '20px' }}>
            👤
          </span>
        </div>
        {showUserInfo && (
          <div style={{ marginTop: '10px' }}>
            <p style={{ color: 'black' }}>{userEmail}</p>
            <button
              onClick={() => setShowHistory(!showHistory)}
              style={{
                backgroundColor: 'lightblue',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Show History
            </button>
            <button
              onClick={handleSignOut}
              style={{
                backgroundColor: 'lightblue',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
                marginLeft: '5px',
              }}
            >
              Sign Out
            </button>
          </div>
        )}
        {showHistory && (
          <div style={{ marginTop: '10px' }}>
            <h3 style={{ color: 'black' }}>History:</h3>
            <ul style={{ color: 'black' }}>
              {historyList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <h1 style={{ color: titleColor }}>Welcome to game Arena</h1>
      <h3 style={{ color: secondaryTitleColor }}>You will find here a game you will like</h3>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <article style={{ margin: '10px', color: 'black', width: '250px', padding: '20px' }}>
          <h2>Tic Tac Toe</h2>
          <img src={tictactoeImage} alt="Tic Tac Toe" style={{ width: '200px', height: '150px' }} />
          <p>A classic game where two players take turns marking spaces in a 3x3 grid to get three in a row.</p>
          <a href="/TicTacToe" style={{ textDecoration: 'none' }}>
            <button
              style={{
                backgroundColor: buttonColor,
                transition: 'background-color 0.3s ease',
                width: '100%',
                height: '50px',
                fontSize: '16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Play
            </button>
          </a>
        </article>
        <article style={{ margin: '10px', color: 'black', width: '250px', padding: '20px' }}>
          <h2>Power 4</h2>
          <img src={power4Image} alt="Power 4" style={{ width: '200px', height: '150px' }} />
          <p>Similar to Connect Four, players drop discs into a grid trying to form a line of four.</p>
          <a href="/power4" style={{ textDecoration: 'none' }}>
            <button
              style={{
                backgroundColor: buttonColor,
                transition: 'background-color 0.3s ease',
                width: '100%',
                height: '50px',
                fontSize: '16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Play
            </button>
          </a>
        </article>
        <article style={{ margin: '10px', color: 'black', width: '250px', padding: '20px' }}>
          <h2>Memory Game</h2>
          <img src={memoryGameImage} alt="Memory Game" style={{ width: '200px', height: '150px' }} />
          <p>A game to test memory by finding matching pairs of cards within a set of face-down cards.</p>
          <a href="/memorygame" style={{ textDecoration: 'none' }}>
            <button
              style={{
                backgroundColor: buttonColor,
                transition: 'background-color 0.3s ease',
                width: '100%',
                height: '50px',
                fontSize: '16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Play
            </button>
          </a>
        </article>
      </div>
    </div>
  );
};

export default Home;
