import axios from "axios";
import { toast } from "react-toastify";

interface ImgBBResponseData {
  url: string;
  [key: string]: string;
}

interface ImgBBResponse {
  data: {
    data: ImgBBResponseData;
    // Removed string index signature to fix type error
  };
  // Removed string index signature to fix type error
}

export const getImgBBUrl = async (files: FileList | File[]): Promise<string | undefined> => {
  if (!files || files.length === 0) {
    toast.error("No file selected.");
    return;
  }
  const file: File = files[0];
  const formData = new FormData();
  formData.append("image", file);

  try {
    const imgbb: ImgBBResponse = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      formData
    );
    if (!imgbb.data || !imgbb.data.data || !imgbb.data.data.url) {
      throw new Error("Invalid response from imgbb");
    }

    toast.success("Image uploaded successfully!");
    return imgbb.data.data.url;
  } catch (error: unknown) {
    console.error("Error uploading image:", error);
    toast.error(
      `Error uploading image: ${
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message
          : "Unknown error"
      }`
    );
  } finally {
    toast.dismiss(); // Dismiss the loading toast
  }
};
