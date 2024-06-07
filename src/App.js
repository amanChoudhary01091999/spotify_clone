import logo from './logo.svg';
import React from 'react';
import './App.css';
import { SongContext, SongProvider } from './context/songProvider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SongList from './component/songList';
import Player from './component/player';
import { useContext, useEffect } from 'react';

function App() {

  return (
    <div id='root' >
      <SongProvider>
        <Router>
          <BackgroundUpdater />
          <div className="App">
            <div className="sidebar">
              <div className="header">
                <img src="/logo_spotify-removebg-preview (1).png" alt="Spotify Logo" className="logo" />
                <h1>Spotify</h1>
              </div>
              <div className="profile">
                <img src="/—Pngtree—user profile avatar_13369988.png" alt="Profile" className="profile-pic" />
              </div>
            </div>
            <div className="content">
              <div className="song-list-container">
                <SongList />
              </div>
              <Player />
            </div>

          </div>
        </Router>
      </SongProvider>
    </div>
  );
}



const BackgroundUpdater = () => {
  const { currentSong } = useContext(SongContext);

  useEffect(() => {
    const root = document.getElementById('root');
    if (currentSong) {
      const newBackgroundUrl = `https://cms.samespace.com/assets/${currentSong.cover}`;
      root.style.background = `linear-gradient(rgba(0, 0, 0, 0.95) 80%, rgba(0, 0, 0, 0.95) 80%), url('${newBackgroundUrl}')`;
      root.style.backgroundRepeat = 'repeat'

    } else {
      root.style.background = `linear-gradient(rgba(0, 0, 0, 0.95) 80%, rgba(0, 0, 0, 0.95) 80%)`;
      root.style.backgroundSize = 'cover';
      root.style.backgroundPosition = 'center';
      root.style.backgroundRepeat = 'repeat'
    }
  }, [currentSong]);
}
export default App;

// backgroundColor: 'blue'
// backgroundImage: currentSong ? `url('https://cms.samespace.com/assets/${currentSong.cover}')` : 'none'