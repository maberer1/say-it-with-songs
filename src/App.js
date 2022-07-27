import { useState } from 'react';
import './App.css';

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

function getAllSongs(){
  // Break up searchString (entered message array) into array of individual words.
  const breakUpSearchString = searchString.split(" ");
  console.log(breakUpSearchString + " <<< breakUpSearchString")
  console.log(fetchSongData + " <<< fetchSongData function")

  const newResults = [];

  // Loop through each individual word in the array to get a song for it.
  for (let i=0; i < breakUpSearchString.length; i++){
    let songInfo = (fetchSongData(breakUpSearchString[i]))
    console.log(songInfo + " <<< songInfo")
    newResults.push(songInfo)
    console.log(newResults + " <<< newResults")
  }
  // setState for results
  setResults(newResults)
  console.log(results)
}

function fetchSongData(songName) {
const url = `${searchOptions.api}${searchOptions.endpoint}${songName}&api_key=${searchOptions.key}&${searchOptions.format}`;

let findSong

  fetch(url) 
      .then(response => response.json())

      // Returns a string within an array
      .then(data => {
          
          const filteredArray = data.results.trackmatches.track.filter(
          result => result.name.toLowerCase()===(songName.toLowerCase()));
          const randomArrayIndex = Math.floor(Math.random() * (filteredArray.length));
          filteredArray[0] ? 
          findSong = (filteredArray[randomArrayIndex].name + " by " + filteredArray[randomArrayIndex].artist)
          : findSong = (songName + " ...soooo we couldn't find a song called " + songName + "... wanna write it?");
          console.log(findSong)
      })
      return findSong;
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
                id="view-saved-playlists" 
                type="button">Saved Playlists
            </button>
            
            <button
                id="create-playlist" 
                type="submit"
                >Create Playlist
            </button>

        </div>

        <p>{playlistTitle && playlistTitle.toUpperCase()}</p>

        </form>
  );
}

export default App;