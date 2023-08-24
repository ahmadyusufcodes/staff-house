import React from 'react'
import Table from '../table/Table'
import FilterStaff from './FilterStaff'
import StaffModal from './StaffModal'
import api from '../../utils/http-common'
import { toast } from 'react-toastify'

export default function HousesPage() {
    const [staff, setStaff] = React.useState([])
    const [pagination, setPagination] = React.useState({page: 1, limit: 10, total: 0})
    const [loading, setLoading] = React.useState(true)
    const [editStaff, setEditStaff] = React.useState(null)
    const [showEditModal, setShowEditModal] = React.useState(false)
    const handleSetStaff = (key: string, value: any) => {
        setEditStaff({...editStaff, [key]: value})
    }

    const handleEditHouse = () => {
        api.put(`/staff/${editStaff._id}`, editStaff)
            .then(res => {
                console.log(res)
                setEditStaff(null)
                setShowEditModal(false)
                toast.success('House updated successfully')
                fetchStaff()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const fetchStaff = () => {
        api.get('/staff')
            .then(res => {
                setStaff(res.data.data.staffs)
                console.log(res.data.data.staffs)
                setPagination(res.data.data.pagination)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    React.useEffect(() => {
        fetchStaff()    
    }, [])

  return (
    <div className='w-max h-max'>
        {editStaff &&
        <StaffModal
            open={showEditModal}
            setOpen={setShowEditModal}
            staff={editStaff}
            handleSetStaff={handleSetStaff}
            onAction={handleEditHouse}
            />
        }
        <Table 
            filterComponent={<FilterStaff />}
            columns={[
                {label: "Name", key: "name"},
                {label: "Position", key: "position"},
                {label: "Email", key: "email"},
                {label: "Phone", key: "phone"},
                {label: "Address", key: "address"},
            ]}
            data={loading ? [] : staff}
            actions={[
                {label: 'Edit', icon: null, onClick: (row) => { 
                    // const {name, bedrooms, bathrooms, levels, description, images, price, address, status, occupant, createdAt, updatedAt} = row
                    setEditStaff(row)
                    setShowEditModal(true)
                }
            }
            ]}
            pagination={{
                ...pagination,
                onChange: (page) => {
                    setLoading(true)
                    api.get(`/staff?page=${page}`)
                        .then(res => {
                            setStaff(res.data.data.houses)
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
