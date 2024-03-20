import React from 'react';

function ResultComponent({ajaxResults,errormsg}){

    const resHtml = ajaxResults.map(song => <li key={song.id}>Title={song.title}, year={song.year}, downloads={song.downloads}, price = {song.price} </li>); 
    return(
        <div>
            <div id="results">{resHtml}</div>
            <div id="error">{errormsg}</div>
        </div>
    );
    

}

export default ResultComponent;