"use client";
import { UserAuthProvider } from "@/context/userAuth";
import { account } from "@/lib/appwrite";
import { ReactNode, useEffect, useState } from "react";

function UserAuth({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{
    $id: string;
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    if (user?.$id) return;
    account
      ?.get()
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        // If user is not authenticated, silently set user to null
        // This prevents the app from crashing when no user is logged in
        if (
          error?.code === 401 ||
          error?.type === "general_unauthorized_scope"
        ) {
          setUser(null);
        } else {
          console.error("Error fetching user data:", error);
        }
      });
  }, [user?.$id]);

  return (
    <UserAuthProvider value={{ user, setUser }}>{children}</UserAuthProvider>
  );
}

export default UserAuth;
