import React, { useContext, useRef, useEffect } from 'react';
import { SongContext } from '../context/songProvider';

const Player = () => {
    const { currentSong } = useContext(SongContext);
    const audioRef = useRef(null);


    useEffect(() => {
        if (currentSong && audioRef.current) {
            audioRef.current.src = currentSong.url;
            audioRef.current.play();
        }
    }, [currentSong]);


    return (
        <div className="player" style={{ marginTop: "10vh" }}>
            {currentSong ? (
                <>
                    <div className="player-text">
                        <h5>{currentSong.name}</h5>
                        <p>{currentSong.artist}</p>
                    </div>
                    <div className="player-content">
                        <img className="player-cover" src={`https://cms.samespace.com/assets/${currentSong.cover}`} alt={currentSong.name} />

                        <audio id="audioPlayer" ref={audioRef} controls className="player-audio"></audio>
                    </div>
                </>
            ) : <></>
            }
        </div>)

};

export default Player;
