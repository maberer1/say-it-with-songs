import { useState , useEffect } from 'react';
import './App.css';

function App() {

  const searchOptions = {
    key: process.env.REACT_APP_MUSIC_KEY,
    api: 'https://ws.audioscrobbler.com/2.0',
    endpoint: '/?method=track.search&track=',
    format: 'format=json',
    songName: 'Believe',
};

  const [searchString, setSearchString] = useState("");
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlist, setPlaylist] = useState({});
  const [results, setResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlaylist({ playlistTitle, searchString });
    console.log(playlist);
}

const breakUpSearchString = searchString.split(" ");

console.log(breakUpSearchString)
console.log(breakUpSearchString[1])

useEffect(() => {

  const url = `${searchOptions.api}${searchOptions.endpoint}${searchOptions.songName}&api_key=${searchOptions.key}&${searchOptions.format}`;

  console.log(url)

  fetch(url) 
      .then(response => response.json())

      .then(data => {
          setResults(data.results.trackmatches.track);
          }
      )
}, []);

console.log(results)

const filteredArray = results.filter(
  result => result.name===(searchOptions.songName));

  console.log(filteredArray)

const randomArrayIndex = Math.floor(Math.random() * (filteredArray.length));

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

        {results[0] 
                && 
                <div className='playlistDisplay'>
                    {filteredArray[randomArrayIndex].name} by {filteredArray[randomArrayIndex].artist}
                </div>
            }

        <p>{ playlistTitle }</p>
        <p>{ searchString }</p>
        <p>hello</p>

        </form>
  );
}
export default App;