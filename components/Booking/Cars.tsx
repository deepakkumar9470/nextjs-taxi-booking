"use client"
import React,{useState} from 'react'
import CarsList from '@/data/CarsList'
import Image from 'next/image'
const Cars = () => {
    const [selectedCar,setselectedCar] = useState<any>()
  return (
    <div className="mt-2">
        <h2 className="text-xl font-semibold">Select a Car</h2>

        <div  className="grid grid-cols-3">
            {
                CarsList.map((item:any,index:number)=>{
                    return (
                        <div 
                             key={index} 
                             className={`m-2 p-2 border-[2px] rounded-md cursor-pointer hover:border-yellow-400 ${selectedCar == index ? 'border-yellow-400 border-2' :null}`}
                             onClick={()=>setselectedCar(index)}
                             >
                            <Image 
                               className="w-full object-contain" 
                               src={item.image} 
                               width={75} 
                               height={90} 
                               alt={item.name}/>
                               <div className='flex justify-between px-2 mt-1'>
                               <h2 className="text-[12px] text-gray-400 font-bold">{item.name}</h2>
                               <span className="text-[10px] text-black font-semibold">{item.charges*8} $</span>
                               </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Cars