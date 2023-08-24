import React from 'react'
import Table from '../table/Table'
import FilterHouses from './FilterHouses'
import HouseModal from './HouseModal'
import api from '../../utils/http-common'
import useRole from '@/utils/hooks/useRole'
import { toast } from 'react-toastify'

export default function HousesPage() {
    const userRole = useRole()
    const [houses, setHouses] = React.useState([])
    const [pagination, setPagination] = React.useState({page: 1, limit: 10, total: 0})
    const [loading, setLoading] = React.useState(true)
    const [editHouse, setEditHouse] = React.useState(null)
    const [showEditModal, setShowEditModal] = React.useState(false)
    const [selectedHouse, setSelectedHouse] = React.useState(null)
    const [showViewModal, setShowViewModal] = React.useState(false)
    const handleSetHouse = (key: string, value: any) => {
        setEditHouse({...editHouse as any, [key]: value})
    }

    const handleEditHouse = () => {
        api.put(`/house/${editHouse?._id as string}`, editHouse)
            .then(res => {
                console.log(res)
                setEditHouse(null)
                setShowEditModal(false)
                toast.success('House updated successfully')
            })
            .catch(err => {
                console.log(err)
            })
    }


    React.useEffect(() => {
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
    }, [])

  return (
    <div className='w-max h-max'>
        {editHouse &&
        <HouseModal
            open={showEditModal}
            setOpen={setShowEditModal}
            house={editHouse}
            handleSetHouse={handleSetHouse}
            onAction={handleEditHouse}
            />
        }
        <Table 
            filterComponent={<FilterHouses />}
            columns={[
                {label: "Location", key: 'address'},
                {label: "Price", key: 'price'},
                {label: "Status", key: 'status'},
                {label: "Bedrooms", key: 'bedrooms'},
                {label: "Bathrooms", key: 'bathrooms'},
                {label: "Levels", key: 'levels'},
            ]}
            data={loading ? [] : houses}
            actions={[
                ...(userRole === 'admin' ? [
                    {label: 'Edit', icon: null, onClick: (row: any) => {
                        // const {name, bedrooms, bathrooms, levels, description, images, price, address, status, occupant, createdAt, updatedAt} = row
                        setEditHouse(row)
                        setShowEditModal(true)
                    }}
                ] : [])
            ]}
            pagination={{
                ...pagination,
                onChange: (page) => {
                    setLoading(true)
                    api.get(`/house?page=${page}`)
                        .then(res => {
                            setHouses(res.data.data.houses)
                            setPagination(res.data.data.pagination)
                            setLoading(false)
                        })
                        .catch(err => {
                            console.log(err)
                            setLoading(false)
                        })
                }}
            }
        />
    </div>
  )
}
