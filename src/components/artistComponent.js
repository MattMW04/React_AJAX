import React from 'react';

function ArtistComponent({updateStateName}){

    function updateArtist(){
        const artistName = document.getElementById('Aname').value;
        updateStateName(artistName);
    }

    return(
        <div>
            <h1>Enter the name of your artist</h1>
            <input id='Aname' type='text' onChange={updateArtist} />
        </div>
    );


    
}

export default ArtistComponent;