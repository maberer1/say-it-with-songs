import { useState } from 'react';
import './index.css';

function App() {

  // A simple, interactive interface that allows a user to create a playlist that uses song titles to display a custom meesage.

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

    async function getAllSongs(){
      // Break up searchString (entered message array) into array of individual words.
      const breakUpSearchString = searchString.split(" ");
    
      const newResults = [];
    
      // Loop through each individual word in the array to get a song for it.
      for (let i=0; i < breakUpSearchString.length; i++){
        newResults.push(await fetchSongData(breakUpSearchString[i]))
      }

      setResults(newResults)
    }

function fetchSongData(songName) {
const url = `${searchOptions.api}${searchOptions.endpoint}${songName}&api_key=${searchOptions.key}&${searchOptions.format}`;

  return fetch(url) 
      .then(response => response.json())

      .then(data => {
          let findSong
          const filteredArray = data.results.trackmatches.track.filter(
          result => result.name.toLowerCase()===(songName.toLowerCase()));
          const randomArrayIndex = Math.floor(Math.random() * (filteredArray.length));
          filteredArray[0] ? 
          findSong = (filteredArray[randomArrayIndex].name + " by " + filteredArray[randomArrayIndex].artist)
          : findSong = (songName + " ...soooo we couldn't find a song called " + songName + "... wanna write it?"); 
          console.log(findSong)
          return findSong;
      }) 
    }

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
                id="create-playlist" 
                type="submit"
                >Create Playlist
            </button>

        </div>

        <p>{playlistTitle && playlistTitle.toUpperCase()}</p>

        <ul>
          {results.map(result => {
            return <li>{result}</li>
          })}
        </ul>

        <p>Created by Madison Aberer</p>
        </form>
  );
}

export default App;