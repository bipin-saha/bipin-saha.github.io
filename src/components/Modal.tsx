"use client";

import { ReactNode } from "react";

const Modal = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) => {
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className={`btn m-1 btn-sm ${
          title === "Remove"
            ? "btn-error"
            : title === "Update"
            ? "btn-info"
            : "btn-accent"
        }`}
        onClick={() => {
          const modal = document.getElementById(id);
          if (modal) {
            (modal as HTMLDialogElement).showModal();
          }
        }}
      >
        {title}
      </button>
      <dialog id={id} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          {children}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn btn-circle btn-neutral absolute right-2 top-2 z-10">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
