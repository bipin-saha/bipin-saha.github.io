"use client";
import Modal from "@/components/Modal";
import TinyEditor from "@/components/TinyMCE";
import { databases } from "@/lib/appwrite";
import { toast } from "react-toastify";

const UpdateAction = ({
  initVal,
  docId,
  colId,
  setUpdate,
}: {
  initVal: string | null;
  docId: string;
  colId: string;
  setUpdate?: (val: boolean) => void;
}) => {
  const actionFunc = (val: string) => {
    if (setUpdate) {
      setUpdate(true);
    }
    databases
      .updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        colId,
        docId,
        {
          content: val,
        }
      )
      .then(() => {
        toast.success("Hero content updated successfully!");
      })
      .catch((error) => {
        toast.error(
          `Error updating hero content: ${error.message || "Unknown error"}`
        );
      })
      .finally(() => {
        if (setUpdate) {
          setUpdate(false);
        }
      });
    const modal = document.getElementById(docId);
    if (modal) {
      (modal as HTMLDialogElement).close(); // Close the modal after update
    }
  };
  return (
    <Modal id={docId} title="Update">
      <form onSubmit={(e) => e.preventDefault()}>
        <TinyEditor actionFunc={actionFunc} initVal={initVal || ""} />
      </form>
    </Modal>
  );
};

export default UpdateAction;
