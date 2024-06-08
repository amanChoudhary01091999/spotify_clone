import React, { useContext, useRef, useEffect, useState } from 'react';
import { SongContext } from '../context/songProvider';

const Player = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
    const { currentSong } = useContext(SongContext);
    const audioRef = useRef(null);


    useEffect(() => {
        if (currentSong && audioRef.current) {
            audioRef.current.src = currentSong.url;
            audioRef.current.play();
        }
    }, [currentSong]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        < >
            {
                isMobile ?
                    <>
                        {
                            currentSong &&
                            <div className="player">
                                <audio id="audioPlayer" ref={audioRef} controls className="player-audio"></audio>
                            </div>
                        }
                    </> : <>
                        <div className="player">
                            {
                                currentSong &&
                                <>
                                    <div className="player-text">
                                        <h5>{currentSong.name}</h5>
                                        <p>{currentSong.artist}</p>
                                    </div>
                                    <div className="player-content">
                                        <img className="player-cover" src={`${process.env.REACT_APP_DEFAULT_URL}/assets/${currentSong.cover}`} alt={currentSong.name} />
                                        <audio id="audioPlayer" ref={audioRef} controls className="player-audio"></audio>
                                    </div>
                                </>
                            }

                        </div>

                    </>
            }
        </>
    )

};

export default Player;
