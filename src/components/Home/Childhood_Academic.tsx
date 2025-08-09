"use client";

import UpdateAction from "@/components/UpdateAction";
import TextLine from "@/components/Skeleton/TextLine";
import { useUserAuth } from "@/context/userAuth";
import { databases } from "@/lib/appwrite";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const docId = "6887e88e003cb8c190d0";
const colId = "6887e7f3002868994ebb";

const ChildhoodAcademic = () => {
  const [childhoodAcademic, setChildhoodAcademic] = useState<string | null>(
    null
  );
  const [update, setUpdate] = useState(false);
  const { user } = useUserAuth();
  useEffect(() => {
    databases
      .getDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, colId, docId)
      .then((res) => {
        setChildhoodAcademic(res.content);
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
        Childhood Education and Academic Achievements
      </h1>
      {childhoodAcademic ? (
        <div className="text-justify raw">{parse(childhoodAcademic)}</div>
      ) : (
        <TextLine />
      )}
      {user?.$id && (
        <UpdateAction
          docId={docId}
          colId={colId}
          initVal={childhoodAcademic}
          setUpdate={setUpdate}
        />
      )}
    </div>
  );
};

export default ChildhoodAcademic;
