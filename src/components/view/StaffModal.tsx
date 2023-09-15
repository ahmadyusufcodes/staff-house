import React, { useEffect, useState } from 'react'
import Modal from '../modal/Modal'
import TextField from '../inputs/TextField'
import moment from 'moment'
import ImageDropzone from '../dropzone/ImageDropzone'
import { convertToBase64 } from '@/utils/functions'

interface IStaff {
    name: string;
    position: string;
    image: string;
    description: string;
    dob: string;
    email: string;
    phone: string;
    address: string;
    department: string;
    password: string;
    staffId: string;
}

interface IStaffComp {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    staff: any;
    handleSetStaff: (key: string, value: any) => void;
    onAction: () => void;
}

export default function HouseModal({
    open,
    setOpen,
    staff,
    handleSetStaff,
    onAction
}: IStaffComp) {
    const [image, setImage] = useState<any>(null)
    const handleImage = async (image: any) => {
        const final = await convertToBase64(image[0])
        // console.log("FINAL", final)
        handleSetStaff("image", final)
        // setImage(image)
    }

    useEffect(() => {
        if(!image) return 
        // convertToBase64(image[0]).then((res: any) => {
        //     // handleSetStaff("image", res)
        //         console.log(res)
        // })
        // // handleSetStaff("image", image[0])
        // console.log("BUFFER", convertToBase64(image[0]))
        handleImage(image)
        // console.log("IMAGE", convertToBase64(image[0]))
    }, [image])

  return (
      <Modal open={open} setOpen={setOpen}>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h1 className="text-xl font-semibold">{
                staff._id ? "Edit Staff" : "Add Staff"
          }</h1>
          <div className="grid grid-cols-4 gap-6 gap-y-0 pt-6">
            <div className="col-span-2 sm:col-span-2 pb-4">
                <label className="block text-sm font-medium pb-3 text-gray-700">
                    Image
                </label>
                <ImageDropzone maxImages={1} images={image ?? []} setImages={setImage} />
            </div>
            <div className="col-span-4 sm:col-span-4">
              <TextField
                rounded="lg"
                label="Full Name"
                placeholder="e.g. John Doe"
                value={staff.name}
                onChange={(e) => handleSetStaff("name", e.target.value)}
              />
            </div>
            <div className="col-span-2 sm:col-span-2">
                <TextField
                    rounded="lg"
                    label="Date of Birth"
                    placeholder="e.g."
                    value={moment(staff.dob).format("YYYY-MM-DD")}
                    type='date'
                    onChange={(e) => handleSetStaff("dob", e.target.value)}
                />
            </div>
            <div className="col-span-2 sm:col-span-2">
                <TextField
                    rounded="lg"
                    label="Email"
                    placeholder="e.g."
                    value={staff.email}
                    onChange={(e) => handleSetStaff("email", e.target.value)}
                />
            </div>
            <div className="col-span-2 sm:col-span-2">
                <TextField
                    rounded="lg"
                    label="Phone"
                    placeholder="e.g."
                    value={staff.phone}
                    onChange={(e) => handleSetStaff("phone", e.target.value)}
                />
            </div>
            <div className="col-span-2 sm:col-span-2">
                <TextField
                    rounded="lg"
                    label="Staff ID"
                    placeholder="e.g."
                    value={staff.staffId}
                    type='text'
                    onChange={(e) => handleSetStaff("staffId", e.target.value)}
                />
            </div>
            <div className="col-span-2 sm:col-span-2">
                <TextField
                    rounded="lg"
                    label="Position"
                    placeholder="e.g."
                    value={staff.position}
                    onChange={(e) => handleSetStaff("position", e.target.value)}
                />
            </div>
            <div className="col-span-2 sm:col-span-2">
                <TextField
                    rounded="lg"
                    label="New Password"
                    placeholder="e.g."
                    value={staff.new_password}
                    onChange={(e) => handleSetStaff(staff.id ? "new_password" : "password", e.target.value)}
                />
            </div>
            <div className="col-span-4 sm:col-span-4">
                <TextField
                    rounded="lg"
                    label="Address"
                    placeholder="e.g."
                    value={staff.address}
                    onChange={(e) => handleSetStaff("address", e.target.value)}
                />
            </div>
            <div className="col-span-4 sm:col-span-4">
                <TextField
                    rounded="lg"
                    label="Department"
                    placeholder="e.g."
                    value={staff.department}
                    onChange={(e) => handleSetStaff("department", e.target.value)}
                />
            </div>
            {/* <div className="col-span-4 sm:col-span-4">
                <TextField
                    rounded="lg"
                    label="Image"
                    placeholder="e.g."
                    value={staff.image}
                    onChange={(e) => handleSetStaff("image", e.target.value)}
                />
            </div> */}
          </div>
          <div className="mt-5 sm:mt-4 mb-4 sm:flex sm:flex-row-reverse">
            <button
                type="button"
                onClick={() => onAction()}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                {
                    staff._id ? "Update" : "Add"
                }
            </button>
            <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                Cancel
            </button>
        </div>
        </div>
      </Modal>
  )
}
