import React from 'react';

function Songs({ results }) {
    return (
        <ul id="song-list">
        {results.map(result => {
            return <li id="song">{result}</li>
        })}
        </ul>
    );
}

export default Songs;