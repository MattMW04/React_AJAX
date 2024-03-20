import React from "react";
import ResultComponent from "./ResultComponent.js";
import ArtistComponent from "./artistComponent.js";


function ArtistSearch() {
    const [currentArtist, setArtist] = React.useState("Please Enter an Artist");
    const [ajaxResults, setResults] = React.useState([]);
    const [errormsg, setmsg] = React.useState();

    
    return(
        <div>
            <ArtistComponent updateStateName={updateStateName}/>
            <input type='button' value='search' onClick={searchArtistName}/>
            <ResultComponent ajaxResults={ajaxResults} errormsg={errormsg}/>
        </div>
    );
    function updateStateName(){
        setArtist(document.getElementById('Aname').value);

    }

    async function searchArtistName(){

        const response = await fetch(`http://localhost:3001/ArtistSongs/${currentArtist}`);

        setmsg(`http status code ${response.status}`);
        switch(response.status){
            case(200):
                const responseJson = await response.json();
                // set state variable to response (mapped later)
                setResults(responseJson);
                // set results to display and error message div to no display
                document.getElementById("results").style.display= "initial";
                document.getElementById("error").style.display= "none";
                break
            case(400):
                document.getElementById("error").style.display= "initial";
                document.getElementById("results").style.display="none";
                setmsg("Error 400: Your HTTP request was invalid.");
                break
            case(404):
                document.getElementById("error").style.display = "initial";
                document.getElementById("results").style.display="none";
                setmsg("Error 404: Requested Artist could not be found");
                break
            case(500):
                document.getElementById("error").style.display= "initial" ;
                document.getElementById("results").style.display="none";
                setmsg("Error 500: Internal Server Error (puter said no)");
                break
        }
    }
}

export default ArtistSearch;