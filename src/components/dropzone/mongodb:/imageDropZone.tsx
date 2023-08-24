import React, { useState } from 'react';

interface ImageDropzoneProps {
    maxImages: number;
    images: File[];
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ maxImages, images, setImages }) => {
//   const [images, setImages] = useState<File[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newImages = Array.from(e.dataTransfer.files)
      .filter((file) => file.type.startsWith('image/'))
      .slice(0, maxImages - images.length);

    setImages([...images, ...newImages]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleImageClick = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleAttachClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.style.display = 'none';

    input.addEventListener('change', (e) => {
      const newImages = Array.from(e.target.files).slice(0, maxImages - images.length);
      // conver to 64 bit
      const newImages64 = newImages.map((image) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
          const base64 = reader.result;
          // console.log(base64);
          return base64;
        };
        reader.onerror = (error) => console.log(error);
        return reader;
      });
      
      setImages([...images, ...newImages]);
      e.target.value = ''; // Clear the input for re-selection
    });

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  return (
    <div
      className="border border-dashed p-4 space-y-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleAttachClick}
    >
      <p className="text-gray-600">Click or drop images here</p>
      <div className="grid gap-2 grid-cols-3">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt={`Image ${index + 1}`}
              className="w-full h-auto rounded cursor-pointer"
              onClick={() => handleImageClick(index)}
            />
            <span
              className="absolute top-0 right-0 p-1 text-xs bg-red-500 text-white cursor-pointer rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                handleImageClick(index)
              }}
            >
              X
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageDropzone;
