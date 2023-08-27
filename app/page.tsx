"use client"
import { useState ,useEffect} from 'react';

import Booking from '@/components/Booking/Booking'
import MapBoxMap from '@/components/Map/MapBoxMap';
import { UserLocationContext } from '@/context/UserLocation';
import { SourceCordiContext } from '@/context/SourceCordiContext';
import { DestinationCordiContext } from '@/context/DestinationCordiContext';

export default function Home() {
  const [userLocation,setUserLocation] = useState<any>()
  const [soruceCordinates,setSourceCordinates] = useState<any>([])
  const [destinationCordinates,setDestinationCordinates] = useState<any>([])
  const getUserLocation = async()=>{
    navigator.geolocation.getCurrentPosition((pos)=>{
      console.log(pos)
      setUserLocation({
        lat : pos.coords.latitude,
        lng : pos.coords.longitude,
      })
    })
  }


  useEffect(() => {
    getUserLocation()
  }, [])
  
  return (
    <div>
      <UserLocationContext.Provider value={{userLocation,setUserLocation}}>
       <SourceCordiContext.Provider value={{soruceCordinates,setSourceCordinates}} >
       <DestinationCordiContext.Provider value={{destinationCordinates,setDestinationCordinates}} >
      
       <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="">
            <Booking/>
            </div>

            <div className="col-span-2">
              <MapBoxMap/>
            </div>
       </div>
       </DestinationCordiContext.Provider>
       </SourceCordiContext.Provider>
      </UserLocationContext.Provider>
       
    </div>
  )
}
