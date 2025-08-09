"use client";

import UpdateAction from "@/components/UpdateAction";
import TextLine from "@/components/Skeleton/TextLine";
import { useUserAuth } from "@/context/userAuth";
import { databases } from "@/lib/appwrite";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const docId = "6885d90500167f3819ee";

const EarlyResearch = () => {
  const [earlyResearch, setEarlyResearch] = useState<string | null>(null);
  const { user } = useUserAuth();
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    databases
      .getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_EARLY_RESEARCH_ID!,
        docId
      )
      .then((res) => {
        setEarlyResearch(res.content);
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
      <h1 className="text-3xl font-bold mb-5 text-center">Early Research</h1>
      {earlyResearch ? (
        <div className="text-justify raw">{parse(earlyResearch)}</div>
      ) : (
        <TextLine />
      )}
      {user?.$id && (
        <UpdateAction
          docId={docId}
          colId={process.env.NEXT_PUBLIC_APPWRITE_EARLY_RESEARCH_ID!}
          initVal={earlyResearch}
          setUpdate={setUpdate}
        />
      )}
    </div>
  );
};

export default EarlyResearch;
