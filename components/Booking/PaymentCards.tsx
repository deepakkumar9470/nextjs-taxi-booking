import React from 'react'
import CardsList from '@/data/CardsList'
import Image from 'next/image'

const PaymentCards = () => {
  return (
    <div>
        <h2 className="text-base font-medium">Payment Method</h2>

        <div className="grid grid-cols-5 mt-2">
            {
                CardsList.map((item:any,index:number)=>{
                    return (
                        <div 
                        key={index}                         
                        className="w-[50px] flex items-center justify-center 
                                  rounded-md cursor-pointer border-2 
                                  hover:border-yellow-400
                                  hover:scale-110 transition-all px-1">
                            <Image 
                              src={item.image} 
                              width={30} 
                              height={30} 
                              alt={item.name}/>

                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default PaymentCards