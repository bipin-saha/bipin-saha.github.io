"use client";

import { databases } from "@/lib/appwrite";
import { getImgBBUrl } from "@/lib/imgbb";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

type ImageDocument = {
  $id: string;
  imgUrl: string;
  deleteUrl?: string;
};

const Images = () => {
  const [images, setImages] = useState<ImageDocument[]>([]);

  useEffect(() => {
    databases
      .listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_IMAGES_ID!
      )
      .then((response) => {
        setImages(
          response.documents.map((doc) => ({
            $id: doc.$id,
            imgUrl: doc.imgUrl,
            deleteUrl: doc.deleteUrl,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        toast.error(
          `Error fetching images: ${error.message || "Unknown error"}`
        );
      });
  }, []);

  const addImage = async (e: ChangeEvent<HTMLInputElement>) => {
    toast.loading("Adding image...");
    const files = e.target.files;
    if (!files || files.length === 0) {
      toast.error("No file selected.");
      return;
    }
    const imgbbUrl = await getImgBBUrl(files);

    if (!imgbbUrl) {
      toast.error("Unable to upload in imgbb");
      return;
    }

    const newImage = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_IMAGES_ID!,
      "unique()",
      {
        imgUrl: imgbbUrl,
      }
    );
    setImages((prevImages) => [
      ...prevImages,
      {
        imgUrl: imgbbUrl,
        ...newImage,
      },
    ]);
  };

  const deleteImage = async ($id: string) => {
    toast.loading("Deleting image...");
    try {
      //   await axios.delete(deleteUrl);
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_IMAGES_ID!,
        $id
      );
      setImages((prevImages) => prevImages.filter((img) => img.$id !== $id));
      toast.success("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(
        `Error deleting image: ${
          typeof error === "object" && error !== null && "message" in error
            ? (error as { message?: string }).message
            : "Unknown error"
        }`
      );
    } finally {
      toast.dismiss(); // Dismiss the loading toast
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-10">
      <div className="text-center text-3xl font-bold my-5">Manage Images</div>
      <div className="flex flex-wrap gap-3 w-full justify-center">
        {images.length > 0 &&
          images.map((image, index) => (
            <div key={index} className="w-full max-w-xs p-2 relative">
              <Image
                src={image.imgUrl}
                alt={`Image ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-md"
                width={500}
                height={300}
              />
              <button
                className="btn btn-error mt-2 absolute top-2 right-4 z-10"
                onClick={() => deleteImage(image.$id)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
      </div>

      <div className="flex gap-3 items-center p-3 mt-5 justify-center w-full">
        <p className="text-xl">Add new image:</p>
        <input
          className="file-input"
          type="file"
          accept="image/*"
          onChange={addImage}
        />
      </div>
    </div>
  );
};

export default Images;
