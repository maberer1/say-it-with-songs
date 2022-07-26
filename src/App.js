import { useState , useEffect } from 'react';
import './App.css';

function App() {

  const searchOptions = {
    key: process.env.REACT_APP_MUSIC_KEY,
    api: 'https://ws.audioscrobbler.com/2.0',
    endpoint: '/?method=track.search&track=',
    format: 'format=json',
};

  const [searchString, setSearchString] = useState("");
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getAllSongs()}

function getAllSongs(){
  const breakUpSearchString = searchString.split(" ");

  for (let i=0; i < breakUpSearchString.length; i++){
    fetchSongData(breakUpSearchString[i]);
  }
}

function fetchSongData(songName) {
const url = `${searchOptions.api}${searchOptions.endpoint}${songName}&api_key=${searchOptions.key}&${searchOptions.format}`;

  console.log(url)

  fetch(url) 
      .then(response => response.json())

      .then(data => {
          const filteredArray = data.results.trackmatches.track.filter(
          result => result.name.toLowerCase()===(songName.toLowerCase()));
          console.log(filteredArray)
          setResults(filteredArray);
          }
      )
        }

const randomArrayIndex = Math.floor(Math.random() * (results.length));

  return (
    <form onSubmit={handleSubmit} className="form-vertical">

        <h1>🥀 Say It With Songs 🥀</h1>
        <input
            id="title-input"
            className="input-field"
            placeholder="Playlist Title"
            type="text"
            name="playlistIdentifier"
            required
            value={playlistTitle}
            onChange={(e) => setPlaylistTitle(e.target.value)}
        />
        <br></br>
        <input
            id="message-input"
            className="input-field"
            placeholder="What do you want to say?"
            type="text"
            name="searchString"
            required
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
        />

        <br></br>

        <br></br>

        <div className="button-chunk">
            <button
                id="view-saved-playlists" 
                type="button">Saved Playlists
            </button>
            
            <button
                id="create-playlist" 
                type="submit"
                >Create Playlist
            </button>

        </div>

        <p>{ playlistTitle }</p>

        {results.map(result => {
          return(
                <div className='playlistDisplay' key={result.id}>
                    {results[randomArrayIndex].name} by {result.artist}
                </div>)
        }
        )
            }

        </form>
  );
}

export default App;