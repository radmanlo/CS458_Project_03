import React from "react";
import { useMemo, useState } from "react";
import { GoogleMap, DistanceMatrixService, useLoadScript, Marker, InFoWindow,} from "@react-google-maps/api"
import { findByLabelText } from "@testing-library/react";

const mapContainerStyle = {
    width: "80vw",
    height: "100vh"
};

export default function App(){
  const [moonDis, setMoonDis] = useState(0);
  const [position, center] = useState({
    lat: 39.933365,
    lng: 32.859741,
  });
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: "AIzaSyDm89aBFc66paInqWQOz8Z7OxPm79Xh6ws",
  });
    //if (loadError) return "Error loading Maps"
    //if (!isLoaded) return "Is loading..."

  function askedCor() {
    if ( document.getElementById("Latitude1").value != "" && document.getElementById("Longitude1").value != ""){
        var lat = document.getElementById("Latitude1").value;
        var lng = document.getElementById("Longitude1").value;
        if ((lat <= 90 && lat >= -90) && (lng <= 180 && lng >= -180)){
          const newCenter ={
            lat: parseFloat(document.getElementById("Latitude1").value),
            lng: parseFloat(document.getElementById("Longitude1").value),
          };
          center(newCenter);
        }
        else
          alert ("invalid latitude or longitude") 
    }
    else {
        alert ("Latidude or Longitude leaves empty ")
    }
  }

  function userCoordinate(){
    
    if ("geolocation" in navigator) {
        console.log("Available");
    } 
    else {
        console.log("Not Available");
    }
    navigator.geolocation.getCurrentPosition(function(position) {
        var userLat = parseFloat(position.coords.latitude);
        var userLng = parseFloat(position.coords.longitude);
        var NorthPoleLat = 64.750328; // latitude of north pole
        var NorthPoleLng = -147.354187; // longitude of north poad
        var R = 6371.0710; // Radius of the Earth in KM
        var rlat1 = userLat * (Math.PI/180); // Convert degrees to radians
        var rlat2 = NorthPoleLat * (Math.PI/180); // Convert degrees to radians
        var difflat = rlat2-rlat1; // Radian difference (latitudes)
        var difflon = (NorthPoleLng-userLng) * (Math.PI/180); // Radian difference (longitudes)
        var d = parseInt(2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2))));
        alert('Your distance to the Geographic North Pole is  ' + d + '  KM');
    });
  }

  function moonDistance(){
    if ( document.getElementById("Latitude2").value != "" ){
        var lat = document.getElementById("Latitude2").value;
        var lng = document.getElementById("Longitude2").value;
        var SunCalc = require('suncalc');
        var times = SunCalc.getTimes(new Date(), lat, lng);
        var objDistance = SunCalc.getMoonPosition(times.sunrise, lat, lng); 
        setMoonDis(objDistance.distance);
        //alert("Coordinate with Latitude: " + lat + " and Longitude: " + lng + " Has " +  
        //        objDistance.distance + " Distance from Moon");
    }
    else{
        navigator.geolocation.getCurrentPosition(function(position){
            var userLat = parseFloat(position.coords.latitude);
            var userLng = parseFloat(position.coords.longitude);
            var SunCalc = require('suncalc');
            var times = SunCalc.getTimes(new Date(), userLat, userLng);
            var objDistance = SunCalc.getMoonPosition(times.sunrise, userLat, userLng); 
            setMoonDis(objDistance.distance);
            //alert(" Your Device has " + objDistance.distance + " Distance from Moon");
        });
    }
  }

  return(
    <div className= "App" style={{display:"flex", height:"100vh"}}>
      <div style={{width: "20%", padding: "1rem", background: "#14161a", color: "#fff"}}>
        <h1 data-testid="headTask" style={{color:"tomato", textAlign:"center"} }>
          Tasks
        </h1>
        <div style={{background:"#383838"}}>
          <h3 data-testid="headCor" style={{textAlign:"center"}}>
            Your Desired Cordinate
          </h3>
          <div style={{ color:"black", marginTop:"1vh", textAlign:"center", marginBottom: "2vh"}}>
              <input data-testid="latitudeIn1" da type= "number" id="Latitude1" placeholder="Latitude" style={{ blockSize:"3vh", background:""}}></input>   
              <input data-testid="longitudeIn1" type= "number" id="Longitude1" placeholder="Longitude" style={{ blockSize:"3vh"}}></input>   
          </div>
          <div style={{textAlign:"center"}}>
            <text >Current Map center</text>
          </div>
          <div style={{textAlign:"center"}}> 
            <output data-testid="outLat" style={{color:"white"}}>{position.lat}</output>
            <text> , </text>
            <output data-testid="outLng" style={{color:"white"}}>{position.lng}</output>
          </div>
          <div style={{textAlign:"center"}}>
              <button data-testid="findBtn" id="Submit1" typeof="submit" style={{ width:"100px", marginTop:"4vh", marginBottom:"2vh"}}
                      onClick={askedCor}>Find Location</button>
          </div>
        </div>
        <div style={{background:"#383838", marginTop:"5vh", textAlign:"center"}}>
          <div>
            <button data-testid="poleBtn" id="Submit2" typeof="submit"style={{width:"200px", marginTop:"1vh", marginBottom:"1vh"}}
                    onClick={userCoordinate}>Your Device Location Distance to the Geographic North Pole</button>
          </div>
        </div>
        <div style={{background:"#383838", marginTop:"5vh", textAlign:"center"}}>
          <h3 data-testid="headMoon">Calculating Distance To moon</h3>
          <div style={{ color:"black", marginTop:"1vh"}}>
              <input data-testid="latMoon" type= "number" id="Latitude2" placeholder="Latitude"  style={{ blockSize:"3vh", background:""}}></input>   
              <input data-testid="lngMoon" type= "number" id="Longitude2" placeholder="Longitude" style={{ blockSize:"3vh"}}></input>   
          </div>
          <h6>
              (if latitude and longitude leaves empty it will use your device coordinate)
          </h6>         
          <div><text>Distance to Moon: </text></div>
          <div>
            <output data-testid="outDis" style={{color:"white"}}>{moonDis}</output>
          </div>
          <div>
            <button data-testid="moonBtn" id="Submit3" typeof="submit" style={{ width:"200px", marginTop:"1vh", marginBottom:"2vh"}}
                    onClick={moonDistance}>Calculate the Distance to Moon</button>
          </div>
        </div>
      </div>
      <div>
        {isLoaded?(
          <GoogleMap 
          mapContainerStyle={mapContainerStyle} 
          zoom={12} 
          center={position}
          ></GoogleMap>
        ):(
          <></>
        )}
      </div>
    </div>
    
  )
}