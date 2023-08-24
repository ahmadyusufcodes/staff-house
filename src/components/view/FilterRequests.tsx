import React from "react";
import TextField from "../inputs/TextField";
import Modal from "../modal/Modal";
import api from "../../utils/http-common"
import { toast } from "react-toastify";
import HouseModal from "./HouseModal";

export default function FilterHouses() {
  const [open, setOpen] = React.useState(false);
  const [house, setHouse] = React.useState({
    name: "",
    address: "",
    price: "",
    levels: 1,
    bedrooms: 1,
    bathrooms: 1,
    status: "available",
    description: "",
  });
  const [editHouse, setEditHouse] = React.useState(null)

  const handleSetHouse = (key: string, value: string) => {
    setHouse({
      ...house,
      [key]: value,
    });
  };

  const handleAddHouse = () => {
        api.post("/house", house)
        .then((res) => {
            toast.success("House Added Successfully")
            console.log(res)
            setHouse({
                name: "",
                address: "",
                price: "",
                levels: 1,
                bedrooms: 1,
                bathrooms: 1,
                status: "available",
                description: "",
                });
            setOpen(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }

  return (
    <div className="flex gap-6 w-full py-0 px-4 mt-3 rounded-lg shadow mb-2">
      <HouseModal
        open={open}
        setOpen={setOpen}
        house={house}
        handleSetHouse={handleSetHouse}
        onAction={handleAddHouse}
      />
      <TextField placeholder="Search" rounded="lg" className="w-full h-10" />
      {/* <button
        onClick={() => setOpen(true)}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 h-10 px-4 rounded-lg"
      >
        Add New House
      </button> */}
    </div>
  );
}
