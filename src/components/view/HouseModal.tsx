import React from "react";
import Modal from "../modal/Modal";
import TextField from "../inputs/TextField";
import ImageDropzone from "../dropzone/ImageDropzone";

interface IHouseComp {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  house: any;
  handleSetHouse: (key: string, value: any) => void;
  onAction: () => void;
}

export default function HouseModal({
  open,
  setOpen,
  house,
  handleSetHouse,
  onAction,
}: IHouseComp) {
  const [images, setImages] = React.useState<any>([]);

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const getImages = async () => {
    // if (!house.images) return setImages([])
    const images_list = await Promise.all(
      images?.map((image: any) => {
        // check if image is a file
        if (image instanceof File) {
          return convertToBase64(image);
        }
        return image;
      })
    );
    console.log("GET IT", images_list);
    // setImages(images_list)
    handleSetHouse("images", images_list);
  };

  React.useEffect(() => {
    getImages();
  }, [images]);

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <h1 className="text-xl font-semibold">Add House</h1>
        <div className="grid grid-cols-4 gap-6 gap-y-0 pt-6">
          <div className="col-span-2 sm:col-span-2 pb-4">
            <label className="block text-sm font-medium pb-3 text-gray-700">
              Image
            </label>
            <ImageDropzone
              maxImages={5}
              images={images}
              setImages={setImages}
            />
          </div>
          <div className="col-span-4 sm:col-span-4">
            <TextField
              rounded="lg"
              label="House Name"
              placeholder="House Name"
              value={house.name}
              onChange={(e) => handleSetHouse("name", e.target.value)}
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <TextField
              rounded="lg"
              label="House Address"
              placeholder="XXX, Block XXX, Street XXX, XXX"
              value={house.address}
              onChange={(e) => handleSetHouse("address", e.target.value)}
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <TextField
              rounded="lg"
              label="House Price"
              icon={<span>₦</span>}
              value={house.price}
              onChange={(e) => handleSetHouse("price", e.target.value)}
              placeholder="e.g 100,000"
            />
          </div>
          <div className="col-span-1 sm:col-span-1">
            <TextField
              rounded="lg"
              label="Levels"
              type="number"
              placeholder=""
              value={house.levels}
              onChange={(e) => handleSetHouse("levels", e.target.value)}
            />
          </div>
          <div className="col-span-1 sm:col-span-1">
            <TextField
              rounded="lg"
              label="Bedrooms"
              type="number"
              placeholder=""
              value={house.bedrooms}
              onChange={(e) => handleSetHouse("bedrooms", e.target.value)}
            />
          </div>
          <div className="col-span-1 sm:col-span-1">
            <TextField
              rounded="lg"
              label="Bathrooms"
              type="number"
              placeholder=""
              value={house.bathrooms}
              onChange={(e) => handleSetHouse("bathrooms", e.target.value)}
            />
          </div>
          <div className="col-span-1 sm:col-span-1">
            <label className="text-gray-700 font-semibold">Status</label>
            <select
              value={house.status}
              onChange={(e) => handleSetHouse("status", e.target.value)}
              className="mt-1 h-11 block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="available">Available</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div className="col-span-4 sm:col-span-4">
            <TextField
              rounded="lg"
              label="Description"
              placeholder=""
              type="textarea"
              value={house.description}
              onChange={(e) => handleSetHouse("description", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-5 sm:mt-4 mb-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            onClick={() => onAction()}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Save
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
  );
}
