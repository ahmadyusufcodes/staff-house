import React from 'react'
import api from '../../utils/http-common'
export default function MyHouses() {
    const [houses, setHouses] = React.useState([])
    React.useEffect(() => {
        api.get('/house', {
            params: {
                my_houses: true
            }
        })
        .then(res => {
            setHouses(res.data.data.houses)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
  return (
    <div>
        <h1 className='text-xl'>My Houses</h1>
        <div className='grid grid-cols-3 gap-4'>
            {houses.map(house => (
                <div className='bg-white rounded-lg shadow-lg p-4'>
                    <img src={house.image} alt={house.name} className='rounded-lg'/>
                    <h2 className='text-xl'>{house.name}</h2>
                    <p>{house.description}</p>
                    <p>{house.price}</p>
                </div>
            ))}
        </div>
    </div>
    )
}
