import React, { useContext,useEffect,useRef } from 'react'
import {Map,Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Markers from './Markers';
import { SourceCordiContext } from '@/context/SourceCordiContext';
import { UserLocationContext } from '@/context/UserLocation';
import { DestinationCordiContext } from '@/context/DestinationCordiContext';

const MapBoxMap = () => {
  const {userLocation,setUserLocation} = useContext(UserLocationContext)
  const {soruceCordinates,setSoruceCordinates} = useContext(SourceCordiContext)
  const {destinationCordinates,setDestinationCordinates} = useContext(DestinationCordiContext)

  const mapRef = useRef<any>()

  useEffect(() => {
    if (soruceCordinates) {
      mapRef.current?.flyTo({
        center: [soruceCordinates.lng, soruceCordinates.lat],
        duration: 2500,
      });
    }
  }, [soruceCordinates]);
  //Use to Fly to Destination Markers Location
  useEffect(() => {
    if (destinationCordinates) {
      mapRef.current?.flyTo({
        center: [destinationCordinates.lng, destinationCordinates.lat],
        duration: 2500,
      });
    }

    // if (soruceCordinates && destinationCordinates) {
    //   getDirectionRoute();
    // }
  }, [destinationCordinates]);
   //Newly Added
  //  const getDirectionRoute = async () => {
  //   const res = await fetch(process.env.MAPBOX_DRIVING_ENDPOINT +
  //       soruceCordinates.lng +
  //       "," +
  //       soruceCordinates.lat +
  //       ";" +
  //       destinationCordinates.lng +
  //       "," +
  //       destinationCordinates.lat +
  //       "?overview=full&geometries=geojson" +
  //       "&access_token=" +
  //       process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   const result = await res.json();
  //   console.log(result);
  //   console.log(result.routes);
  //   // setDirectionData(result);
  // };
  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-2">Map</h2>
      <div className="rounded-lg overflow-hidden"
      >
    
    
    {
      userLocation ? 
      (
        <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: userLocation?.lat,
        latitude: userLocation?.lng,
        // longitude: -100,
        // latitude: 40,
        zoom: 14
      }}
      style={{width: "100%", height: 450, borderRadius: 10}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      
       <Markers/>
    </Map>
      )
      :
      null
    }
      </div>
    </div>
  )
}

export default MapBoxMap