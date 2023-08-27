"use client"
import { DestinationCordiContext } from '@/context/DestinationCordiContext'
import { SourceCordiContext } from '@/context/SourceCordiContext'
import React,{useState,useEffect, useContext} from 'react'
const session_token='5ccce4a4-ab0a-4a7c-943d-580e55542363'
const MAPBOX_RETRIVE_URL='https://api.mapbox.com/search/searchbox/v1/retrieve/'
const AutoCompleteAddress = () => {
    
    const [source,setSource] = useState<any>()
    const [destination,setDestination] = useState<any>()
    const [sourceChange,setSourceChange] = useState<any>(false)
    const [destinationChange,setDestinationChange] = useState<any>(false)
    const [addressList,setAddressList] = useState<any>([])
    const {soruceCordinates,setSourceCordinates} = useContext(SourceCordiContext)
    const {destinationCordinates,setDestinationCordinates} = useContext(DestinationCordiContext)
      
    const getAddress = async () =>{
      setAddressList([]);
      const query=sourceChange?source:destination;
      const res=await fetch('/api/search-address?q='+query,{
          headers:{
              "Content-Type": "application/json",  
      }
      });

      const result=await res.json();
      setAddressList(result)
    }

    useEffect(() => {
        const delayDebounceFun = setTimeout(() => {
            getAddress()
        }, 1000);

        return () => clearTimeout(delayDebounceFun)
    }, [source,destination])
    
   const onSourceAddressHandler = async (item:any) =>{
    setSource(item.full_address);
    setAddressList([]);
    setSourceChange(false)
    const res=await fetch(MAPBOX_RETRIVE_URL+item.mapbox_id
      +"?session_token="+session_token
      +"&access_token="+process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN)
  
      const result=await res.json();
  
        setSourceCordinates({
            lng:result.features[0].geometry.coordinates[0],
            lat:result.features[0].geometry.coordinates[1], 
        })
  console.log(result);

   }

   const onDestinationAddressHandler=async(item:any)=>{
    setDestination(item.full_address);
    setAddressList([]);
    setDestinationChange(false)
    const res=await fetch(MAPBOX_RETRIVE_URL+item.mapbox_id
        +"?session_token="+session_token
        +"&access_token="+process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN)
    
    const result=await res.json();
    
    setDestinationCordinates({
        lng:result.features[0].geometry.coordinates[0],
        lat:result.features[0].geometry.coordinates[1], 
    })
    console.log(result);
}

  return (
    <div className="mt-5">
        <div className="mt-2 mb-2 relative">
            <label 
              htmlFor="" 
              className="text-gray-500">
                Where From?
             </label>
            <input 
              type="text"
              value={source}
              onChange={(e)=>{
                setSource(e.target.value);
                setSourceChange(true)
            }}
              className="bg-white p-1 border-2 w-full rounded-md focus:border-yellow-300 outline-none" />
        </div>
       {
        addressList?.suggestions&&sourceChange?
        <div className="w-full bg-white absolute shadow-md p-1 rounded">
          {
            addressList?.suggestions.map((item:any,index:number)=>(
               <h2 
               className="p-2 hover:bg-gray-100 cursor-pointer"
               onClick={()=>{onSourceAddressHandler(item)}}
               >
                {item.full_address}
                </h2>
            ))
        }
        </div> : null
       }
        
        <div className="mt-5">
            <label 
              htmlFor="" 
              className="text-gray-500">
                Where To?
             </label>
            <input 
              type="text"
              value={destination}
              onChange={(e)=>{
                setDestination(e.target.value);
                setDestinationChange(true)
              }}
              className="bg-white p-1 border-2 w-full rounded-md focus:border-yellow-300 outline-none" />
        </div>
        {
        addressList?.suggestions&&destinationChange?
        <div className="w-full bg-white absolute shadow-md p-1 rounded">
          {
            addressList?.suggestions.map((item:any,index:number)=>(
               <h2 
               className="p-2 hover:bg-gray-100 cursor-pointer"
               onClick={()=>{
                onDestinationAddressHandler(item)
              }}
               >
                {item.full_address}
                </h2>
            ))
        }
        </div> : null
       }

    </div>
  )
}

export default AutoCompleteAddress