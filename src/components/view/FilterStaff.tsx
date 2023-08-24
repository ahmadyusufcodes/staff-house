import React from "react";
import TextField from "../inputs/TextField";
import Modal from "../modal/Modal";
import api from "../../utils/http-common"
import { toast } from "react-toastify";
import StaffModal from "./StaffModal";

export default function FilterHouses() {
  const [open, setOpen] = React.useState(false);
  const [staff, setStaff] = React.useState({
    name: "",
    position: "",
    image: "",
    description: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    staffId: ""
  });
  const [editStaff, setEditStaff] = React.useState(null)

  const handleSetStaff = (key: string, value: string) => {
    setStaff({
      ...staff,
      [key]: value,
    });
  };

  const handleAddStaff = () => {
        api.post("/staff", staff)
        .then((res) => {
            toast.success("Staff Added Successfully")
            console.log(res)
            setStaff({
                name: "",
                position: "",
                image: "",
                description: "",
                dob: "",
                email: "",
                phone: "",
                address: "",
                password: "",
                staffId: ""
                });
            setOpen(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }

  return (
    <div className="flex gap-6 w-full py-0 px-4 mt-3 rounded-lg shadow mb-2">
      <StaffModal
        open={open}
        setOpen={setOpen}
        staff={staff}
        handleSetStaff={handleSetStaff}
        onAction={handleAddStaff}
      />
      <TextField placeholder="Search" rounded="lg" className="w-full h-10" />
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 h-10 px-4 rounded-lg"
      >
        Add New Staff
      </button>
    </div>
  );
}
