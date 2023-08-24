import React from 'react'
import { decodeToken } from '@/utils/jwt_utils'
import { useRouter } from 'next/router'
import Tab from '../../components/tabs/Tab'
import useRole from '../../utils/hooks/useRole'
import StaffPage from '../../components/view/StaffPage'
import HousesPage from '@/components/view/HousesPage'
import StaffHousesPage from '@/components/view/StaffHousePage'
import RequestsPage from '@/components/view/RequestsPage'
import MyHouses from '@/components/view/MyHouses'

export default function index() {
    const router = useRouter()
    const [activeTab, setActiveTab] = React.useState("houses")
    const userRole = useRole()

    React.useEffect(() => {
        console.log(userRole)
    }, [userRole])

    React.useEffect(() => {
        if(!router.isReady) return
        const token = localStorage.getItem('token')
        const decoded = decodeToken(token as string)
        console.log(decoded.user.role as string)
    }, [router.isReady])
  return (
    <div className="flex flex-col items-start px-16 justify-start min-h-screen w-full min-h-screen py-16 bg-gray-50">
        <Tab 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[
            {
                label: "Houses",
                component:  userRole === "admin" ? <HousesPage /> : <StaffHousesPage />
            },
            ...(userRole === "staff" ? [{
                label: "My Houses",
                component: <MyHouses />
            }] : []),
            ...(userRole === "admin" ? [{
                label: "Staff",
                component: <StaffPage />
            }] : []),
            ...(userRole === "admin" ? [{
                label: "Requests",
                component: <RequestsPage />
            }] : []),
        ]}
    />
    </div>
  )
}
