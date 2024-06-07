import React, { useEffect, useState, useContext } from 'react';
import { SongContext } from '../context/songProvider';

const SongList = () => {
    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = React.useState(null)
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { setCurrentSong } = useContext(SongContext);

    useEffect(() => {
        fetch('https://cms.samespace.com/items/songs')
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
                            <div className="tabs" style={{ display: 'flex', padding: '10px 0' }}>
                                <h4 className="tab active" style={{ margin: 0, color: '#EDEADE', fontFamily: "Montserrat sans-serif", fontWeight: 'normal' }}>For You</h4>
                                <h4 className="tab" style={{ margin: 0, color: 'grey', fontFamily: "Montserrat sans-serif", fontWeight: 'normal' }}>Top Tracks</h4>
                            </div>
                            <div style={{ padding: '10px' }}>
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
                                        padding: '15px',
                                        fontSize: '15px',
                                        borderRadius: '5px',
                                        fontFamily: "Montserrat sans-serif",
                                        fontWeight: 'normal',
                                        color: '#EDEADE',
                                        width: '100%'
                                    }}
                                />
                            </div>
                        </div>

                        {filteredSongs.map(song => (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                position: 'relative',
                                backgroundColor: song.id === selectedSong?.id ? 'rgba(40, 40, 40, 0.8)' : '',
                                padding: '15px',
                                borderRadius: "12px"
                            }} key={song.id} onClick={() => playSong(song)}>
                                <img
                                    src={`https://cms.samespace.com/assets/${song.cover}`} alt="Small Image"
                                    style={{ marginRight: '20px', borderRadius: "50%" }}
                                    width="60"
                                    height="60"
                                />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <h5 style={{ fontSize: '20px', margin: '0', color: '#EDEADE', fontFamily: "Montserrat sans-serif", fontWeight: 'normal' }}>{song.name}</h5>
                                    <p style={{ fontSize: '14px', margin: '5px 0 0 0', color: 'grey', fontFamily: "Montserrat sans-serif", fontWeight: 'normal' }}>{song.artist}</p>
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '30px',
                                    right: '20px',
                                    fontSize: '16px',
                                    color: 'grey',
                                    fontFamily: "Montserrat sans-serif", fontWeight: 'normal'
                                }}>
                                    4:26
                                </div>
                            </div>

                        ))}

                    </>
                    : <></>
            }
        </>

    );
};

export default SongList;
