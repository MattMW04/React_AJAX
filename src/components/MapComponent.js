import React from 'react';
import 'leaflet';

function LeafletMap({lat1, lon1}) {
    const map = React.useRef(null);
    const [lat, setLat] = React.useState(lat1 || 51.05);
    const [lon, setLon] = React.useState(lon1 || -0.72);
    const [placeResults, setResults] = React.useState([]);

    React.useEffect( ()=> {
        // As effect will run only once, there is no need to check if map.current is null
        map.current = L.map("map1");

        

        // Set the map up in the normal way
        L.tileLayer
        ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: "Copyright OSM contributors, ODBL" } ).addTo(map.current);
        const pos = [lat, lon];    
        map.current.setView(pos, 14);

        // Handle the map moveend event by updating the state appropriately
        map.current.on("moveend", e=> {
            const centre = map.current.getCenter();
            setLat(centre.lat);
            setLon(centre.lng);
        });
    },[]);




    return(
        <div>
        Lat: <input id='lat' />
        Lon: <input id='lon' />
        <input type='button' value='go' onClick={setPos} />
        <p>Map centred at: {lat} {lon}</p>

        Location: <input id='location'/>
        <input type='button' value='go' onClick={searchPlace} />
        <div id="map1" style={{width:"800px", height:"600px"}}></div>
        </div>
    );
    
    function setPos() {
        const lt = document.getElementById('lat').value;
        const lng = document.getElementById('lon').value;
        setLat(lt);
        setLon(lng);
        map.current.setView([lt, lng], 14);
    }
    function setPlaceValue(){
        const p = document.getElementById('location').value;
        setPlace(p);
    }
    async function searchPlace(){
        const place = document.getElementById("location").value;
        const response = await fetch(`https://hikar.org/webapp/nomproxy?q=${place}`)
        switch(response.status){
            case(200): 
                const results = await response.json();
                console.log(results.pois[0]);
                setLat(results.pois[0].lat);
                setLon(results.pois[0].lon);
                
                setResults(results.pois);
                
                

                break 


        }
        


    }
}

export default LeafletMap;