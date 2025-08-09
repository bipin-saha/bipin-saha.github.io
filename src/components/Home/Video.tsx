"use client";

import Modal from "@/components/Modal";
import ImgSkeleton from "@/components/Skeleton/Img";
import { useUserAuth } from "@/context/userAuth";
import { databases } from "@/lib/appwrite";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const docId = "6885e89f001562620252";

const Video = () => {
  const [url, setUrl] = useState<string>("");
  const { user } = useUserAuth();

  const updateVideo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!url) {
      toast.error("There have to url");
      return;
    }

    // https://youtu.be/K0GT0DcfXIg?si=ux73RWMBcgxZ5oCG&t=33
    // https://www.youtube.com/watch?v=61vSzkQqL7Y&t=15s

    const givenUrl = url.trim();
    if (!givenUrl.startsWith("https://www.youtube.com/embed/")) {
      let videoId;
      if (givenUrl.startsWith("https://www.youtube.com/watch?v=")) {
        videoId = givenUrl.split("v=")[1]?.split("&")[0];
      } else if (givenUrl.startsWith("https://youtu.be/")) {
        // Extract video ID from shortened URL
        videoId = givenUrl.split("/").pop()?.split("?")[0];
      } else {
        toast.error("Invalid YouTube URL format");
        return;
      }
      if (!videoId) {
        toast.error("Invalid YouTube URL format");
        return;
      }
      setUrl(`https://www.youtube.com/embed/${videoId}`);
      return;
    }

    databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_YOUTUBE_ID!,
      docId,
      {
        video: url,
      }
    );

    const modal = document.getElementById(docId);
    if (modal) {
      (modal as HTMLDialogElement).close(); // Close the modal after update
    }
  };
  useEffect(() => {
    databases
      .getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_YOUTUBE_ID!,
        docId
      )
      .then((res) => {
        console.log(res);
        setUrl(res.video);
      })
      .catch((error) => {
        toast.error(
          `Error fetching early research data: ${
            error.message || "Unknown error"
          }`
        );
        console.error("Error fetching early research data:", error);
      });
  }, []);

  return url ? (
    <div className="w-full max-w-5xl mx-auto my-10">
      <iframe
        className="w-full max-w-4xl mx-auto min-h-[400px] h-full rounded-lg"
        src={url}
        title="Presentation on Undergraduate Thesis Defense by Md Abrar Jahin"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      {user?.$id && (
        <Modal id={docId} title="Update">
          <form
            className="flex flex-col gap-4 items-center"
            onSubmit={updateVideo}
          >
            <input
              type="url"
              className="input input-primary w-full max-w-3xl"
              defaultValue={url}
              placeholder="Enter youtube video Link"
              onChange={(e) => setUrl(e.target.value)}
            />
            <button className="btn btn-accent w-40 mx-auto" type="submit">
              Update
            </button>
          </form>
        </Modal>
      )}
    </div>
  ) : (
    <ImgSkeleton />
  );
};

export default Video;
