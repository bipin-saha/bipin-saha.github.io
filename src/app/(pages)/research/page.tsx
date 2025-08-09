import AddButton from "@/app/(pages)/research/Add";
import ShowMore from "@/app/(pages)/research/ShowMore";
import UpdateButton from "@/app/(pages)/research/Update";
import Title from "@/components/Title";
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";
import Image from "next/image";
import { FaCode, FaHandPointDown } from "react-icons/fa";

const Research = async () => {
  const { documents: researches } = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_RESEARCH!,
    [Query.orderDesc("time")]
  );

  return (
    <div className="w-full">
      <Title>Research</Title>
      <AddButton />
      {researches.map((research) => (
        <div
          className="card bg-base-300 w-full max-w-lg shadow-sm"
          key={research.$id}
        >
          <figure>
            <Image
              src={
                research?.thumbnail ||
                "https://static.vecteezy.com/system/resources/thumbnails/005/720/408/small_2x/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg"
              }
              alt={research.title || "Research Image"}
              width={600}
              height={350}
              className="rounded-t-lg object-cover w-full max-h-80"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{research.title || "Research Title"}</h2>
            <div className="badge badge-outline badge-secondary">
              {research.time.split("T")[0] || "NEW"}
            </div>
            <p className="text-justify">
              {research.content.length > 500
                ? `${research.content.slice(0, 500)}`
                : research.content || "Research description goes here."}

              {research.content.length > 500 && (
                <ShowMore content={research.content} />
              )}
            </p>
            <div className="card-actions justify-end">
              <UpdateButton
                data={{
                  $id: research.$id,
                  title: research.title,
                  content: research.content,
                  ref: research?.ref,
                  code: research?.code,
                  thumbnail: research?.thumbnail,
                  time: research.time,
                }}
              />

              {research?.code && (
                <a
                  href={research.code}
                  className="btn btn-primary"
                  target="_blank"
                >
                  <FaCode className="text-xl" />
                  View Code
                </a>
              )}
              {research?.ref && (
                <a
                  href={research.ref}
                  className="btn btn-secondary"
                  target="_blank"
                >
                  <FaHandPointDown className="text-xl" />
                  View Reference
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Research;
