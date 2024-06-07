import React, { useEffect, useState, useContext } from 'react';
import { SongContext } from '../context/songProvider';

const SongList = () => {
    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = React.useState(null)
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { setCurrentSong } = useContext(SongContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_DEFAULT_URL}/items/songs`)
            .then(response => response.json())
            .then(data => {
                setSongs(data.data);
                setFilteredSongs(data.data);
            })
    }, []);
    const playSong = (song) => {
        setCurrentSong(song);
        setSelectedSong(song)
    };
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = songs.filter(song =>
            song.name.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)
        );
        setFilteredSongs(filtered);
    };

    return (
        <>
            {
                filteredSongs.length > 0 ?
                    <>

                        <div style={{ position: 'sticky', zIndex: 1000, top: 0 }}>
                            <div className="tabs-container">
                                <div className="tabs" style={{ display: 'flex', padding: '0.635rem 0' }}>
                                    <h4 className="tab active" style={{ margin: 0, color: '#EDEADE', fontFamily: "Montserrat sans-serif", fontWeight: 'normal' }}>For You</h4>
                                    <h4 className="tab" style={{ margin: 0, color: 'grey', fontFamily: "Montserrat sans-serif", fontWeight: 'normal' }}>Top Tracks</h4>
                                </div>
                                <div style={{ padding: '0.625rem' }}>
                                    <input
                                        type="text"
                                        placeholder="Search song, artist..."
                                        className="search-bar"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        style={{
                                            backgroundColor: 'rgba(40, 40, 40, 0.8)',
                                            border: 'none',
                                            outline: 'none',
                                            padding: '0.938rem',
                                            fontSize: '0.938rem',
                                            borderRadius: '0.313rem',
                                            fontFamily: "Montserrat sans-serif",
                                            fontWeight: 'normal',
                                            color: '#EDEADE',
                                            width: '100%'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='songListDiv'>

                            {filteredSongs.map(song => (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    position: 'relative',
                                    backgroundColor: song.id === selectedSong?.id ? 'rgba(40, 40, 40, 0.8)' : '',
                                    padding: '0.938rem',
                                    borderRadius: "0.75rem"
                                }} key={song.id} onClick={() => playSong(song)}>
                                    <img
                                        src={`${process.env.REACT_APP_DEFAULT_URL}/assets/${song.cover}`} alt="Small Image"
                                        style={{ marginRight: '1.25rem', borderRadius: "50%" }}
                                        width="60"
                                        height="60"
                                    />
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <h5 style={{ fontSize: 'calc(1rem + 0.2vw)', margin: '0', color: '#EDEADE', fontFamily: "Montserrat sans-serif", fontWeight: 'normal' }}>{song.name}</h5>
                                        <p style={{ fontSize: 'calc(0.5rem + 0.2vw)', margin: '0.313rem 0 0 0', color: 'grey', fontFamily: "Montserrat sans-serif", fontWeight: 'normal' }}>{song.artist}</p>
                                    </div>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '1rem',
                                        marginBottom: '1rem',
                                        right: '1.25rem',
                                        fontSize: 'calc(0.5rem + 0.2vw)',
                                        color: 'grey',
                                        fontFamily: "Montserrat sans-serif", fontWeight: 'normal'
                                    }}>
                                        4:26
                                    </div>
                                </div>

                            ))}
                        </div>

                    </>
                    : <></>
            }
        </>

    );
};

export default SongList;
