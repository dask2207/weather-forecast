import React from 'react'

const TopButton = ({setQuery}) => {

    const cities = [
        {
            id:1,
            title: "Delhi"
        },
        {
            id:2,
            title: "Uttar Pradesh"
        },
        {
            id:3,
            title: "Goa"
        },
        {
            id:4,
            title: "Haryana"
        },
        {
            id:5,
            title: "Rajasthan "
        }
    ]


  return (
    <div className='flex text-center justify-around my-6'>
        {cities.map((city) => (
            <button key={city.id} className='text-white text-lg font-medium' onClick={()=> setQuery({q: city.title})}>{city.title}</button>
        ))}
    </div>
  )
}

export default TopButton;