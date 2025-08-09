"use client";
import { useUserAuth } from "@/context/userAuth";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useUserAuth();
  if (!user?.$id) {
    return (
      <div className="text-red-500 text-5xl my-10 text-center font-bold">
        Unauthorized
      </div>
    );
  }
  return children;
};

export default AdminLayout;
