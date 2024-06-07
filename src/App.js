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
                <img src="https://cdn.ndhgo.com/dev/royelectronics12_ndh01_com/images/cb94efac-dfce-454a-a761-7c45399b4de1.png" alt="Spotify Logo" className="logo" />
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
      const newBackgroundUrl = `${process.env.REACT_APP_DEFAULT_URL}/assets/${currentSong.cover}`;
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