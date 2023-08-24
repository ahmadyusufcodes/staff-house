import React, { useMemo } from 'react'
import Table from '../table/Table'
import FilterHouses from './FilterHouses'
import HouseModal from './HouseModal'
import api from '../../utils/http-common'
import useRole from '@/utils/hooks/useRole'
import { toast } from 'react-toastify'
import { IHouse } from '@/utils/types/house'
import Image from 'next/image'
import Modal from '../modal/Modal'
import { decodeToken } from '../../utils/jwt_utils'
import { useRouter } from 'next/router'

export default function HousesPage() {
    const userRole = useRole()
    const [houses, setHouses] = React.useState([])
    const [pagination, setPagination] = React.useState({page: 1, limit: 10, total: 0})
    const [loading, setLoading] = React.useState(true)
    const [editHouse, setEditHouse] = React.useState(null)
    const [showEditModal, setShowEditModal] = React.useState(false)
    const [selectedHouse, setSelectedHouse] = React.useState(null)
    const [showViewModal, setShowViewModal] = React.useState(false)
    const router = useRouter()

    const handleSetHouse = (key: string, value: any) => {
        setEditHouse({...editHouse as any, [key]: value})
    }

    const handleEditHouse = () => {
      api
        .put(`/house/${editHouse?._id as string}`, editHouse)
        .then((res) => {
          console.log(res);
          setEditHouse(null);
          setShowEditModal(false);
          toast.success("House updated successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const handleFetchHouses = () => {
        api.get('/house')
            .then(res => {
                setHouses(res.data.data.houses)
                console.log(res.data.data.houses)
                setPagination(res.data.data.pagination)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    React.useEffect(() => {
        handleFetchHouses()
    }, [])

    const handleSendRequest = (house: IHouse) => {
        api.post('/request', {house: house._id})
            .then(res => {
                console.log(res)
                toast.success('Request sent successfully')
                handleFetchHouses()
            })
            .catch(err => {
                console.log(err)
                toast.error('Error sending request')
            })
    }
    

  return (
    <div className='w-[90vw] gap-4 grid grid-cols-4'>
        { 
        houses.map((item, index) => (
            <HouseComp house={item} handleRequest={handleSendRequest} key={index} />
        ))
        }
    </div>
  )
}

const HouseComp = (
    {house, handleRequest}: {
    house: IHouse,
    handleRequest?: (house: IHouse) => void
}) => {
    const [enlarge, setEnlarge] = React.useState(false)
    const [selectedHouse, setSelectedHouse] = React.useState(0)
    const router = useRouter()
    const decodeTokenData = useMemo(() => {
        if (!router.isReady) return null;
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          const decoded = decodeToken(token as string);
          return  decoded.user
        }
    }, [router.isReady]);

    return (
      <div className="flex flex-col w-full rounded-lg shadow-md space-y-2 p-2">
        <Modal open={enlarge} setOpen={() => setEnlarge(false)}>
          <div className="flex relative min-h-[50vh] w-full">
            <button
              onClick={() => setSelectedHouse(selectedHouse - 1)}
              disabled={selectedHouse === 0}
              className="absolute disabled:opacity-0 shadow-md top-1/2 z-30 left-0 transform -translate-y-1/2 bg-gray-300 rounded-full p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#000"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="relative w-[600px] h-[400px] mx-auto overflow-hidden">
              <img
                src={house.images[selectedHouse] || "/default image.jpeg"}
                className="rounded shadow-md"
                alt="Image"
                // layout="fill"
                // objectFit="cover"
              />
            </div>
            <button
              onClick={() => setSelectedHouse(selectedHouse + 1)}
              disabled={selectedHouse === house.images.length - 1}
              className="absolute disabled:opacity-0 shadow-md top-1/2 right-0 transform -translate-y-1/2 bg-gray-300 rounded-full p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#000"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col space-y-2 mt-6 pb-3">
            <h1 className="text-lg font-semibold">₦{house.price}</h1>
            <h1 className="text-lg font-semibold">{house.name}</h1>
            <h2 className="text-sm text-gray-500">{house.description}</h2>
            <p className="text-xs text-gray-500">
              {house.levels} Level{house.levels > 1 && "s"} {house.bedrooms}{" "}
              Bedroom{house.bedrooms > 1 && "s"} Flat, {house.bathrooms}{" "}
              Bathroom{house.bathrooms > 1 && "s"}
            </p>
            <p className="text-xs text-gray-500">Located at {house.address}</p>
          </div>
          <div className="pb-6">
            {house.requests.includes(decodeTokenData._id) ? (
              <button
                // onClick={() => handleRequest && handleRequest(house)}
                className="text-white text-xs bg-gray-300 px-6 py-3 rounded-full"
              >
                Request Sent
              </button>
            ) : (
              <button
                onClick={() => handleRequest && handleRequest(house)}
                className="text-white text-xs bg-blue-500 px-6 py-3 rounded-full"
              >
                Request
              </button>
            )}
          </div>
        </Modal>
        <div className="relative h-56 overflow-hidden rounded-lg">
          <img
            src={house.images[0] || "/default image.jpeg"}
            alt="Image"
            className="absolute inset-0 w-[600px] h-[600px] object-cover"
          />
        </div>
        <div className="flex flex-col space-y-2 px-4 pb-3">
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold">₦{house.price}</h1>
            <button
              onClick={() => setEnlarge(true)}
              className="text-xs text-white bg-blue-500 px-2 py-1 rounded-md"
            >
              View
            </button>
          </div>
          <h2 className="text-sm text-gray-500">{house.description}</h2>
          <p className="text-xs text-gray-500">{house.address}</p>
        </div>
      </div>
    );
}