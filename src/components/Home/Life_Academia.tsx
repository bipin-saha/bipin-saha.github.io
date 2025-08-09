"use client";

import UpdateAction from "@/components/UpdateAction";
import TextLine from "@/components/Skeleton/TextLine";
import { useUserAuth } from "@/context/userAuth";
import { databases } from "@/lib/appwrite";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const docId = "6887e6b3000312281009";

const LifeAcademia = () => {
  const [lifeAcademia, setLifeAcademia] = useState<string | null>(null);
  const { user } = useUserAuth();
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    databases
      .getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        "6887e64a00061c31a5ad",
        docId
      )
      .then((res) => {
        setLifeAcademia(res.content);
      })
      .catch((error) => {
        toast.error(
          `Error fetching early research data: ${
            error.message || "Unknown error"
          }`
        );
        console.error("Error fetching early research data:", error);
      });
  }, [update]);

  return (
    <div className="w-full max-w-5xl mx-auto my-10">
      <h1 className="text-3xl font-bold mb-5 text-center">
        My Personal Perspectives about Life in Academia
      </h1>
      {lifeAcademia ? (
        <div className="text-justify raw">{parse(lifeAcademia)}</div>
      ) : (
        <TextLine />
      )}
      {user?.$id && (
        <UpdateAction
          docId={docId}
          colId={"6887e64a00061c31a5ad"}
          initVal={lifeAcademia}
          setUpdate={setUpdate}
        />
      )}
    </div>
  );
};

export default LifeAcademia;
