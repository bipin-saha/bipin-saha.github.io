"use client";

import Form from "@/app/(pages)/research/Form";
import Modal from "@/components/Modal";
import { useUserAuth } from "@/context/userAuth";
import { databases } from "@/lib/appwrite";
import { getImgBBUrl } from "@/lib/imgbb";
import { FormEvent } from "react";
import { toast } from "react-toastify";

const UpdateButton = ({
  data,
}: {
  data: {
    $id: string;
    title: string;
    content: string;
    ref?: string;
    code?: string;
    thumbnail?: string | null;
    time: string;
  };
}) => {
  const { user } = useUserAuth();
  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    let thumbnail: string | null | undefined = null;
    const thumbnailInput = formData.get("thumbnail") as File | null;
    const modal = document.getElementById(data.$id);
    if (modal) {
      (modal as HTMLDialogElement).close(); // Close the modal after update
    }
    if (thumbnailInput && thumbnailInput.size > 0) {
      thumbnail = await getImgBBUrl([thumbnailInput]);
    }
    const updatedData: {
      title: FormDataEntryValue;
      content: FormDataEntryValue;
      ref: FormDataEntryValue | null;
      code: FormDataEntryValue | null;
      time: FormDataEntryValue;
      thumbnail?: string | null;
    } = {
      title: formData.get("title") ?? "",
      content: formData.get("content") ?? "",
      ref: formData.get("ref") || null,
      code: formData.get("code") || null,
      time: formData.get("time") || new Date().toISOString(),
    };

    // Only update thumbnail if a new one was uploaded
    if (thumbnail) {
      updatedData.thumbnail = thumbnail;
    }
    try {
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_RESEARCH!,
        data.$id,
        updatedData
      );
      toast.info("Successfully update information");
    } catch (error) {
      toast.error("Failed to update information");
      console.error(error);
    }

    // Reload the page
    location.reload();
  };

  if (!user?.$id) {
    return null; // Don't show the button if the user is not authenticated
  }

  return (
    <Modal id={data.$id} title="Edit">
      <form onSubmit={handleUpdate} className="flex flex-col w-full gap-3">
        <Form data={data} />
        <button className="btn btn-info" type="submit">
          Update
        </button>
      </form>
    </Modal>
  );
};

export default UpdateButton;
